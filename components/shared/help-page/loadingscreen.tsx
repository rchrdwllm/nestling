import React from "react";

// Skeleton loading screen for help page
const LoadingScreen = () => {
  return (
    <div className="w-full h-full flex flex-col p-6 gap-10">
      {/* Header skeleton */}
      <div className="h-10 w-1/3 bg-primary/20 rounded mb-2 animate-breath" style={{ animationDelay: '0s' }} />
      <div className="h-1 w-full bg-muted rounded mb-6 animate-breath" style={{ animationDelay: '0.2s' }} />
      {/* FAQ title skeleton */}
      <div className="h-8 w-2/5 bg-primary/10 rounded mb-6 animate-breath" style={{ animationDelay: '0.4s' }} />
      {/* FAQ items skeleton */}
      <div className="flex flex-col gap-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-8 w-full bg-muted rounded animate-breath"
            style={{ animationDelay: `${0.6 + i * 0.15}s` }}
          />
        ))}
      </div>
      {/* Button skeleton */}
      <div className="flex justify-center mt-8">
        <div className="h-12 w-72 bg-primary/20 rounded-full animate-breath" style={{ animationDelay: '1.5s' }} />
      </div>
    </div>
  );
};

export default LoadingScreen;
