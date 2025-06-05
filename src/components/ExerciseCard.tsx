
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
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          {exercise.type === 'fill-blank' && 'Vul de juiste vorm in'}
          {exercise.type === 'sentence-complete' && 'Maak de zin compleet'}
          {exercise.type === 'multiple-choice' && 'Kies het juiste antwoord'}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="text-lg font-medium text-gray-800">
          {exercise.question}
        </div>
        
        {exercise.type === 'multiple-choice' && exercise.options ? (
          <div className="space-y-2">
            {exercise.options.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedOption(option)}
                disabled={showResult}
                className={`w-full p-3 text-left border rounded-lg transition-colors ${
                  selectedOption === option
                    ? showResult
                      ? isCorrect
                        ? 'bg-green-100 border-green-500 text-green-700'
                        : 'bg-red-100 border-red-500 text-red-700'
                      : 'bg-blue-100 border-blue-500'
                    : showResult && option === exercise.answer
                    ? 'bg-green-100 border-green-500 text-green-700'
                    : 'bg-gray-50 border-gray-300 hover:bg-gray-100'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        ) : (
          <Input
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Type je antwoord hier..."
            disabled={showResult}
            className={`text-lg ${
              showResult
                ? isCorrect
                  ? 'border-green-500 bg-green-50'
                  : 'border-red-500 bg-red-50'
                : ''
            }`}
            onKeyPress={(e) => e.key === 'Enter' && isAnswerComplete() && !showResult && handleSubmit()}
          />
        )}
        
        {showResult && (
          <div className={`flex items-center space-x-2 p-3 rounded-lg ${
            isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {isCorrect ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <XCircle className="w-5 h-5" />
            )}
            <span className="font-medium">
              {isCorrect ? 'Correct!' : `Fout. Het juiste antwoord is: ${exercise.answer}`}
            </span>
          </div>
        )}
        
        {showResult && exercise.explanation && (
          <div className="p-3 bg-blue-50 rounded-lg text-blue-800">
            <strong>Uitleg:</strong> {exercise.explanation}
          </div>
        )}
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={handleSubmit}
          disabled={!isAnswerComplete() || showResult}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          Controleer
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ExerciseCard;
