'use client'
import { useEffect, useState } from 'react';
import { createClient } from "@/utils/supabase/client";
import Link from 'next/link';
import CountdownTimer from '@/components/ui/CountdownTimer';
import { LockIcon}  from '@/components/ui/Icons';
import Image from 'next/image';

// Define the type for your data items
type DataType = {
  id: number
  title: string
  completed: boolean,
  timer: string; // ISO date string
}

export default function Cards() {
  // Supabase
  const supabase = createClient();
  const [data, setData] = useState<DataType[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch Supabase data
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('scratch-cards')
        .select('*')
      
      if (error) {
        console.error(error)
      } else {
        const sortedData = data.sort((a: DataType, b: DataType) => a.id - b.id);
        setData(sortedData);
      }

      setLoading(false)
    }

    fetchData()

  }, []);

  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-10">
        {data.map((card) => {
          const cardDate = new Date(card.timer);
          const now = new Date();

          return (
            <div>
              {cardDate > now ? (
                /* IF countdown */
                <div className="flex flex-col gap-4">
                  <div 
                    key={card.id} 
                    className="relative w-full h-full flex items-center justify-center aspect-square cursor-not-allowed"
                  >
                    <div className="absolute bg-purple-100 w-full h-full rounded-full"></div>
                    <div className="absolute bg-purple-200 w-[90%] h-[90%] rounded-full"></div>
                    <div className="shadow-custom bg-pattern-opacity absolute bg-purple-300 w-[80%] h-[80%] rounded-lg flex items-center justify-center">
                      <div className="absolute bg-purple-400 w-[60%] h-[60%] rounded-full flex items-center justify-center">
                        <div className="p-4 pb-2 w-[120%] rounded-lg flex flex-col items-center justify-center bg-black absolute">
                          <LockIcon className="w-[24px] h-[24px] absolute top-[-12px]" />
                          <span className="text-white text-lg text-center leading-6 text-black-200">Beschikbaar in</span>
                          <CountdownTimer targetDate={cardDate} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex justify-center items-center">
                    <div className="text-xl w-[54px] h-[54px] flex items-center justify-center border border-neutral-200 rounded-lg">
                      {card.id}
                    </div>
                  </div>
                  <div className="w-full flex justify-center items-center mb-4">
                    <div className="text-xl flex text-center">
                      ...
                    </div>
                  </div>
                </div>
              ) : (
                /* ELSE no countdown */
                <>
                  {card.completed ? (
                    <div className="flex flex-col gap-4">
                      <div 
                        key={card.id} 
                        className="relative w-full h-full flex items-center justify-center aspect-square"
                      >
                        <div className="absolute bg-black-100 w-full h-full rounded-full"></div>
                        <div className="absolute bg-black-200 w-[90%] h-[90%] rounded-full"></div>
                        <div className="absolute w-[80%] h-[80%] flex items-center justify-center">
                          <Image
                            src={`/images/${card.id}.png`}
                            className="scratch-card-image"
                            alt="Apple 50$ gift card" 
                            width={1000}
                            height={1000}
                          />
                        </div>
                      </div>
                      <div className="w-full flex justify-center items-center">
                        <div className="text-xl w-[54px] h-[54px] flex items-center justify-center border border-neutral-200 rounded-lg">
                          {card.id}
                        </div>
                      </div>
                      <div className="w-full flex justify-center items-center mb-4">
                        <div className="text-xl flex text-center">
                          {card.title}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      <Link 
                        href={`/overview/${card.id}`} 
                        key={card.id} 
                        className="relative w-full h-full flex items-center justify-center aspect-square"
                      >
                        <div className="absolute bg-purple-100 w-full h-full rounded-full"></div>
                        <div className="absolute bg-purple-200 w-[90%] h-[90%] rounded-full"></div>
                        <div className="shadow-custom bg-pattern-opacity absolute bg-purple-300 w-[80%] h-[80%] rounded-lg flex items-center justify-center">
                          <div className="absolute bg-purple-400 w-[60%] h-[60%] rounded-full flex items-center justify-center">
                            <span className="text-white text-2xl text-center leading-6">Kras<br></br>& win!</span>
                          </div>
                        </div>
                      </Link>
                      <div className="w-full flex justify-center items-center">
                        <div className="text-xl w-[54px] h-[54px] flex items-center justify-center border border-neutral-200 rounded-lg">
                          {card.id}
                        </div>
                      </div>
                      <div className="w-full flex justify-center items-center mb-4">
                        <div className="text-xl flex text-center">
                          ...
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}