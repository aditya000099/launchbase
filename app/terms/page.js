'use client';

import React from 'react';
// import { NextSeo } from 'next-seo';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Terms() {
  return (
    <>
      {/* <NextSeo
        title="Terms and Conditions"
        description="Terms and Conditions for Your SaaS"
      /> */}
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
        {/* Add your terms and conditions content here */}
      </div>
      <Footer />
    </>
  );
}
