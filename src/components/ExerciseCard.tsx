
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle } from 'lucide-react';

export interface Exercise {
  id: string;
  type: 'fill-blank' | 'sentence-complete' | 'multiple-choice';
  question: string;
  answer: string;
  options?: string[];
  explanation?: string;
}

interface ExerciseCardProps {
  exercise: Exercise;
  onAnswer: (correct: boolean, answer: string) => void;
  showResult?: boolean;
  isCorrect?: boolean;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ 
  exercise, 
  onAnswer, 
  showResult = false, 
  isCorrect = false 
}) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const handleSubmit = () => {
    const answer = exercise.type === 'multiple-choice' ? selectedOption : userAnswer;
    const correct = answer.toLowerCase().trim() === exercise.answer.toLowerCase().trim();
    onAnswer(correct, answer);
  };

  const isAnswerComplete = () => {
    if (exercise.type === 'multiple-choice') {
      return selectedOption !== '';
    }
    return userAnswer.trim() !== '';
  };

  return (
    <Card className="w-full max-w-2xl mx-auto animate-scale-in shadow-xl">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
        <CardTitle className="text-lg font-semibold text-gray-800">
          {exercise.type === 'fill-blank' && 'Vul de juiste vorm in'}
          {exercise.type === 'sentence-complete' && 'Maak de zin compleet'}
          {exercise.type === 'multiple-choice' && 'Kies het juiste antwoord'}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6 p-6">
        <div className="text-xl font-medium text-gray-800 leading-relaxed animate-fade-in">
          {exercise.question}
        </div>
        
        {exercise.type === 'multiple-choice' && exercise.options ? (
          <div className="space-y-3 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {exercise.options.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedOption(option)}
                disabled={showResult}
                className={`w-full p-4 text-left border-2 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  selectedOption === option
                    ? showResult
                      ? isCorrect
                        ? 'bg-green-100 border-green-500 text-green-700 scale-105'
                        : 'bg-red-100 border-red-500 text-red-700'
                      : 'bg-blue-100 border-blue-500 scale-105 shadow-lg'
                    : showResult && option === exercise.answer
                    ? 'bg-green-100 border-green-500 text-green-700 animate-pulse'
                    : 'bg-gray-50 border-gray-300 hover:bg-gray-100 hover:border-gray-400'
                }`}
              >
                <span className="font-medium">{option}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Input
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type je antwoord hier..."
              disabled={showResult}
              className={`text-lg py-4 px-6 transition-all duration-300 ${
                showResult
                  ? isCorrect
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-red-500 bg-red-50 text-red-700'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
              }`}
              onKeyPress={(e) => e.key === 'Enter' && isAnswerComplete() && !showResult && handleSubmit()}
            />
          </div>
        )}
        
        {showResult && (
          <div className={`flex items-center space-x-3 p-4 rounded-xl animate-scale-in ${
            isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {isCorrect ? (
              <CheckCircle className="w-6 h-6 animate-bounce" />
            ) : (
              <XCircle className="w-6 h-6 animate-pulse" />
            )}
            <span className="font-medium text-lg">
              {isCorrect ? 'Correct! 🎉' : `Fout. Het juiste antwoord is: ${exercise.answer}`}
            </span>
          </div>
        )}
        
        {showResult && exercise.explanation && (
          <div className="p-4 bg-blue-50 rounded-xl text-blue-800 animate-fade-in">
            <strong>Uitleg:</strong> {exercise.explanation}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="bg-gray-50">
        <Button 
          onClick={handleSubmit}
          disabled={!isAnswerComplete() || showResult}
          className="w-full bg-green-600 hover:bg-green-700 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
        >
          {showResult ? 'Voltooid ✓' : 'Controleer'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ExerciseCard;
