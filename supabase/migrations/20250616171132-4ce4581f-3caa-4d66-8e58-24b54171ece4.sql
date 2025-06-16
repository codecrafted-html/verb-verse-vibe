
-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create leaderboard table to track user XP
CREATE TABLE public.user_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  username TEXT NOT NULL,
  total_xp INTEGER DEFAULT 0 NOT NULL,
  week_start DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  UNIQUE(user_id, week_start)
);

-- Enable RLS on both tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- User stats policies  
CREATE POLICY "Users can view all user stats" ON public.user_stats FOR SELECT USING (true);
CREATE POLICY "Users can insert their own stats" ON public.user_stats FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own stats" ON public.user_stats FOR UPDATE USING (auth.uid() = user_id);

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (new.id, COALESCE(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)));
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to get current week start (Monday)
CREATE OR REPLACE FUNCTION public.get_week_start()
RETURNS DATE AS $$
BEGIN
  RETURN (CURRENT_DATE - EXTRACT(DOW FROM CURRENT_DATE)::INTEGER + 1);
END;
$$ LANGUAGE plpgsql STABLE;

-- Function to update user XP
CREATE OR REPLACE FUNCTION public.update_user_xp(xp_to_add INTEGER)
RETURNS VOID AS $$
DECLARE
  current_week DATE;
  user_name TEXT;
BEGIN
  -- Get current week start
  current_week := public.get_week_start();
  
  -- Get username
  SELECT username INTO user_name FROM public.profiles WHERE id = auth.uid();
  
  -- Insert or update user stats for current week
  INSERT INTO public.user_stats (user_id, username, total_xp, week_start)
  VALUES (auth.uid(), user_name, xp_to_add, current_week)
  ON CONFLICT (user_id, week_start)
  DO UPDATE SET 
    total_xp = user_stats.total_xp + xp_to_add,
    updated_at = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
