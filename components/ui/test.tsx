'use client'
import { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import styles from './styles.module.css';

const Home = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratched, setIsScratched] = useState(false);

  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
    } else {
      console.log('false');
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    
    let isPointerDown = false;
    let positionX: number;
    let positionY: number;
    let clearDetectionTimeout: NodeJS.Timeout | null = null;

    const devicePixelRatio = window.devicePixelRatio || 1;
    const canvasWidth = canvas.offsetWidth * devicePixelRatio;
    const canvasHeight = canvas.offsetHeight * devicePixelRatio;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    context.scale(devicePixelRatio, devicePixelRatio);

    const getPosition = (event: PointerEvent) => {
      const { clientX, clientY } = event;
      const { left, top } = canvas.getBoundingClientRect();
      return {
        x: clientX - left,
        y: clientY - top,
      };
    };

    const plotLine = (context: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) => {
      const diffX = Math.abs(x2 - x1);
      const diffY = Math.abs(y2 - y1);
      const dist = Math.sqrt(diffX * diffX + diffY * diffY);
      const step = dist / 50;
      let i = 0;
      let t: number;
      let x: number;
      let y: number;

      while (i < dist) {
        t = Math.min(1, i / dist);
        x = x1 + (x2 - x1) * t;
        y = y1 + (y2 - y1) * t;
        context.beginPath();
        context.arc(x, y, 16, 0, Math.PI * 2);
        context.fill();
        i += step;
      }
    };

    const checkBlackFillPercentage = () => {
      const imageData = context.getImageData(0, 0, canvasWidth, canvasHeight);
      const pixelData = imageData.data;
      let blackPixelCount = 0;

      for (let i = 0; i < pixelData.length; i += 4) {
        const red = pixelData[i];
        const green = pixelData[i + 1];
        const blue = pixelData[i + 2];
        const alpha = pixelData[i + 3];

        if (red === 0 && green === 0 && blue === 0 && alpha === 255) {
          blackPixelCount++;
        }
      }

      const blackFillPercentage = (blackPixelCount * 100) / (canvasWidth * canvasHeight);

      if (blackFillPercentage >= 45) {
        setIsScratched(true);
        confetti({
          particleCount: 100,
          spread: 90,
          origin: {
            y: (document.querySelector(`.${styles.text}`)!.getBoundingClientRect().bottom + 60) / window.innerHeight,
          },
        });
      }
    };

    const plot = (e: PointerEvent) => {
      const { x, y } = getPosition(e);
      plotLine(context, positionX, positionY, x, y);
      positionX = x;
      positionY = y;
    };

    const onPointerDown = (e: PointerEvent) => {
      ({ x: positionX, y: positionY } = getPosition(e));
      clearTimeout(clearDetectionTimeout!);
      canvas.addEventListener('pointermove', plot);

      window.addEventListener('pointerup', () => {
        canvas.removeEventListener('pointermove', plot);
        clearDetectionTimeout = setTimeout(checkBlackFillPercentage, 500);
      }, { once: true });
    };

    canvas.addEventListener('pointerdown', onPointerDown);

    return () => {
      canvas.removeEventListener('pointerdown', onPointerDown);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.scratchCard}>
        <div className={`${styles.scratchCardCoverContainer} ${isScratched ? styles.clear : ''}`}>
          <canvas ref={canvasRef} className={styles.scratchCardCanvas} />
          <div className={`${styles.scratchCardCover} ${isScratched ? '' : styles.shine}`}>
            <svg className={styles.scratchCardCoverBackground} />
          </div>
        </div>
        <img className={`${styles.scratchCardImage} ${isScratched ? styles.animate : ''}`} src="https://assets.codepen.io/4175254/apple-gift-card.png" alt="Apple 50$ gift card" />
      </div>
      <p className={styles.text}>🎁 Scratch for a surprise!</p>
      <svg width="0" height="0">
        <filter id="remove-black" colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    -1 -1 -1 0 1"
            result="black-pixels"
          />
          <feComposite in="SourceGraphic" in2="black-pixels" operator="out" />
        </filter>
        <filter id="noise">
          <feTurbulence baseFrequency="0.5"></feTurbulence>
        </filter>
      </svg>
    </div>
  );
}

export default Home;