import { useState } from "react");
import { Button } from "@/components/ui/button";

interface CapybaraScreamerProps {
  countDown: number;
  onAttack: () => void;
  isAttacking: boolean;
}

const CapybaraScreamer = ({ countDown, onAttack, isAttacking }: CapybaraScreamerProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="relative w-full max-w-lg">
        <div className="animate-pulse text-white text-4xl absolute top-4 right-4">{countDown}</div>
        {isAttacking ? (
          <div className="attack-container">
            <img 
              src="https://cdn.poehali.dev/files/a7811ae5-dfc5-4116-8c47-049147d2e52e.jpg" 
              alt="Капибара атакует" 
              className="w-full animate-ping"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-red-500 text-6xl font-bold animate-pulse">АТАКА!</h1>
            </div>
            <div className="absolute inset-0 bg-red-500 opacity-30 animate-flash"></div>
          </div>
        ) : (
          <>
            <img 
              src="https://cdn.poehali.dev/files/a7811ae5-dfc5-4116-8c47-049147d2e52e.jpg" 
              alt="Капибара-супергерой" 
              className="w-full animate-bounce"
            />
            <h1 className="text-white text-4xl font-bold text-center mt-4 animate-pulse">КАПИБАРА-СУПЕРГЕРОЙ!</h1>
            <Button 
              onClick={onAttack}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full animate-pulse"
            >
              АТАКА
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default CapybaraScreamer;