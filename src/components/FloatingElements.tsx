
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface FloatingElementsProps {
  className?: string;
}

const FloatingElements: React.FC<FloatingElementsProps> = ({ className = "" }) => {
  const elementsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!elementsRef.current) return;
    
    const elements = elementsRef.current.querySelectorAll('.floating-element');
    
    elements.forEach((element, index) => {
      // Zufällige Startposition und Animation für jedes Element
      gsap.set(element, {
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
        opacity: 0.7 + Math.random() * 0.3
      });
      
      // Kontinuierliche Animation mit zufälligen Parametern
      gsap.to(element, {
        duration: 5 + Math.random() * 10,
        x: `+=${Math.random() * 100 - 50}`,
        y: `+=${Math.random() * 100 - 50}`,
        rotation: Math.random() * 360,
        opacity: 0.7 + Math.random() * 0.3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });
    });
    
    return () => {
      // Cleanup animations
      gsap.killTweensOf(elements);
    };
  }, []);
  
  return (
    <div ref={elementsRef} className={`floating-elements-container pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className="floating-element absolute w-5 h-5 rounded-full bg-said-green/20" style={{ top: '20%', left: '10%' }}></div>
      <div className="floating-element absolute w-8 h-8 rounded-full bg-said-green/30" style={{ top: '50%', left: '70%' }}></div>
      <div className="floating-element absolute w-12 h-12 rounded-full bg-said-green/10" style={{ top: '30%', left: '50%' }}></div>
      <div className="floating-element absolute w-6 h-6 rounded-full bg-said-green/15" style={{ top: '70%', left: '30%' }}></div>
      <div className="floating-element absolute w-10 h-10 rounded-full bg-said-green/25" style={{ top: '15%', left: '80%' }}></div>
      <div className="floating-element absolute w-14 h-14 rounded-full bg-said-green/5" style={{ top: '80%', left: '15%' }}></div>
    </div>
  );
};

export default FloatingElements;
