'use client';

import React from 'react';
import { NextSeo } from 'next-seo';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Privacy() {
  return (
    <>
      <NextSeo
        title="Privacy Policy"
        description="Privacy Policy for Your SaaS"
      />
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        {/* Add your privacy policy content here */}
      </div>
      <Footer />
    </>
  );
}
