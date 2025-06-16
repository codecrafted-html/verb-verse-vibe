
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Medal, Award, ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface LeaderboardEntry {
  username: string;
  total_xp: number;
  user_id: string;
}

const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      // Get current week start
      const { data: weekData } = await supabase.rpc('get_week_start');
      const currentWeek = weekData;

      // Fetch leaderboard for current week
      const { data, error } = await supabase
        .from('user_stats')
        .select('username, total_xp, user_id')
        .eq('week_start', currentWeek)
        .order('total_xp', { ascending: false })
        .limit(50);

      if (error) throw error;
      setLeaderboard(data || []);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-gray-600 font-bold">{position}</span>;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-green-50 to-yellow-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="text-center py-8">
            <p className="mb-4">Je moet ingelogd zijn om het leaderboard te bekijken.</p>
            <Button onClick={() => navigate('/auth')}>Inloggen</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-green-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Terug</span>
          </Button>
          
          <h1 className="text-2xl font-bold text-green-600">Wekelijks Leaderboard</h1>
          
          <div className="w-20" />
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-bold text-green-600 flex items-center justify-center space-x-2">
              <Trophy className="w-6 h-6" />
              <span>Top Spelers Deze Week</span>
            </CardTitle>
            <p className="text-sm text-gray-600">Het leaderboard wordt elke maandag gereset</p>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Laden...</div>
            ) : leaderboard.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">Nog geen scores deze week!</p>
                <p className="text-sm text-gray-500 mt-2">Speel een les om op het leaderboard te komen.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {leaderboard.map((entry, index) => {
                  const position = index + 1;
                  const isCurrentUser = entry.user_id === user.id;
                  
                  return (
                    <div
                      key={entry.user_id}
                      className={`flex items-center space-x-4 p-4 rounded-lg transition-colors ${
                        isCurrentUser
                          ? 'bg-green-100 border-2 border-green-300'
                          : position <= 3
                          ? 'bg-yellow-50 border border-yellow-200'
                          : 'bg-gray-50 border border-gray-200'
                      }`}
                    >
                      <div className="flex-shrink-0">
                        {getRankIcon(position)}
                      </div>
                      <div className="flex-1">
                        <p className={`font-semibold ${isCurrentUser ? 'text-green-700' : 'text-gray-800'}`}>
                          {entry.username}
                          {isCurrentUser && <span className="ml-2 text-sm text-green-600">(Jij)</span>}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${isCurrentUser ? 'text-green-700' : 'text-gray-700'}`}>
                          {entry.total_xp} XP
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Leaderboard;
