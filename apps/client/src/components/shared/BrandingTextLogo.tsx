import React from "react";

export const BrandingTextLogo: React.FC<{ className?: string }> = ({
  className,
}) => {
  return (
    <p
      className={`${className} text-[24px] font-roboto tracking-widest font-extralight`}
    >
      ELYSN
    </p>
  );
};

export default BrandingTextLogo;
