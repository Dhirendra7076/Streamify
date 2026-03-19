import React, { useState } from 'react'
import {Video} from 'lucide-react'

const SignUpPage = () => {

  const [signupData , setSignupData] = useState({
    fullName : "",
    email: "",
    password : "",
  })

  const handleSignUp=(e)=>{
    e.preventDefault()
  }
  return (
    <div className='h-screen flex items-center justify-center p-4 sm:p-6 md: p-8' data-theme= "luxury">
      <div className='border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto 
      bg-base-100 rounded-xl shadow-lg overflow-hidden'>
        {/*SIGNUP FORM - LEFT SIDE*/}

        <div className='w-full lg:w-1/2 p-4 sm:p-8 flex flex-col '>
          {/*LOGO*/}
          <div className='mb-4 flex items-center justify-start gap-2'>
            <Video className = 'w-9 h-9 text-primary'/>
            <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary
            to-secondary tracking-wider'>
             Streamify
            </span>
          </div>

          <div className='w-full'>
            <form onSubmit={handleSignUp}>
              <div className='space-y-4'>
                <div >
                  <p className='text-sm opacity-70'>
                    Join Streamify and start you language learning adventure!
                  </p>
                  <h2 className='text-xl font-semibold'>Create an Account </h2>
                  </div>
                <div className='space-y-3'>
                  {/*FULLNAME */}
                  <div className='form-control w-full '>
                    <label className='label'>
                      <span className='label-text'>Full Name</span>
                    </label>
                    <input type='text'
                        placeholder='John Doe'
                        className='input input-bordered w-full'
                        value={signupData.fullName}
                        onChange={(e)=> setSignupData({...signupData , fullName: e.target.value})}
                        required
                        />
                  </div>
                  {/*EMAIL*/}
                  <div className='form-control w-full '>
                    <label className='label'>
                      <span className='label-text'>Email</span>
                    </label>
                    <input type='text'
                        placeholder='johndoe@gmail.com'
                        className='input input-bordered w-full'
                        value={signupData.email}
                        onChange={(e)=> setSignupData({...signupData , email: e.target.value})}
                        required
                        />
                  </div>
                  {/*PASSWORD*/}
                  <div className='form-control w-full '>
                    <label className='label'>
                      <span className='label-text'>Password</span>
                    </label>
                    <input type='text'
                        placeholder='**********'
                        className='input input-bordered w-full'
                        value={signupData.password}
                        onChange={(e)=> setSignupData({...signupData , password: e.target.value})}
                        required
                        />
                        <p>
                          Password must be atleast 8 characters long 
                        </p>
                  </div>
                  
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default SignUpPage
