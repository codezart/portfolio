import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import {
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';
import herobg from '../assets/herobg.jpg';

const Main = () => {
  return (
    <div id='main'>
      <img
        className='w-full h-screen object-cover '
        src={herobg}
        alt=''
      />
      <div className='w-full h-screen absolute top-0 left-0 bg-white/50'>
        <div className='max-w-[800px] m-auto h-full flex flex-col justify-center lg:items-start items-center'>
          <h1 className='sm:text-6xl text-4xl front-bold text-gray-800'>
            Abdur Rahman Mohammed here!
          </h1>
          <h2 className='flex sm:text-3xl text-2xl pt-4 text-gray-800'>
            I'm a
            <TypeAnimation
              sequence={[
                'Backend Developer', // Types 'One'
                2000, // Waits 1s
                'Software Engineer', // Deletes 'One' and types 'Two'
                2000, // Waits 2s
                'Tech Enthusiast', // Deletes 'One' and types 'Two'
                2000, // Waits 2s
              ]}
              wrapper='div'
              cursor={true}
              repeat={Infinity}
              style={{ fontSize: '1em', paddingLeft: '5px' }}
            />
          </h2>
          <div className='flex justify-between pt-6 max-w-[200px] w-full'>
            <FaTwitter className='cursor-pointer' size={20} />
            <FaFacebookF className='cursor-pointer' size={20} />
            <FaInstagram className='cursor-pointer' size={20} />
            <FaLinkedinIn className='cursor-pointer' size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
