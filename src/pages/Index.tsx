import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const [showButton, setShowButton] = useState(false);
  const [showScreamer, setShowScreamer] = useState(false);
  const [countDown, setCountDown] = useState(3);
  const [showAttack, setShowAttack] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const attackAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const shouldShow = Math.random() > 0.7;
      setShowButton(shouldShow);
      
      if (shouldShow) {
        setTimeout(() => {
          setShowButton(false);
        }, 2000);
      }
    }, 3000);
    
    audioRef.current = new Audio("/surprise-sound.mp3");
    attackAudioRef.current = new Audio("/attack-sound.mp3");
    
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    if (showScreamer) {
      if (audioRef.current) {
        audioRef.current.play().catch(e => console.log("Ошибка воспроизведения звука", e));
      }
      
      const timer = setTimeout(() => {
        if (!showAttack) {
          setShowScreamer(false);
          setCountDown(3);
        }
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [showScreamer, showAttack]);
  
  useEffect(() => {
    if (showAttack) {
      if (attackAudioRef.current) {
        attackAudioRef.current.play().catch(e => console.log("Ошибка воспроизведения звука атаки", e));
      }
      
      const timer = setTimeout(() => {
        setShowAttack(false);
        setShowScreamer(false);
        setCountDown(3);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [showAttack]);
  
  useEffect(() => {
    let timer;
    if (countDown > 0 && showScreamer && !showAttack) {
      timer = window.setTimeout(() => {
        setCountDown(prev => prev - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [countDown, showScreamer, showAttack]);
  
  const handleButtonClick = () => {
    setShowButton(false);
    setShowScreamer(true);
  };
  
  const handleAttackClick = () => {
    setShowAttack(true);
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-amber-50 relative">
      {showScreamer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="relative w-full max-w-lg">
            <div className="animate-pulse text-white text-4xl absolute top-4 right-4">{countDown}</div>
            {showAttack ? (
              <div className="attack-container">
                <img 
                  src="https://cdn.poehali.dev/files/a7811ae5-dfc5-4116-8c47-049147d2e52e.jpg" 
                  alt="Капибара атакует" 
                  className="w-full animate-ping"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h1 className="text-red-500 text-6xl font-bold animate-pulse">АТАКА!</h1>
                </div>
                <div className="absolute inset-0 bg-red-500 opacity-30 animate-pulse"></div>
              </div>
            ) : (
              <>
                <img 
                  src="https://cdn.poehali.dev/files/a7811ae5-dfc5-4116-8c47-049147d2e52e.jpg" 
                  alt="Капибара-сюрприз" 
                  className="w-full animate-bounce"
                />
                <h1 className="text-white text-4xl font-bold text-center mt-4 animate-pulse">КАПИБАРА-СУПЕРГЕРОЙ!</h1>
                <Button 
                  onClick={handleAttackClick}
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full animate-pulse"
                >
                  АТАКА
                </Button>
              </>
            )}
          </div>
        </div>
      )}
      <Card className="w-full max-w-lg bg-white shadow-lg overflow-hidden">
        <CardContent className="p-6 text-center">
          <h1 className="text-3xl font-bold mb-6 text-amber-800">Тихий вечер капибары</h1>
          <p className="mb-4 text-gray-600">
            Наблюдайте за этой милой капибарой, но будьте внимательны. 
            Может появиться тёмная кнопка - успейте нажать на неё!
          </p>
          <div className="relative w-full my-6">
            <img 
              src="https://cdn.poehali.dev/files/ddfc2961-d1c1-4f75-b6aa-0307207aff08.jpg" 
              alt="Милая капибара" 
              className="w-full rounded-lg"
            />
            {showButton && (
              <Button 
                onClick={handleButtonClick}
                className="absolute bg-black text-white hover:bg-gray-900 transition-all"
                style={{ 
                  left: `${Math.random() * 80}%`,
                  top: `${Math.random() * 80}%`
                }}
              >
                Кликни!
              </Button>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Игра "Поймай кнопку". Темная кнопка появляется случайно и быстро исчезает.
            Если успеете нажать - ждёт сюрприз!
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;