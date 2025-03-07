import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Restaurant } from '@/types/restaurant';

const RestaurantList = () => {
  const [resData, setResData] = useState<Restaurant[]>([]);

  const getResData = async () => {
    try {
      const res = await fetch(
        'https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.9792244&lng=75.7706016&collection=83667',
        {
          headers: {
            'user-agent':
              'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1'
          }
        }
      );
      const data = await res.json();
      const realData = data.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
      setResData(realData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getResData();
  }, []);
  console.log(resData)

  if (!resData?.length) {
    return (
      <div className="flex flex-wrap justify-center">
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <Card key={index} className="m-2 w-64 animate-pulse h-40 bg-gray-100" />
          ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center">
      {resData && resData.map((restaurant) => (
        <Card key={restaurant.info.id} className="m-2 w-64">
          <CardContent className="p-4">
            <h2 className="font-bold text-lg">{restaurant.info.name}</h2>
            <p className="text-sm text-gray-600">{restaurant.info.cuisines?.join(', ')}</p>
            <p className="text-sm mt-2">{restaurant.info.locality}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RestaurantList;
