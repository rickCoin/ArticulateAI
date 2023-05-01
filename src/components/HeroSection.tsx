import React from "react";

const HeroSection: React.FC = () => {
    return (
        <div className="text-center p-10 sm:p-32 bg-transparent ">
            <h1 className="font-extrabold text-transparent text-2xl sm:text-6xl tracking-tight bg-clip-text bg-gradient-to-r from-[#9b4f1f] to-[#edde98]">
                {/* <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"> */}
                Enriching your description for creating Al-Art
            </h1>
            <p className="font-bold mt-8 text-transparent text-l sm:text-2xl tracking-tight bg-clip-text bg-gradient-to-r from-[#9b4f1f] to-[#edde98]">
                Simply describe your vision, and our app will generate
                high-quality and relevant text with more depth and context,
                taking your art to the next level.
            </p>
        </div>
    );
};

export default HeroSection;
