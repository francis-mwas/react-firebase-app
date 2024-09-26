/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: 'application/json',
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: 'user',
      parts: [
        {
          text: 'Generate Travel Plan for Location: Vatican, for 3 days for Couple with a Cheap budget, Give me Hotels options list with HotelName, Hotel Address, Price, hotel image url, geo coordinates, descriptions, and suggest itinerary with placeName, Place, details, Place image Url, Geo Coordinates, ticket pricing, rating, Time to travel each of the location for 3 days with each day plan with time to visit in JSON Format. include hotel ratings',
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
          text: '```json\n{\n  "hotelOptions": [\n    {\n      "hotelName": "Hotel Grifo",\n      "hotelAddress": "Via di Porta Angelica, 10, 00193 Rome RM, Italy",\n      "price": "€60 - €80 per night",\n      "hotelImageUrl": "https://www.booking.com/hotel/it/grifo.it.html?aid=397591&no_rooms=1&group_adults=2&sb_price_type=total&sid=0a0a00eb760d12089876b88269569e62&checkin_year=2023&checkin_month=12&checkin_day=14&checkout_year=2023&checkout_month=12&checkout_day=15&dest_id=-1463461&dest_type=city&room1=A%2CA&sb_search_group_id=1103071&sb_travel_purpose=leisure&req_adults=2&req_children=0&req_total=2&highlighted_room_count=1&room_selected_count=1&room_selected_ids=0",\n      "geoCoordinates": "41.907911, 12.459695",\n      "description": "A budget-friendly hotel located near the Vatican City with clean rooms and a good location."\n    },\n    {\n      "hotelName": "Hotel San Pietro",\n      "hotelAddress": "Via Aurelia, 53, 00165 Rome RM, Italy",\n      "price": "€70 - €90 per night",\n      "hotelImageUrl": "https://www.booking.com/hotel/it/san-pietro.it.html?aid=397591&no_rooms=1&group_adults=2&sb_price_type=total&sid=3f68e80084a80e7a648c0869d25103fa&checkin_year=2023&checkin_month=12&checkin_day=14&checkout_year=2023&checkout_month=12&checkout_day=15&dest_id=-1463461&dest_type=city&room1=A%2CA&sb_search_group_id=1098013&sb_travel_purpose=leisure&req_adults=2&req_children=0&req_total=2&highlighted_room_count=1&room_selected_count=1&room_selected_ids=0",\n      "geoCoordinates": "41.903783, 12.462331",\n      "description": "A simple hotel with a fantastic location, offering views of St. Peter\'s Basilica."\n    },\n    {\n      "hotelName": "Hotel Villa San Pio",\n      "hotelAddress": "Via Aurelia, 591, 00165 Rome RM, Italy",\n      "price": "€50 - €70 per night",\n      "hotelImageUrl": "https://www.booking.com/hotel/it/villa-san-pio.it.html?aid=397591&no_rooms=1&group_adults=2&sb_price_type=total&sid=48d2782c9f229995e6ff18701011a38a&checkin_year=2023&checkin_month=12&checkin_day=14&checkout_year=2023&checkout_month=12&checkout_day=15&dest_id=-1463461&dest_type=city&room1=A%2CA&sb_search_group_id=1095804&sb_travel_purpose=leisure&req_adults=2&req_children=0&req_total=2&highlighted_room_count=1&room_selected_count=1&room_selected_ids=0",\n      "geoCoordinates": "41.904854, 12.459711",\n      "description": "A charming hotel with a garden and a quiet location, perfect for a relaxing stay."\n    }\n  ],\n  "itinerary": {\n    "day1": [\n      {\n        "placeName": "St. Peter\'s Basilica",\n        "place": "Vatican City",\n        "details": "Explore the iconic basilica, marvel at Michelangelo\'s Pieta and climb to the dome for breathtaking views of Rome.",\n        "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Petersdom_2007_4.jpg/1280px-Petersdom_2007_4.jpg",\n        "geoCoordinates": "41.9029, 12.4534",\n        "ticketPricing": "Free entry, but recommended to book a free timed ticket in advance",\n        "rating": "5/5",\n        "timeToTravel": "2-3 hours"\n      },\n      {\n        "placeName": "Vatican Museums",\n        "place": "Vatican City",\n        "details": "Wander through the vast collection of art and artifacts, including the Sistine Chapel with its breathtaking frescoes by Michelangelo.",\n        "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Vatican_Museums_entrance_2017.jpg/1280px-Vatican_Museums_entrance_2017.jpg",\n        "geoCoordinates": "41.9032, 12.4525",\n        "ticketPricing": "€17 per person, book online in advance to avoid lines",\n        "rating": "4.5/5",\n        "timeToTravel": "3-4 hours"\n      }\n    ],\n    "day2": [\n      {\n        "placeName": "Castel Sant\'Angelo",\n        "place": "Rome",\n        "details": "Visit this impressive medieval castle, enjoy panoramic views from the top, and learn about its rich history.",\n        "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Castel_Sant%27Angelo_2007.jpg/1280px-Castel_Sant%27Angelo_2007.jpg",\n        "geoCoordinates": "41.9072, 12.4624",\n        "ticketPricing": "€14 per person, book online in advance to avoid lines",\n        "rating": "4/5",\n        "timeToTravel": "2-3 hours"\n      },\n      {\n        "placeName": "Trastevere",\n        "place": "Rome",\n        "details": "Explore this charming neighborhood with its cobblestone streets, lively atmosphere, and delicious restaurants.",\n        "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Trastevere_2007.jpg/1280px-Trastevere_2007.jpg",\n        "geoCoordinates": "41.8989, 12.4661",\n        "ticketPricing": "Free",\n        "rating": "5/5",\n        "timeToTravel": "2-3 hours"\n      }\n    ],\n    "day3": [\n      {\n        "placeName": "Pantheon",\n        "place": "Rome",\n        "details": "Admire this impressive ancient Roman temple with its unique dome and learn about its fascinating history.",\n        "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Pantheon_Rome.jpg/1280px-Pantheon_Rome.jpg",\n        "geoCoordinates": "41.8986, 12.4777",\n        "ticketPricing": "Free entry",\n        "rating": "4.5/5",\n        "timeToTravel": "1-2 hours"\n      },\n      {\n        "placeName": "Trevi Fountain",\n        "place": "Rome",\n        "details": "Toss a coin into this iconic fountain and make a wish for your return to Rome.",\n        "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Trevi_Fountain_Rome_Italy.jpg/1280px-Trevi_Fountain_Rome_Italy.jpg",\n        "geoCoordinates": "41.9004, 12.4836",\n        "ticketPricing": "Free",\n        "rating": "4.5/5",\n        "timeToTravel": "1 hour"\n      },\n      {\n        "placeName": "Spanish Steps",\n        "place": "Rome",\n        "details": "Walk up these famous steps, admire the architecture, and enjoy the vibrant atmosphere of the area.",\n        "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SpanishStepsRome.jpg/1280px-SpanishStepsRome.jpg",\n        "geoCoordinates": "41.9008, 12.4808",\n        "ticketPricing": "Free",\n        "rating": "4/5",\n        "timeToTravel": "1 hour"\n      }\n    ]\n  }\n}\n```\n\n**Notes:**\n\n* This itinerary is a suggestion and can be customized based on your interests and preferences. \n* Public transportation in Rome is convenient and affordable, so consider using the metro or buses to get around.\n* Many attractions offer free admission on certain days of the week, so check the official websites before your visit. \n* Remember to book your hotel and attraction tickets in advance, especially during peak season. \n* Rome is a city with a lot to offer, so you can easily spend more than 3 days exploring its many attractions.\n* Prices for hotels and attractions are approximate and may vary depending on the time of year and availability. \n\n**Additional Tips for Budget Travel:**\n\n* Pack light to avoid baggage fees.\n* Bring your own water bottle to refill at fountains.\n* Take advantage of free walking tours offered by local guides.\n* Eat at local trattorias for affordable and delicious meals.\n* Look for free Wi-Fi hotspots to avoid roaming charges.',
        },
      ],
    },
  ],
});
