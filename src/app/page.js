'use client';
import { useState } from 'react';
 
import Hero from '@/components/user/home/Hero';
import WorldsOfMurugesan from '@/components/user/home/WorldsOfMurugesan';
import FeaturedVideos from '@/components/user/home/FeaturedVideos';
import JourneyTimeline from '@/components/user/home/JourneyTimeline';
 
import GalleryMoments from '@/components/user/home/GalleryMoments';
import SubscribeCTA from '@/components/sections/SubscribeCTA';

export default function Home() {
  
   
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">

      <Hero/>

      <WorldsOfMurugesan/>


      <FeaturedVideos/>
              <JourneyTimeline/>
      <GalleryMoments/>

      <SubscribeCTA/>
    </div>
  );
}
