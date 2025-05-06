
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Background: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number>(0);
  const isAnimating = useRef(true);

  // Particle class
  class Particle {
    x: number;
    y: number;
    size: number;
    baseSize: number;
    color: string;
    speedX: number;
    speedY: number;
    maxSpeed: number;
    directionChangeCounter: number;
    alpha: number;
    canvas: HTMLCanvasElement;
    connectDistance: number;

    constructor(canvas: HTMLCanvasElement) {
      this.canvas = canvas;
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.baseSize = Math.random() * 2 + 0.7;
      this.size = this.baseSize;
      this.color = '#43d9ad';
      this.speedX = (Math.random() - 0.5) * 0.7;
      this.speedY = (Math.random() - 0.5) * 0.7;
      this.maxSpeed = 1.5;
      this.directionChangeCounter = 0;
      this.alpha = Math.random() * 0.6 + 0.2;
      this.connectDistance = 150;
    }

    update(mouseX: number, mouseY: number) {
      // Random movement
      this.directionChangeCounter++;
      if (this.directionChangeCounter > 100) {
        this.speedX = (Math.random() - 0.5) * 0.7;
        this.speedY = (Math.random() - 0.5) * 0.7;
        this.directionChangeCounter = 0;
      }

      // Mouse interaction
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // If mouse is close, particles are attracted to it
      if (distance < 100) {
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const force = (100 - distance) / 100;
        this.speedX += forceDirectionX * force * 0.2;
        this.speedY += forceDirectionY * force * 0.2;
        
        // Grow size near mouse
        this.size = this.baseSize + (1 - distance / 100) * 2;
      } else {
        this.size = this.baseSize;
      }
      
      // Speed limitation
      const currentSpeed = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY);
      if (currentSpeed > this.maxSpeed) {
        this.speedX = (this.speedX / currentSpeed) * this.maxSpeed;
        this.speedY = (this.speedY / currentSpeed) * this.maxSpeed;
      }

      // Position update
      this.x += this.speedX;
      this.y += this.speedY;

      // Boundary check with bounce effect
      if (this.x < 0 || this.x > this.canvas.width) {
        this.speedX *= -1;
        this.x = Math.max(0, Math.min(this.x, this.canvas.width));
      }
      if (this.y < 0 || this.y > this.canvas.height) {
        this.speedY *= -1;
        this.y = Math.max(0, Math.min(this.y, this.canvas.height));
      }
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.globalAlpha = this.alpha;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    connect(particles: Particle[], ctx: CanvasRenderingContext2D) {
      for (const particle of particles) {
        if (this === particle) continue;
        
        const dx = this.x - particle.x;
        const dy = this.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < this.connectDistance) {
          const opacity = 1 - (distance / this.connectDistance);
          ctx.beginPath();
          ctx.strokeStyle = `rgba(67, 217, 173, ${opacity * 0.3})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(particle.x, particle.y);
          ctx.stroke();
        }
      }
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Recreate particles when canvas is resized
      initParticles();
    };

    // Mouse move event handler
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current.x = e.clientX;
      mousePosition.current.y = e.clientY;
      
      // Create ripple effect
      createRipple(e.clientX, e.clientY);
    };

    // Create a ripple effect at mouse click
    const handleClick = (e: MouseEvent) => {
      const rippleRadius = 50;
      const rippleColor = '#43d9ad';
      const rippleDuration = 0.8;
      
      const ripple = document.createElement('div');
      ripple.className = 'absolute rounded-full pointer-events-none';
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      ripple.style.backgroundColor = rippleColor;
      ripple.style.opacity = '0.6';
      document.body.appendChild(ripple);
      
      gsap.fromTo(ripple, 
        { width: 0, height: 0, x: -rippleRadius/2, y: -rippleRadius/2 },
        { 
          width: rippleRadius * 2, 
          height: rippleRadius * 2, 
          x: -rippleRadius, 
          y: -rippleRadius,
          opacity: 0,
          duration: rippleDuration,
          ease: "power2.out",
          onComplete: () => {
            if (ripple.parentNode) {
              ripple.parentNode.removeChild(ripple);
            }
          }
        }
      );
      
      // Pulse particles outward
      const particleList = particles.current;
      particleList.forEach(p => {
        const dx = p.x - e.clientX;
        const dy = p.y - e.clientY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 200) {
          const angle = Math.atan2(dy, dx);
          const force = (200 - distance) / 50;
          
          p.speedX += Math.cos(angle) * force;
          p.speedY += Math.sin(angle) * force;
        }
      });
    };
    
    // Create small ripple on mouse movement
    const createRipple = (x: number, y: number) => {
      if (Math.random() > 0.97) { // Occasional small ripples
        const rippleRadius = Math.random() * 20 + 10;
        const rippleColor = '#43d9ad';
        const rippleDuration = 0.5;
        
        const ripple = document.createElement('div');
        ripple.className = 'absolute rounded-full pointer-events-none';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.style.backgroundColor = rippleColor;
        ripple.style.opacity = '0.3';
        document.body.appendChild(ripple);
        
        gsap.fromTo(ripple, 
          { width: 0, height: 0, x: -rippleRadius/2, y: -rippleRadius/2 },
          { 
            width: rippleRadius * 2, 
            height: rippleRadius * 2, 
            x: -rippleRadius, 
            y: -rippleRadius,
            opacity: 0,
            duration: rippleDuration,
            ease: "power2.out",
            onComplete: () => {
              if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
              }
            }
          }
        );
      }
    };

    // Initialize particles
    const initParticles = () => {
      particles.current = [];
      const particleCount = Math.min(80, window.innerWidth / 20); // Responsive particle count
      
      for (let i = 0; i < particleCount; i++) {
        particles.current.push(new Particle(canvas));
      }
    };

    // Main animation loop
    const animate = () => {
      if (!ctx || !canvas || !isAnimating.current) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      const particleList = particles.current;
      for (let i = 0; i < particleList.length; i++) {
        particleList[i].update(mousePosition.current.x, mousePosition.current.y);
        particleList[i].draw(ctx);
        
        // Connect particles
        particleList[i].connect(particleList, ctx);
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    // Initialize
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    
    // Start animation
    animate();
    
    // Cleanup
    return () => {
      isAnimating.current = false;
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      />
    </>
  );
};

export default Background;
