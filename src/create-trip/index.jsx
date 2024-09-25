import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  AI_PROMPT,
  SelectBudgetOption,
  SelectTravelList,
} from '@/constants/options';
import { chatSession } from '@/service/AIModal';
import { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { toast } from 'sonner';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { FcGoogle } from 'react-icons/fc';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';

const CreateTrip = () => {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log('form data: ', formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (response) => getUserProfile(response),
    onError: (errResponse) => console.log('errResponse', errResponse),
  });

  const getUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            accept: 'Application/json',
          },
        }
      )
      .then((response) => {
        localStorage.setItem('tourUser', JSON.stringify(response.data));
        setOpenDialog(false);
        onGenerateTrip();
      });
  };

  const onGenerateTrip = async () => {
    const user = localStorage.getItem('tourUser');
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (
      (formData?.noOfDays > 5 && !formData?.location) ||
      !formData.budget ||
      !formData.traveller
    ) {
      toast('Please provide all the required fields');
      return;
    }
    //show the loading state
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace(
      '{location}',
      formData?.location?.label
    )
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveller}', formData?.traveller)
      .replace('{budgetType}', formData?.budget)
      .replace('{totalDays}', formData?.noOfDays);
    const AIResponse = await chatSession.sendMessage(FINAL_PROMPT);
    console.log('The AI Response: ', AIResponse?.response?.text());
    //disable loading state
    setLoading(false);
    saveTripData(AIResponse?.response?.text());
  };

  const saveTripData = async (aiTripData) => {
    //show the loading state
    setLoading(true);
    const documentId = Date.now().toString();
    const getUser = JSON.parse(localStorage.getItem('tourUser'));
    // Add a new document in collection "tripData"
    await setDoc(doc(db, 'tours', documentId), {
      userSelection: formData,
      tripInformation: JSON.parse(aiTripData),
      userEmail: getUser?.email,
      id: documentId,
    });
    //disable loading state
    setLoading(false);
  };

  return (
    <div className="sm:p-10 md:px-32 lg:px-56 xl:px-10 px-5">
      <h2 className="font-bold text-3xl">
        Tell us your travel preferences 🏕️🌴
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>
      <div className="mt-20 flex flex-col gap-8">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is your destination of choice
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API}
            selectProps={{
              place,
              onChange: (value) => {
                setPlace(value);
                handleInputChange('location', value);
              },
            }}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip?
            <Input
              placeholder={'EX.3'}
              type="number"
              onChange={(e) => handleInputChange('noOfDays', e.target.value)}
            />
          </h2>
        </div>
      </div>
      <div>
        <h2 className="text-xl my-3 font-medium">What is Your Budget?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectBudgetOption.map((budget) => (
            <div
              key={budget.id}
              className={`border p-5 rounded-lg hover:shadow-lg cursor-pointer ${
                formData?.budget == budget.title && 'shadow-lg border-[#007DFC]'
              }`}
              onClick={() => handleInputChange('budget', budget.title)}
            >
              <h2 className="text-4xl">{budget.icon}</h2>
              <h2 className="font-bold text-lg">{budget.title}</h2>
              <h2 className="text-sm text-gray-500">{budget.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl my-3 font-medium">
          Who do you plan on traveling with on your next adventure?
        </h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectTravelList.map((item) => (
            <div
              key={item.id}
              className={`border p-5 rounded-lg hover:shadow-lg cursor-pointer ${
                formData?.traveller == item.people &&
                'shadow-lg border-[#007DFC]'
              }`}
              onClick={() => handleInputChange('traveller', item.people)}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className="my-10 flex justify-end">
        {' '}
        <Button onClick={onGenerateTrip} disabled={loading}>
          {loading ? (
            <AiOutlineLoading3Quarters className="w-7 h-7 animate-spin" />
          ) : (
            'Generate trip'
          )}
        </Button>
      </div>
      <Dialog open={openDialog}>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="logo" />
              <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
              <p>Sign in to the app with Google authentication securely</p>
              <Button
                className="w-full mt-5 flex gap-4 items-center"
                onClick={login}
              >
                <FcGoogle className="w-7 h-7" />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTrip;
