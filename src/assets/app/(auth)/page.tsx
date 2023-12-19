import React, { useState } from 'react';
import SignInForm from '../components/(auth_components)/SignIn';

const SignInPage = () => {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-200 w-screen">
        <SignInForm/>
    </main>
  );
};

export default SignInPage;
