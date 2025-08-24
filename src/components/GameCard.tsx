import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface GameCardProps {
  title: string;
  description: string;
  icon: string;
  difficulty: 'easy' | 'medium' | 'hard';
  progress?: number;
  onPlay: () => void;
}

const GameCard: React.FC<GameCardProps> = ({ 
  title, 
  description, 
  icon, 
  difficulty, 
  progress = 0, 
  onPlay 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDifficultyText = (level: string) => {
    switch (level) {
      case 'easy': return 'Легко';
      case 'medium': return 'Средне';
      case 'hard': return 'Сложно';
      default: return 'Неизвестно';
    }
  };

  return (
    <Card 
      className={`transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer border-2 ${
        isHovered ? 'border-blue-400 bg-gradient-to-br from-blue-50 to-purple-50' : 'border-gray-200'
      } animate-fade-in`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onPlay}
    >
      <CardHeader className="text-center pb-2">
        <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-all duration-300 ${
          isHovered ? 'bg-gradient-to-r from-pink-400 to-purple-400 animate-bounce-in' : 'bg-gradient-to-r from-blue-400 to-green-400'
        }`}>
          <Icon name={icon} className="text-white" size={28} />
        </div>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        <CardDescription className="text-gray-600">{description}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(difficulty)}`}>
            {getDifficultyText(difficulty)}
          </span>
          <span className="text-sm text-gray-500">{progress}% завершено</span>
        </div>
        
        <Progress value={progress} className="w-full h-2" />
        
        <Button 
          className={`w-full transition-all duration-300 ${
            isHovered 
              ? 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 transform scale-105' 
              : 'bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600'
          }`}
          onClick={(e) => {
            e.stopPropagation();
            onPlay();
          }}
        >
          <Icon name="Play" className="mr-2" size={16} />
          Играть
        </Button>
      </CardContent>
    </Card>
  );
};

export default GameCard;