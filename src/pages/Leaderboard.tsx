import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Medal, Award, Users } from 'lucide-react';
import Header from '@/components/Header';
import { useSupabaseGameState } from '@/hooks/useSupabaseGameState';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface LeaderboardEntry {
  username: string;
  total_xp: number;
  user_id: string;
}

const Leaderboard: React.FC = () => {
  const { gameState, activateCheat } = useSupabaseGameState();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: leaderboard, isLoading } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_stats')
        .select('username, total_xp, user_id')
        .eq('week_start', new Date().toISOString().split('T')[0])
        .order('total_xp', { ascending: false })
        .limit(10);

      if (error) throw error;
      return data as LeaderboardEntry[];
    },
    enabled: !!user, // Only fetch if user is logged in
  });

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 1:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 2:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-gray-500 font-bold">{index + 1}</span>;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-green-50 to-yellow-50">
        <Header 
          hearts={gameState.hearts} 
          streak={gameState.streak} 
          xp={gameState.xp}
          hasInfiniteHearts={gameState.hasInfiniteHearts}
          completedLevels={gameState.completedLevels}
          onCheatActivated={activateCheat}
        />
        
        <div className="container mx-auto px-4 py-8">
          <div className="text-center max-w-md mx-auto">
            <Card className="p-8">
              <CardHeader>
                <Users className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-2xl text-green-600">Weekly Leaderboard</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">
                  Log in om je voortgang te volgen en te concurreren met andere spelers op het wekelijkse leaderboard!
                </p>
                <Button 
                  onClick={() => navigate('/auth')}
                  className="bg-green-600 hover:bg-green-700 w-full"
                >
                  Inloggen / Registreren
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-green-50 to-yellow-50">
      <Header 
        hearts={gameState.hearts} 
        streak={gameState.streak} 
        xp={gameState.xp}
        hasInfiniteHearts={gameState.hasInfiniteHearts}
        completedLevels={gameState.completedLevels}
        onCheatActivated={activateCheat}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-600 mb-2">Weekly Leaderboard</h1>
          <p className="text-gray-600">Compete with other players this week!</p>
        </div>

        <div className="max-w-md mx-auto mb-8">
          <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
            <CardContent className="p-6">
              <div className="text-center">
                <Trophy className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">{gameState.xp} XP</div>
                <div className="text-green-100">Your Weekly Score</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Top Players This Week</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="text-gray-600">Loading leaderboard...</div>
                </div>
              ) : !leaderboard || leaderboard.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-gray-600">No players on the leaderboard yet this week!</div>
                  <div className="text-sm text-gray-500 mt-2">Be the first to earn XP and claim the top spot!</div>
                </div>
              ) : (
                <div className="space-y-3">
                  {leaderboard.map((entry, index) => (
                    <div
                      key={entry.user_id}
                      className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                        entry.user_id === user?.id
                          ? 'bg-green-50 border-2 border-green-200'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        {getRankIcon(index)}
                        <div>
                          <div className="font-semibold text-gray-800">
                            {entry.username}
                            {entry.user_id === user?.id && (
                              <span className="text-green-600 text-sm ml-2">(You)</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">{entry.total_xp} XP</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <Card className="max-w-md mx-auto">
            <CardContent className="p-4">
              <div className="text-sm text-gray-600">
                <div className="mb-1">🔄 Leaderboard resets every Monday</div>
                <div>Keep playing to maintain your ranking!</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
