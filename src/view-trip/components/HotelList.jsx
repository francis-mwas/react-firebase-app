import { Link } from 'react-router-dom';
import HotelCardItem from './HotelCardItem';

const HotelList = ({ trip }) => {
  console.log('tripping: ', trip);


  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotel recomendation</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-8">
        {trip?.tripInformation?.hotelOptions?.map((hotel) => (
          <HotelCardItem hotel={hotel} />
        ))}
      </div>
    </div>
  );
};

export default HotelList;
