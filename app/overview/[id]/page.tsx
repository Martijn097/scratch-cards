'use client'
import { useEffect, useRef, useState } from 'react';
import { createClient } from "@/utils/supabase/client";
import confetti from 'canvas-confetti';
import { isSafari } from '@/utils/isSafari';
import Link from 'next/link';
import Image from 'next/image';

// Define the type for your data items
type CardType  = {
  id: number
  title: string
  completed: boolean
}

export default function Card ({ params }: { params: { id: number } }) {
  // Refs for card
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardCanvasRenderRef = useRef<HTMLImageElement>(null);
  const cardCoverContainerRef = useRef<HTMLDivElement>(null);
  const cardCoverRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardImageRef = useRef<HTMLImageElement>(null);

  // Positions and detections
  let clearDetectionTimeout: NodeJS.Timeout | null = null;
  let setImageTimeout: NodeJS.Timeout | null = null;
  let positionX: number;
  let positionY: number;

  // Supabase
  const supabase = createClient();
  const { id } = params;
  const [card, setCard] = useState<CardType | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('scratch-cards') 
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching card data:', error);
      } else {
        setCard(data);
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

  // Completed card function
  const markAsCompleted = async (id: number) => {
    const { data, error } = await supabase
      .from('scratch-cards') 
      .update({ completed: true })
      .eq('id', id);

    if (error) {
      console.error('Error updating data:', error);
    } else {
      // Optionally, update the local state to reflect the change
      setCard((prevData) => prevData ? { ...prevData, completed: true } : null);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const image = cardCanvasRenderRef.current;
    const cardCoverContainer = cardCoverContainerRef.current;
    const text = textRef.current;
    const cardImage = cardImageRef.current;

    if (!canvas || !image || !text || !cardImage || !cardCoverContainer) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const devicePixelRatio = window.devicePixelRatio || 1;
    const canvasWidth = canvas.offsetWidth * devicePixelRatio;
    const canvasHeight = canvas.offsetHeight * devicePixelRatio;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    context.scale(devicePixelRatio, devicePixelRatio);

    if (isSafari()) {
      canvas.classList.add('hide');
    }

    const getPosition = (event: PointerEvent, canvas: HTMLCanvasElement) => {
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
        cardCoverContainer?.classList.add('clear');
        confetti({
          particleCount: 100,
          spread: 90,
          origin: {
            y: (text.getBoundingClientRect().bottom + 60) / window.innerHeight,
          },
        });
        if (card){
          text.textContent = `${card.title}!`;
          text.style.color = '#0ED96B';
          markAsCompleted(card.id);
        }
        cardImage?.classList.add('animate');
        cardCoverContainer?.addEventListener('transitionend', () => {
          cardCoverContainer.classList.add('hide');
        }, { once: true });
      }
    };

    const setImageFromCanvas = () => {
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const previousUrl = image.src;
          image.src = url;

          if (!previousUrl) {
            image.classList.remove('hide');
          } else {
            URL.revokeObjectURL(previousUrl);
          }
        }
      });
    };

    const plot = (e: PointerEvent) => {
      const { x, y } = getPosition(e, canvas);
      plotLine(context, positionX, positionY, x, y);
      positionX = x;
      positionY = y;
      if (isSafari()) {
        clearTimeout(setImageTimeout as NodeJS.Timeout);

        setImageTimeout = setTimeout(() => {
          setImageFromCanvas();
        }, 5);
      }
    };

    canvas.addEventListener('pointerdown', (e: PointerEvent) => {
      cardCoverRef.current?.classList.remove('shine');
      ({ x: positionX, y: positionY } = getPosition(e, canvas));
      clearTimeout(clearDetectionTimeout!);

      const plotMove = (event: PointerEvent) => plot(event);
      canvas.addEventListener('pointermove', plotMove);

      window.addEventListener('pointerup', () => {
        canvas.removeEventListener('pointermove', plotMove);
        clearDetectionTimeout = setTimeout(checkBlackFillPercentage, 500);
      }, { once: true });
    });
  }, [loading, card]);

  return (
    <div className="w-full h-full flex flex-col gap-10">

      <div className="flex max-w-[1080px] mx-auto px-4 mt-8 items-center w-full justify-center flex-col gap-2">
        <div className="text-2xl sm:text-4xl flex items-center font-bold flex gap-2">
          <span className="text-center">Kras en win</span>
          <div className="animate-customPulse">
            <Image
              src="/emojis/party.png"
              alt="Heart emoji"
              width={40}
              height={40}
            />
          </div>
        </div>
        <div className="text-xl font-normal text-black-400">
          <span className="text-center flex w-full">Beweeg met je muis of vinger over het scherm op de kaart</span>
        </div>
      </div>

      <div className="flex max-w-[1080px] mx-auto px-8 sm:px-10 justify-center items-center">
        <div className="bg-white relative scratch-card rounded-lg p-4 w-[16rem] h-[16rem] sm:w-[20rem] sm:h-[20rem]">
          <div ref={cardCoverContainerRef} className="scratch-card-cover-container">
            <canvas 
              ref={canvasRef} 
              className="scratch-card-canvas"
              width="1000"
              height="1000"
            />
            <img ref={cardCanvasRenderRef} className="scratch-card-canvas-render hide" />
            <div ref={cardCoverRef} className="scratch-card-cover rounded-lg shine bg-pattern-opacity bg-purple-300"></div>
          </div>
          {!loading && card &&
            <Image
              ref={cardImageRef}
              src={`/images/${card.id}.png`}
              className="scratch-card-image"
              alt="Apple 50$ gift card" 
              width={1000}
              height={1000}
            />
          }
        </div>
      </div>
      <div className="flex items-center justify-center gap-4">
        <Image
          src="/emojis/gift.png"
          alt="Apple 50$ gift card" 
          width={32}
          height={32}
        />
        <p ref={textRef} className="scratch-card-text text-center text-xl sm:text-3xl">
          Kras voor je cadeau!
        </p>
      </div>

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