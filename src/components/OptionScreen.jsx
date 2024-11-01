import React from 'react';
import Settings from './Settings';

const Header = () => {
  return (
    <div className="flex items-center mb-10 w-full justify-center">
      <img src="assets/icon.png" alt="TabyAI Icon" className="w-14 h-14 mr-2" />
      <div className="flex flex-col">
        <h1 className="text-3xl font-semibold">Taby AI</h1>
      </div>
    </div>
  );
};

const About = () => {
  return (
    <div className="mb-5 p-4 bg-white rounded-lg shadow w-1/2 mx-auto max-w-[800px]">
      <h2 className="text-xl font-semibold">About Taby AI</h2>
      <hr className="my-4" />
      <p className="text-base text-gray-500">Taby AI is a user-friendly, AI-powered chat feature that allows you to interact with the webpage you are currently
      viewing. It enables you to ask questions and have conversations on a wide range of topics, be it which ever of the
      browser tab or page you are on. With Taby AI, quick and efficient assistance is always at your fingertips, ensuring
      you can get the information or help you need without ever leaving your current webpage.</p>
    </div>
  );
};

const Footer = () => {
  return <div className="text-base text-gray-500 mt-5">TabyAI &copy; 2024</div>;
};

const Options = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-gray-100 font-sans p-8 h-screen">
      <Header />
      <About />
      <Settings />
      <Footer />
    </div>
  );
};

export default Options;
