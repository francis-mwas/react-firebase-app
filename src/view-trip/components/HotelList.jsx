import { Link } from 'react-router-dom';

const HotelList = ({ trip }) => {
  console.log('tripping: ', trip);

  const extractRating = (ratingString) => {
    // Ensure the input is a string and is not empty
    if (typeof ratingString !== 'string' || ratingString.trim() === '') {
      console.error('Invalid input: Rating must be a non-empty string.');
      return null;
    }

    // Regular expression to match 'X/Y' where X is the rating and Y is optional
    const ratingMatch = ratingString.trim().match(/^(\d+(\.\d+)?)\/\d+$/);

    if (ratingMatch) {
      // Convert the captured group to a float (the rating part before '/')
      return parseFloat(ratingMatch[1]);
    } else {
      console.error(
        "Invalid format: Rating string must be in the format 'X/Y'."
      );
      return null;
    }
  };

  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotel recomendation</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-8">
        {trip?.tripInformation?.hotelOptions?.map((hotel) => (
          <Link
            to={
              'https://www.google.com/maps/search/?api=1&query=' +
              hotel?.hotelName +
              ' ' +
              hotel?.hotelAddress
            }
            target="_blank"
            key={hotel.hotelName}
          >
            <div className="hover:scale-105 transition-all cursor-pointer bg-gray-100 rounded-sm">
              <img src="/placeholder.jpg" className="rounded-lg" />
              <div className="my-2 flex flex-col gap-2 px-2">
                <h2 className="font-medium">{hotel?.hotelName}</h2>
                <h2 className="text-xs text-gray-500">
                  📍 {hotel.hotelAddress}
                </h2>
                <h2 className="text-sm">💰 {hotel?.price}</h2>
                <h2 className="text-sm"> ⭐ {extractRating(hotel.rating)}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HotelList;
