import React from "react";

interface FeatureCardProps {
  title: string;
  text: string;
  imageSrc: string;
  containerClass?: string;
  imageWrapperClass?: string;
  imageClass?: string;
  customContent?: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  text,
  imageSrc,
  containerClass = "",
  imageWrapperClass = "",
  imageClass = "",
  customContent,
}) => {
  return (
    <div className={`feature-card ${containerClass}`}>
      <div className={imageWrapperClass}>
        {imageSrc && <img src={imageSrc} alt={title} className={imageClass} />}
        {customContent}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">{text}</p>
      </div>
    </div>
  );
};

export default FeatureCard;