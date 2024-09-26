import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { Button } from '../ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';
import axios from 'axios';

const Header = () => {
  const user = JSON.parse(localStorage.getItem('tourUser'));
  const [openDialog, setOpenDialog] = useState(false);
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
        window.location.reload();
      });
  };

  return (
    <div className="p-2 shadow-sm flex justify-between items-center px-5">
      <img src="/logo.svg" />
      <div>
        {user ? (
          <div className="flex items-center justify-between gap-4">
            <a href="/create-trip">
              <Button variant="outline" className="rounded-full">
                Create Trip
              </Button>
            </a>
            <a href="/my-trips">
              <Button variant="outline" className="rounded-full">
                My Trips
              </Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img
                  src={user?.picture}
                  className="w-[30px] h-[30px] rounded-full"
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                  }}
                  className="cursor-pointer"
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign in</Button>
        )}
      </div>
      <Dialog open={openDialog}>
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

export default Header;
