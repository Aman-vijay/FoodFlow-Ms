import React, { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from '@/components/ui/card';
import Autoplay from "embla-carousel-autoplay"

const Home = () => {
  const [resData, setResData] = useState([]);
  const [banners, setBanners] = useState([
    "/assets/ff_2.webp",
    "/assets/ff_3.webp",
    "/assets/ff_4.webp"
  ]);

  const getResData = async () => {
    try {
      const res = await fetch('https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.9792244&lng=75.7706016&collection=83667', {
        headers: {
          "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1"
        }
      });

      const data = await res.json();
      const realData = data.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
      setResData(realData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getResData();
  }, []);

  return (
    <div className="w-full py-2">
      <Carousel   opts={{
    align: "start",
    loop: true,
  }} plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]} className="w-full  mx-auto">
        <CarouselContent className="-ml-4">
          {banners.length > 0 ? (
            banners.map((banner, index) => (
              <CarouselItem key={index} className="md:basis-1/2">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex items-center justify-center  h-80">
                      <img 
                        src={banner} 
                        alt={`Food banner ${index + 1}`}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))
          ) : (
            Array(4).fill(0).map((_, index) => (
              <CarouselItem key={index} className="md:basis-1/2">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex items-center justify-center p-6 h-48 bg-gray-100 animate-pulse">
                      <p className="text-gray-500">Loading...</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))
          )}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>

      <div className='m-4 flex justify-center text-center'>
        <h1 className='text-3xl font-bold '> Restauants near You</h1>
      </div>
    </div>
  );
};

export default Home;
