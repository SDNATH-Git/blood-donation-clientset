import React from 'react';
import Lottie from "lottie-react";
import loading from "../assets/loading.json";

const Loading = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full md:w-1/2">
                <Lottie animationData={loading} loop={true} />
            </div>
        </div>
    );
};

export default Loading;