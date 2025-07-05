import BannerCarousel from '@/components/home/BannerCarousel';
import RestaurantList from '@/components/home/RestaurantList';

const Home = () => {
  return (
    <div className="w-full py-2">
      <BannerCarousel />
      <div className='m-4 flex justify-center text-center'>
        <h1 className='text-3xl font-bold'>Restaurants near You</h1>
      </div>
      <RestaurantList />
    </div>
  );
};

export default Home;