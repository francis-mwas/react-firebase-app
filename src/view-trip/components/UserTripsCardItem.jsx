import { fetchPlaces, PHOTO_REF_URL } from '@/service/GlobalApi';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const UserTripsCardItem = ({ trip }) => {
  console.log('the trip history: ', trip);
  const [photoUrl, setPhotoUrl] = useState('');
  useEffect(() => {
    trip && getPlacesPhotos();
  }, [trip]);
  const requestBody = {
    textQuery: trip.userSelection?.location?.label,
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
    <Link to={'/view-trip/' + trip?.id}>
      <div className="hover:scale-105 transition-all">
        <img
          src={photoUrl ? photoUrl : '/placeholder.jpg'}
          className="rounded-md hover:shadow-md h-[220px] w-full object-cover"
        />
        <div>
          <h2 className="font-bold text-lg">
            {trip.userSelection?.location?.label}
          </h2>
          <h2 className="text-sm text-gray-400">
            {trip?.userSelection?.noOfDays} days trip with a{' '}
            {trip?.userSelection?.budget} budget
          </h2>
          <h2> </h2>
        </div>
      </div>
    </Link>
  );
};

export default UserTripsCardItem;
