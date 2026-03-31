"use client";

import React from "react";

interface CustomerStoryCardProps {
  imageSrc?: string;
  title: string;
  description: string;
  linkText?: string;
  href?: string;
  onClick?: () => void;
}

const CustomerStoryCard: React.FC<CustomerStoryCardProps> = ({
  imageSrc = "/global/placeholder-grey.jpg",
  title,
  description,
  linkText = "Read customer story",
  href,
  onClick,
}) => {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div
        className="w-full h-[200px] rounded-3xl bg-cover bg-center"
        style={{ backgroundImage: `url(${imageSrc})` }}
      />

      <h4 className="text-md font-semibold text-[#212329]">{title}</h4>

      <p className="text-md font-normal text-[#474D5D]">{description}</p>

      <a
        href="#"
        onClick={onClick}
        className="text-md font-semibold bg-gradient-to-r from-[#1c50f5] to-[#2e91fb] bg-clip-text text-transparent"
      >
        {linkText} →
      </a>
    </div>
  );
};

export default CustomerStoryCard;
