'use client'

import { useEffect, useState } from 'react';
import { createClient } from "@/utils/supabase/client";
import Image from 'next/image';

// Define the type for your data items
type DataType = {
  id: number
  title: string
  completed: boolean,
  timer: string; // ISO date string
}

export default function OverviewHeader() {
  // Supabase
  const supabase = createClient();
  const [completedCount, setCompletedCount] = useState(0);
  const [loading, setLoading] = useState(true)

  // Fetch Supabase data
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('scratch-cards')
        .select('id', { count: 'exact' })
        .eq('completed', true);
      
      if (error) {
        console.error(error)
      } else {
        setCompletedCount(data.length);
      }

      setLoading(false)
    }

    fetchData()

  }, []);

  return (
    <div className="flex max-w-[1080px] mx-auto px-4 mt-8 items-center w-full justify-center flex-col gap-2">
      <div className="text-2xl sm:text-4xl flex items-center font-bold flex gap-2">
        <span className="text-center">Krasloten overzicht</span>
        <div className="animate-customPulse">
          <Image
            src="/emojis/lottery.png"
            alt="Heart emoji"
            width={40}
            height={40}
          />
        </div>
      </div>
      <div className="text-xl font-normal text-black-400">
        <span className="text-center flex w-full">{completedCount}/15 kaarten opgekrast</span>
      </div>
    </div>
  );
}