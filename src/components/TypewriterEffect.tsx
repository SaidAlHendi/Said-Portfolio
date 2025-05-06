
import React from 'react';
import { TypeAnimation } from 'react-type-animation';

interface TypewriterEffectProps {
  sequences: (string | number)[];
  className?: string;
  speed?: number;
  repeat?: number;
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({ 
  sequences, 
  className = "", 
  speed = 50,
  repeat = Infinity
}) => {
  return (
    <TypeAnimation
      sequence={sequences}
      wrapper="span"
      speed={{ type: 'keyStrokeDelayInMs', value: speed }}
      repeat={repeat}
      className={className}
    />
  );
};

export default TypewriterEffect;
