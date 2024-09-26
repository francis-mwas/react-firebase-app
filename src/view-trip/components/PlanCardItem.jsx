import { fetchPlaces, PHOTO_REF_URL } from '@/service/GlobalApi';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PlanCardItem = ({ plan }) => {
  const [photoUrl, setPhotoUrl] = useState('');
  useEffect(() => {
    plan && getPlacesPhotos();
  }, [plan]);
  const requestBody = {
    textQuery: plan?.placeName,
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
    <Link
      to={'https://www.google.com/maps/search/?api=1&query=' + plan?.placeName}
      target="_blank"
      key={plan.placeName}
    >
      <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-100 transition-all hover:shadow-md">
        <img
          src={photoUrl ? photoUrl : '/placeholder.jpg'}
          className="w-[130px] h-[130px] rounded-xl"
        />
        <div>
          <h2 className="font-bold text-lg">{plan?.placeName}</h2>
          <p className="text-sm text-gray-400">{plan?.details}</p>
          <h2 className="mt-1">🕰️ {plan?.timeToTravel}</h2>
        </div>
      </div>
    </Link>
  );
};

export default PlanCardItem;
