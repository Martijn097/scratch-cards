'use client'
import { useEffect, useState } from 'react';
import { createClient } from "@/utils/supabase/client";

// Define the type for your data items
type CardType  = {
  id: number
  title: string
  completed: boolean
}

const CardDetail = ({ params }: { params: { id: number } }) => {
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!card) {
    return <div>Card not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{card.title}</h1>
    </div>
  );
};

export default CardDetail;