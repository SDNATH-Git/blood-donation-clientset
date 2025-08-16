import React from 'react';
import Banner from '../components/Banner';
import Featured from '../components/Featured';
import Contact from '../components/Contact';
import DonorMap from '../components/Donor Map';
import NearbyEvents from '../components/NearbyEvents';
import HealthTips from '../components/HealthTips';
import BloodCompatibility from '../components/BloodCompatibility';
import ImpactMeter from '../components/ImpactMeter';
import GamificationBadges from '../components/GamificationBadges';


const Home = () => {
    return (
        <div >
            <Banner />
            <Featured />
            <BloodCompatibility></BloodCompatibility>
            <DonorMap></DonorMap>
            <GamificationBadges></GamificationBadges>
            <NearbyEvents></NearbyEvents>
            <HealthTips></HealthTips>
            <ImpactMeter></ImpactMeter>
            <Contact />
        </div>
    );
};

export default Home;
