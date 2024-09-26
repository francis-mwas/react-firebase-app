// import axios from 'axios';

// const BASE_URL =
//   'https://cors-anywhere.herokuapp.com/https://places.googleapis.com/v1/places:searchText';

// const config = {
//   headers: {
//     ContentType: 'application/json',
//     'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_PLACE_API,
//     'X-Goog-FieldMask': [
//       'places.displayName',
//       'places.photos',
//       'places.location',
//       'places.id',
//     ],
//   },
// };

// export const getPlaceDetails = (data) => axios.post(BASE_URL, data, config);

const apiKey = import.meta.env.VITE_GOOGLE_PLACE_API; // Replace with your actual API key
export async function fetchPlaces(requestBody) {
  const url = `https://places.googleapis.com/v1/places:searchText?key=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-FieldMask': [
          'places.displayName',
          'places.photos',
          'places.location',
          'places.id',
        ], // Add the fields you want in the response
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Google Places API response:', data);
    return data;
  } catch (error) {
    console.error('Error fetching places:', error);
  }
}

// Invoke the function
// fetchPlaces();
