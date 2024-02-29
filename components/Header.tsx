import React from "react";

const Header = ({
  title,
  subtitle,
  icon,
}: {
  title: string;
  subtitle?: string;
  icon: any;
}) => {
  return (
    <div className="flex justify-start gap-5">
      <div className="bg-[#f6d7f4]  w-[60px] h-[60px] flex justify-center items-center rounded-lg">
        <p className=" text-blue-900">{icon}</p>
      </div>
      <div>
        <h1 className="text-[30px] font-bold md:text-[36px] leading-[110%] text-blue-900">
          {title}
        </h1>
        {subtitle && (
          <h2 className="font-normal text-[16px] leading-[140%] mt-4">
            {subtitle}
          </h2>
        )}
      </div>
    </div>
  );
};

export default Header;
