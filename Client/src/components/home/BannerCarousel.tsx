import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import Autoplay from 'embla-carousel-autoplay';

const banners = [
  '/assets/ff_2.webp',
  '/assets/ff_3.webp',
  '/assets/ff_4.webp'
];

const BannerCarousel = () => {
  return (
    <Carousel
    opts={{
      align: "start",
      loop: true,
    }} 
    plugins={[
          Autoplay({
            delay: 2000,
          })]}
      className="w-full mx-auto"
    >
      <CarouselContent className="-ml-4">
        {banners.map((banner, index) => (
          <CarouselItem key={index} className="md:basis-1/2">
            <div className="p-1">
              <Card>
                <CardContent className="flex items-center justify-center h-80">
                  <img
                    src={banner}
                    alt={`Food banner ${index + 1}`}
                    className="w-full h-full object-cover rounded-md"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  );
};

export default BannerCarousel;
