'use client'
import { useEffect, useState } from 'react';
import { createClient } from "@/utils/supabase/client";
import Link from 'next/link';
import CountdownTimer from '@/components/ui/CountdownTimer';

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
        setData(data)
      }

      setLoading(false)
    }

    fetchData()

  }, []);

  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-3 gap-10">
        {data.map((card) => {
          const cardDate = new Date(card.timer);
          const now = new Date();

          return (
            <div>
              {cardDate > now ? (
                /* IF countdown */
                <Link 
                  href={`/overview/${card.id}`} 
                  key={card.id} 
                  className="relative w-full h-full flex items-center justify-center aspect-square"
                >
                  <div className="absolute bg-purple-100 w-full h-full rounded-full"></div>
                  <div className="absolute bg-purple-200 w-[90%] h-[90%] rounded-full"></div>
                  <div className="rotate-[-10deg] shadow-custom bg-pattern-opacity absolute bg-purple-300 w-[80%] h-[80%] rounded-lg flex items-center justify-center">
                    <div className="absolute bg-purple-400 w-[60%] h-[60%] rounded-full flex items-center justify-center">
                      <span className="text-white text-2xl text-center leading-6">Kras<br></br>& win</span>
                      <CountdownTimer targetDate={cardDate} />
                    </div>
                  </div>
                </Link>
              ) : (
                /* ELSE no countdown */
                <>
                  {card.completed ? (
                    <p>Event has passed and it is completed</p>
                  ) : (
                    <p>Event has passed and it is not completed</p>
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