import Plan from './Plan';

const Itinerary = ({ trip }) => {
  const itinerary = trip?.tripInformation?.itinerary;
  if (itinerary) {
    Object.keys(itinerary).forEach((dayKey) => {
      const dayInfo = itinerary[dayKey];
    });
  }
  console.log('The Itinerary:', itinerary);

  return (
    <div>
      <h2 className="font-bold text-lg mt-5">Places to visit</h2>
      <div>
        {itinerary &&
          Object.keys(itinerary).map((dayKey) => (
            <div key={dayKey}>
              <h2>{dayKey}</h2>
              <div className="my-4">
                <h3 className="text-orange-500">
                  {itinerary && itinerary[dayKey]?.bestTime}
                </h3>
                <Plan plan={itinerary && itinerary[dayKey]?.plan} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Itinerary;
