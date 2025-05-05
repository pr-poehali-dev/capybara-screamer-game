
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface CapybaraGameProps {
  onCapybaraClick: () => void;
  showButton: boolean;
}

const CapybaraGame = ({ onCapybaraClick, showButton }: CapybaraGameProps) => {
  // Позиция кнопки
  const [position, setPosition] = useState({ x: 50, y: 50 });
  
  // Обновляем позицию кнопки при появлении
  useEffect(() => {
    if (showButton) {
      setPosition({
        x: Math.floor(Math.random() * 80),
        y: Math.floor(Math.random() * 80),
      });
    }
  }, [showButton]);
  
  return (
    <div className="relative w-full">
      <img 
        src="https://cdn.poehali.dev/files/ddfc2961-d1c1-4f75-b6aa-0307207aff08.jpg" 
        alt="Милая капибара" 
        className="w-full rounded-lg"
      />
      
      {showButton && (
        <Button 
          onClick={onCapybaraClick}
          className="absolute bg-black text-white hover:bg-gray-900 transition-all"
          style={{
            left: `${position.x}%`,
            top: `${position.y}%`,
          }}
        >
          Кликни!
        </Button>
      )}
    </div>
  );
};

export default CapybaraGame;
