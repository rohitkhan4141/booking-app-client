import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      className='hero banner-height'
      style={{
        backgroundImage: `url("https://images.pexels.com/photos/3822938/pexels-photo-3822938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")`,
      }}
    >
      <div className='hero-overlay bg-opacity-40'></div>
      <div className='hero-content text-center text-neutral-content'>
        <div className='max-w-md'>
          <h1 className='mb-5 text-3xl md:text-8xl font-bold text-white leading-tight'>
            BOOK FROM US
          </h1>
          <Link className='btn btn-info btn-outline' to='/products'>
            Book Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
