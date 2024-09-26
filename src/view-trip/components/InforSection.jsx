import { Button } from '@/components/ui/button';
import { FaShareAlt } from 'react-icons/fa';

const InforSection = ({ trip }) => {
  return (
    <div>
      <img
        src="/placeholder.jpg"
        className="h-[340px] w-full object-cover rounded-xl"
      />
      <div className="my-5 flex flex-col gap-2">
        <h2 className="font-bold text-2xl">
          {trip?.userSelection?.location?.label}
        </h2>
        <div className="flex items-center justify-between">
          <div className="flex gap-5">
            <h2 className="rounded-full bg-gray-200 text-gray-500 =-1 px-3 text-sm md:text-lg">
              {' '}
              📆 No of days: {trip?.userSelection?.noOfDays}
            </h2>
            <h2 className="rounded-full bg-gray-200 text-gray-500 =-1 px-3  text-sm md:text-lg">
              {' '}
              💸 Budget: {trip?.userSelection?.budget}
            </h2>
            <h2 className="rounded-full bg-gray-200 text-gray-500 =-1 px-3  text-sm md:text-lg">
              {' '}
              🥂 Number of guests: {trip?.userSelection?.traveller}
            </h2>
          </div>
          <Button>
            <FaShareAlt />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InforSection;
