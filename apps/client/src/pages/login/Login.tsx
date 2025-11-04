import React from "react";

import LiquidEther from "@components/react-bits/backgrounds/LiquidEther";

import BrandingTextLogo from "@components/shared/BrandingTextLogo";
import SocialLogins from "@components/login/SocialLogins";

export const Login: React.FC = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-primary-dark">
      <LiquidEther
        colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
        mouseForce={20}
        cursorSize={100}
        isViscous={false}
        viscous={30}
        iterationsViscous={32}
        iterationsPoisson={32}
        resolution={0.5}
        isBounce={false}
        autoDemo={true}
        autoSpeed={0.5}
        autoIntensity={2.2}
        takeoverDuration={0.25}
        autoResumeDelay={3000}
        autoRampDuration={0.6}
        className="z-1 w-full h-full absolute top-0 left-0"
      />
      <div className="z-2 absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center p-4">
        <div className="flex flex-1 flex-col justify-center items-center">
          <BrandingTextLogo className="text-seasalt" />
        </div>
        <SocialLogins />
      </div>
    </div>
  );
};

export default Login;
