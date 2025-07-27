import React from 'react';
import Banner from '../components/Banner';
import Featured from '../components/Featured';
import Contact from '../components/Contact';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Featured></Featured>
            <Contact></Contact>
        </div>
    );
};

export default Home;