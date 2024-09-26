import Plan from './PlanCardItem';

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
              <h2 className="font-medium">{dayKey}</h2>
              <div className="grid md:grid-cols-2 gap-5">
                {itinerary &&
                  itinerary[dayKey]?.map((place, index) => (
                    <div className="" key={index}>
                      <h2 className="font-medium text-sm text-orange-500">
                        {place?.timeToTravel}
                      </h2>
                      <Plan plan={place} />
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
//    {
//      itinerary && itinerary[dayKey]?.bestTime;
//    }

export default Itinerary;
