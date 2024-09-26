import { Link } from 'react-router-dom';
import { fetchPlaces, PHOTO_REF_URL } from '@/service/GlobalApi';
import { useEffect, useState } from 'react';

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
    console.error("Invalid format: Rating string must be in the format 'X/Y'.");
    return null;
  }
};

const HotelCardItem = ({ hotel }) => {
  const [photoUrl, setPhotoUrl] = useState('');
  useEffect(() => {
    hotel && getPlacesPhotos();
  }, [hotel]);
  const requestBody = {
    textQuery: hotel?.hotelName,
    languageCode: 'en', // Optional, can specify 'en', 'fr', etc.
  };
  const getPlacesPhotos = async () => {
    const results = await fetchPlaces(requestBody);
    console.log('The results are here: ', results?.places[0]?.photos[3]?.name);
    const photoUrlRef = PHOTO_REF_URL.replace(
      '{NAME}',
      results?.places[0]?.photos[3]?.name
    );
    setPhotoUrl(photoUrlRef);
    console.log('photoUrl', photoUrlRef);
  };
  return (
    <div>
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
          <img
            src={photoUrl ? photoUrl : '/placeholder.jpg'}
            className="rounded-lg h-[180px] w-full object-cover"
          />
          <div className="my-2 flex flex-col gap-2 px-2">
            <h2 className="font-medium">{hotel?.hotelName}</h2>
            <h2 className="text-xs text-gray-500">📍 {hotel.hotelAddress}</h2>
            <h2 className="text-sm">💰 {hotel?.price}</h2>
            <h2 className="text-sm"> ⭐ {extractRating(hotel.rating)}</h2>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default HotelCardItem;
