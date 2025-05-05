
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const [showButton, setShowButton] = useState(false);
  const [showScreamer, setShowScreamer] = useState(false);
  const [countDown, setCountDown] = useState(3);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Случайное появление кнопки
  useEffect(() => {
    const interval = setInterval(() => {
      const shouldShow = Math.random() > 0.7; // 30% шанс появления кнопки
      setShowButton(shouldShow);
      
      if (shouldShow) {
        // Кнопка исчезает через 2 секунды
        setTimeout(() => {
          setShowButton(false);
        }, 2000);
      }
    }, 3000);

    // Создаем аудио элемент для звука
    audioRef.current = new Audio("/surprise-sound.mp3");
    
    return () => clearInterval(interval);
  }, []);

  // Обрабатываем показ скримера
  useEffect(() => {
    if (showScreamer) {
      // Проигрываем звук
      if (audioRef.current) {
        audioRef.current.play().catch(e => console.log("Ошибка воспроизведения звука", e));
      }
      
      // Запускаем таймер для скрытия скримера
      const timer = setTimeout(() => {
        setShowScreamer(false);
        setCountDown(3);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [showScreamer]);

  // Обратный отсчет для скримера
  useEffect(() => {
    let timer: number;
    if (countDown > 0 && showScreamer) {
      timer = window.setTimeout(() => {
        setCountDown(prev => prev - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [countDown, showScreamer]);
  
  // Обработчик для клика по кнопке
  const handleButtonClick = () => {
    setShowButton(false);
    setShowScreamer(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-amber-50 relative">
      {/* Скример (капибара в костюме) */}
      {showScreamer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="relative w-full max-w-lg">
            <div className="animate-pulse text-white text-4xl absolute top-4 right-4">{countDown}</div>
            <img 
              src="https://cdn.poehali.dev/files/a7811ae5-dfc5-4116-8c47-049147d2e52e.jpg" 
              alt="Капибара-сюрприз" 
              className="w-full animate-bounce"
            />
            <h1 className="text-white text-4xl font-bold text-center mt-4 animate-pulse">КАПИБАРА-СУПЕРГЕРОЙ!</h1>
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
            
            {/* Тёмная кнопка, которая появляется случайно */}
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
