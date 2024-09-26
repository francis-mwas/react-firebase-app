import { db } from '@/service/firebaseConfig';
import UserTripsItem from '@/view-trip/components/UserTripsCardItem';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Link, useNavigation } from 'react-router-dom';

const MyTrips = () => {
  const navigation = useNavigation();
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    getUserTrips();
  }, []);
  const getUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem('tourUser'));

    if (!user) {
      //   navigation('/');
      return;
    }
    //get user trips from firebase
    const q = query(
      collection(db, 'tours'),
      where('userEmail', '==', user?.email)
    );
    const querySnapShot = await getDocs(q);
    setUserTrips([]);
    querySnapShot.forEach((doc) => {
      setUserTrips((prevVal) => [...prevVal, doc.data()]);
    });
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">my trips</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10">
        {userTrips?.length > 0
          ? userTrips?.map((trip) => (
              <UserTripsItem trip={trip} key={trip?.id} />
            ))
          : [1, 2, 3, 4, 5, 6].map((item, index) => (
              <div
                key={index}
                className="h-[220px] w-full bg-slate-200 animate-pulse rounded-md"
              ></div>
            ))}
      </div>
    </div>
  );
};

export default MyTrips;
