import { Button } from '@/components/ui/button';
import { FaMapLocation } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Plan = ({ plan }) => {
  console.log('The blan: ', plan);

  return (
    <Link
      to={'https://www.google.com/maps/search/?api=1&query=' + plan?.placeName}
      target="_blank"
      key={plan.placeName}
    >
      <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-100 transition-all hover:shadow-md">
        <img
          src="/placeholder.jpg"
          className="w-[130px] h-[130px] rounded-xl"
        />
        <div>
          <h2 className="font-bold text-lg">{plan?.placeName}</h2>
          <p className="text-sm text-gray-400">{plan?.details}</p>
          <h2 className="mt-1">🕰️ {plan?.timeToTravel}</h2>
          {/* <Button>
            <FaMapLocation />
          </Button> */}
        </div>
      </div>
    </Link>
  );
};

export default Plan;
