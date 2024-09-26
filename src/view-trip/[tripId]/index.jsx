import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import InforSection from '../components/InforSection';
import HotelList from '../components/HotelList';
import Itinerary from '../components/Itinerary';
import Footer from '../components/Footer';

const ViewTrip = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState([]);

  useEffect(() => {
    getTripdata(tripId);
  }, [tripId]);

  const getTripdata = async (tripId) => {
    const docRef = doc(db, 'tours', tripId);
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot) {
      setTrip(docSnapshot.data());
    } else {
      toast('No trip found');
    }
  };

  return (
    <div className="p-10 md:ppx-20 lg:px-44 xl:p-x-56">
      {/* trip information section  */}
      <InforSection trip={trip} />
      {/* list or recommended hotels  */}
      <HotelList trip={trip} />
      {/* daily plan  */}
      <Itinerary trip={trip} />
      {/* footer */}
      <Footer />
    </div>
  );
};

export default ViewTrip;
