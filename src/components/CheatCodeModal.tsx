
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Infinity } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CheatCodeModalProps {
  onCheatActivated: () => void;
}

const CheatCodeModal: React.FC<CheatCodeModalProps> = ({ onCheatActivated }) => {
  const [code, setCode] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = () => {
    if (code.toUpperCase() === 'BBC') {
      onCheatActivated();
      setIsOpen(false);
      setCode('');
      toast({
        title: "Cheat geactiveerd! 🎉",
        description: "Je hebt nu oneindig hartjes en extra levels!",
      });
    } else {
      toast({
        title: "Verkeerde code",
        description: "Probeer het opnieuw!",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-110 shadow-lg">
          <Infinity className="w-4 h-4 text-white" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-green-700">
            Geheime Code
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 p-4">
          <div className="text-center text-gray-600">
            Voer de geheime code in voor speciale functies
          </div>
          <Input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Voer code in..."
            className="text-center text-lg py-3 rounded-2xl border-2"
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
          />
          <Button 
            onClick={handleSubmit}
            className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-2xl text-lg font-semibold"
          >
            Activeer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CheatCodeModal;
