import React from 'react';
import SignupForm from '../Components/SignupForm';
import HomeNavbar from '../Components/HomeNavbar';

export default function Signup() {
  return (
    <>
      <HomeNavbar />
      <div className="container-fluid">
        <div className="row">
          <div className="offset-1 offset-md-2 offset-xl-4 col-10 col-md-8 col-xl-4 mb-4">
            <SignupForm />
          </div>
        </div>
      </div>
    </>
  );
}
