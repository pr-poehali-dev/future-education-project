import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface GamePiece {
  id: number;
  name: string;
  x: number;
  y: number;
  placed: boolean;
  correctX: number;
  correctY: number;
}

const InteractiveGame: React.FC = () => {
  const [gameMode, setGameMode] = useState<'puzzle' | 'quiz' | 'coloring' | null>(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [progress, setProgress] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // Пазл "Карта России"
  const [puzzlePieces, setPuzzlePieces] = useState<GamePiece[]>([
    { id: 1, name: 'Москва', x: 100, y: 150, placed: false, correctX: 200, correctY: 180 },
    { id: 2, name: 'Санкт-Петербург', x: 80, y: 100, placed: false, correctX: 180, correctY: 120 },
    { id: 3, name: 'Новосибирск', x: 300, y: 200, placed: false, correctX: 400, correctY: 200 },
    { id: 4, name: 'Екатеринбург', x: 250, y: 180, placed: false, correctX: 300, correctY: 190 }
  ]);

  // Викторина
  const quizQuestions = [
    {
      question: 'Какого цвета средняя полоса российского флага?',
      options: ['Красная', 'Синяя', 'Белая', 'Зелёная'],
      correct: 1,
      emoji: '🇷🇺'
    },
    {
      question: 'Какая птица изображена на гербе России?',
      options: ['Сокол', 'Орёл', 'Ястреб', 'Лебедь'],
      correct: 1,
      emoji: '🦅'
    },
    {
      question: 'Как называется главная площадь Москвы?',
      options: ['Дворцовая', 'Красная', 'Театральная', 'Манежная'],
      correct: 1,
      emoji: '🏛️'
    },
    {
      question: 'Какое дерево является символом России?',
      options: ['Дуб', 'Ёлка', 'Берёза', 'Клён'],
      correct: 2,
      emoji: '🌳'
    }
  ];

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (gameMode) {
      setProgress((score / 100) * 100);
    }
  }, [score, gameMode]);

  const handlePuzzleDrop = (pieceId: number, x: number, y: number) => {
    setPuzzlePieces(pieces => 
      pieces.map(piece => {
        if (piece.id === pieceId) {
          const distance = Math.sqrt(
            Math.pow(x - piece.correctX, 2) + Math.pow(y - piece.correctY, 2)
          );
          
          if (distance < 50) {
            setScore(prev => prev + 25);
            return { ...piece, x: piece.correctX, y: piece.correctY, placed: true };
          } else {
            return { ...piece, x, y };
          }
        }
        return piece;
      })
    );
  };

  const handleQuizAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    if (answerIndex === quizQuestions[currentQuestion].correct) {
      setScore(prev => prev + 25);
    }

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        alert(`Игра завершена! Ваш счёт: ${score + (answerIndex === quizQuestions[currentQuestion].correct ? 25 : 0)} из ${quizQuestions.length * 25}`);
      }
    }, 2000);
  };

  const resetGame = () => {
    setScore(0);
    setLevel(1);
    setProgress(0);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setPuzzlePieces(prev => prev.map(piece => ({ ...piece, placed: false, x: Math.random() * 200 + 50, y: Math.random() * 100 + 50 })));
  };

  if (!gameMode) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 animate-bounce-in">
            🎮 Выбери игру, дружок!
          </h2>
          <p className="text-lg text-gray-600">Давай изучать Россию через весёлые игры</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card 
            className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-4 border-blue-200 hover:border-blue-400 animate-fade-in"
            onClick={() => setGameMode('puzzle')}
          >
            <CardHeader className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-green-400 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-color">
                <Icon name="MapPin" className="text-white" size={32} />
              </div>
              <CardTitle className="text-2xl">🧩 Пазл России</CardTitle>
              <CardDescription className="text-lg">Собери карту нашей страны!</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-2">
                <Badge className="bg-green-100 text-green-800">Легко</Badge>
                <p className="text-sm text-gray-600">Изучай города и регионы</p>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-4 border-purple-200 hover:border-purple-400 animate-fade-in"
            style={{ animationDelay: '0.2s' }}
            onClick={() => setGameMode('quiz')}
          >
            <CardHeader className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-color">
                <Icon name="Brain" className="text-white" size={32} />
              </div>
              <CardTitle className="text-2xl">🎯 Викторина</CardTitle>
              <CardDescription className="text-lg">Отвечай на вопросы о России!</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-2">
                <Badge className="bg-yellow-100 text-yellow-800">Средне</Badge>
                <p className="text-sm text-gray-600">Проверь свои знания</p>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-4 border-red-200 hover:border-red-400 animate-fade-in"
            style={{ animationDelay: '0.4s' }}
            onClick={() => setGameMode('coloring')}
          >
            <CardHeader className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-red-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-color">
                <Icon name="Palette" className="text-white" size={32} />
              </div>
              <CardTitle className="text-2xl">🎨 Раскраски</CardTitle>
              <CardDescription className="text-lg">Раскрашивай символы России!</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-2">
                <Badge className="bg-blue-100 text-blue-800">Легко</Badge>
                <p className="text-sm text-gray-600">Развивай творчество</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-2xl border-4 border-yellow-300">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">🏆 Твои достижения</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl">
                <div className="text-3xl font-bold text-blue-600">12</div>
                <div className="text-sm text-gray-600">Игр пройдено</div>
              </div>
              <div className="bg-white p-4 rounded-xl">
                <div className="text-3xl font-bold text-green-600">850</div>
                <div className="text-sm text-gray-600">Очков набрано</div>
              </div>
              <div className="bg-white p-4 rounded-xl">
                <div className="text-3xl font-bold text-purple-600">5</div>
                <div className="text-sm text-gray-600">Уровень</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Игровая панель */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-3xl shadow-lg animate-slide-in-right">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              onClick={() => setGameMode(null)}
              variant="ghost" 
              className="text-white hover:bg-white hover:bg-opacity-20"
            >
              <Icon name="ArrowLeft" className="mr-2" size={16} />
              Назад
            </Button>
            <div>
              <h2 className="text-2xl font-bold">
                {gameMode === 'puzzle' && '🧩 Пазл России'}
                {gameMode === 'quiz' && '🎯 Викторина'}
                {gameMode === 'coloring' && '🎨 Раскраски'}
              </h2>
              <p className="text-blue-100">Уровень {level}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-3xl font-bold">{score}</div>
              <div className="text-sm text-blue-100">Очки</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{Math.round(progress)}%</div>
              <div className="text-sm text-blue-100">Прогресс</div>
            </div>
            <Button 
              onClick={resetGame}
              variant="ghost" 
              className="text-white hover:bg-white hover:bg-opacity-20"
            >
              <Icon name="RotateCcw" size={16} />
            </Button>
          </div>
        </div>
        <Progress value={progress} className="mt-4 h-3" />
      </div>

      {/* Пазл */}
      {gameMode === 'puzzle' && (
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Собери карту России!</CardTitle>
            <CardDescription>Перетащи города на правильные места</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl p-8 min-h-[400px] border-4 border-dashed border-gray-300">
              <img 
                src="/img/53a02554-5b91-419d-b79f-1740b280a6a9.jpg" 
                alt="Карта России" 
                className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] object-cover rounded-xl opacity-30"
              />
              
              {puzzlePieces.map(piece => (
                <div
                  key={piece.id}
                  className={`absolute w-20 h-12 flex items-center justify-center text-sm font-bold rounded-lg cursor-move transition-all duration-300 ${
                    piece.placed 
                      ? 'bg-green-500 text-white shadow-lg animate-bounce-in' 
                      : 'bg-blue-500 text-white hover:bg-blue-600 hover:scale-110'
                  }`}
                  style={{ left: piece.x, top: piece.y }}
                  draggable
                  onDragEnd={(e) => {
                    const rect = e.currentTarget.parentElement?.getBoundingClientRect();
                    if (rect) {
                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;
                      handlePuzzleDrop(piece.id, x, y);
                    }
                  }}
                >
                  {piece.name}
                </div>
              ))}
            </div>
            
            {puzzlePieces.every(piece => piece.placed) && (
              <div className="text-center mt-6 animate-bounce-in">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-green-600">Поздравляем!</h3>
                <p className="text-gray-600">Ты собрал карту России!</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Викторина */}
      {gameMode === 'quiz' && (
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Викторина о России</span>
              <Badge variant="secondary">{currentQuestion + 1} из {quizQuestions.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-8">
              <div className="text-8xl mb-4 animate-bounce-in">
                {quizQuestions[currentQuestion].emoji}
              </div>
              <h3 className="text-2xl font-bold mb-6">
                {quizQuestions[currentQuestion].question}
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {quizQuestions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleQuizAnswer(index)}
                  disabled={showResult}
                  className={`h-16 text-lg transition-all duration-300 ${
                    showResult
                      ? index === quizQuestions[currentQuestion].correct
                        ? 'bg-green-500 hover:bg-green-500 animate-bounce-in'
                        : selectedAnswer === index
                        ? 'bg-red-500 hover:bg-red-500'
                        : 'bg-gray-300'
                      : 'bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 hover:scale-105'
                  }`}
                >
                  {option}
                </Button>
              ))}
            </div>

            {showResult && (
              <div className="text-center mt-6 animate-fade-in">
                {selectedAnswer === quizQuestions[currentQuestion].correct ? (
                  <div>
                    <div className="text-6xl mb-2">✅</div>
                    <h4 className="text-xl font-bold text-green-600">Правильно!</h4>
                  </div>
                ) : (
                  <div>
                    <div className="text-6xl mb-2">❌</div>
                    <h4 className="text-xl font-bold text-red-600">Неправильно!</h4>
                    <p className="text-gray-600">
                      Правильный ответ: {quizQuestions[currentQuestion].options[quizQuestions[currentQuestion].correct]}
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Раскраски */}
      {gameMode === 'coloring' && (
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Раскрась символы России!</CardTitle>
            <CardDescription>Выбери цвет и раскрась картинку</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="bg-gradient-to-br from-red-100 to-blue-100 p-8 rounded-2xl border-4 border-dashed border-gray-300 mb-6">
                <div className="text-9xl mb-4 animate-bounce-in">🇷🇺</div>
                <p className="text-xl text-gray-600">Флаг России</p>
              </div>

              <div className="flex justify-center space-x-4 mb-6">
                {['red', 'blue', 'white', 'yellow', 'green'].map(color => (
                  <div
                    key={color}
                    className={`w-12 h-12 rounded-full cursor-pointer border-4 border-gray-300 hover:border-gray-500 transition-all hover:scale-110`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>

              <div className="text-center">
                <div className="text-6xl mb-4 animate-bounce-in">🎨</div>
                <h3 className="text-2xl font-bold text-purple-600">Раскраски скоро!</h3>
                <p className="text-gray-600">Эта функция находится в разработке</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InteractiveGame;