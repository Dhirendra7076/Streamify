import { useState } from 'react';
import { Video } from 'lucide-react';
import {Link} from 'react-router'; // or react-router-dom depending on what version they are using, wait SignUp uses react-router
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '../lib/api';

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const queryClient = useQueryClient();

  const { mutate: loginMutation, error, isPending } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <div className='h-screen flex items-center justify-center p-4 sm:p-6 md:p-8' data-theme="luxury">
      <div className='border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto 
      bg-base-100 rounded-xl shadow-lg overflow-hidden'>
        {/* LOGIN FORM - LEFT SIDE */}
        <div className='w-full lg:w-1/2 p-4 sm:p-8 flex flex-col justify-center'>
          {/* LOGO */}
          <div className='mb-8 flex items-center justify-start gap-2'>
            <Video className='w-9 h-9 text-primary' />
            <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary
            to-secondary tracking-wider'>
              Streamify
            </span>
          </div>

          {/* Error message if any */}
          {error && (
            <div className='alert alert-error mb-4'>
              <span>{error?.response?.data?.message || 'Failed to login. Please try again.'}</span>
            </div>
          )}

          <div className='w-full'>
            <form onSubmit={handleLogin}>
              <div className='space-y-6'>
                <div>
                  <h2 className='text-2xl font-semibold'>Welcome Back!</h2>
                  <p className='text-sm opacity-70 mt-1'>
                    Sign in to your account and continue your language journey.
                  </p>
                </div>
                
                <div className='space-y-4'>
                  {/* EMAIL */}
                  <div className='form-control w-full'>
                    <label className='label'>
                      <span className='label-text'>Email</span>
                    </label>
                    <input type='email'
                      placeholder='johndoe@gmail.com'
                      className='input input-bordered w-full'
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                    />
                  </div>
                  
                  {/* PASSWORD */}
                  <div className='form-control w-full'>
                    <label className='label'>
                      <span className='label-text'>Password</span>
                    </label>
                    <input type='password'
                      placeholder='**********'
                      className='input input-bordered w-full'
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <button className='btn btn-primary w-full' type='submit' disabled={isPending}> 
                    {isPending ? (
                      <>
                        <span className='loading loading-spinner loading-xs'></span>
                        Logging in...
                      </>
                    ) : (
                      "Log In"
                    )}
                </button>

                <div className='text-center mt-6'>
                  <p className='text-sm'>
                    Don't have an account? {" "}
                    <Link to="/signup" className="text-primary hover:underline font-medium">
                      Sign up
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* LOGIN FORM - RIGHT SIDE */}
        <div className='hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center p-8'>
          <div className='max-w-md'>
            {/* Illustration */}
            <div className='relative aspect-square max-w-sm mx-auto'>
              <img src='/Webinar-bro.png' alt='Language connection illustration' className='w-full h-full object-contain' />
            </div> 

            <div className='text-center space-y-3 mt-6'>
              <h2 className='text-2xl font-semibold'>Dive back into learning</h2>
              <p className='opacity-70 text-lg'>
                Your language partners and friends are waiting for you. Reconnect and continue improving!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
