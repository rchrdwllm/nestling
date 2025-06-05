import React from "react";

// Skeleton loading screen for about page
const AboutLoadingScreen = () => {
  return (
    <div className="flex flex-col items-center w-full px-2 py-10 animate-breath-slow">
      {/* Title skeleton */}
      <div className="h-12 w-2/3 max-w-xl bg-primary/20 rounded mb-4 animate-breath-slow" style={{ animationDelay: '0s' }} />
      <div className="h-8 w-1/2 max-w-lg bg-primary/10 rounded mb-4 animate-breath-slow" style={{ animationDelay: '0.15s' }} />
      <div className="h-5 w-3/4 max-w-2xl bg-muted rounded mb-10 animate-breath-slow" style={{ animationDelay: '0.3s' }} />
      <div className="h-5 w-2/3 max-w-xl bg-muted rounded mb-10 animate-breath-slow" style={{ animationDelay: '0.45s' }} />
      {/* Top row of cards skeleton */}
      <div className="w-full max-w-4xl flex flex-row justify-center gap-8 mb-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="w-full min-w-[260px] max-w-[320px] h-[120px] bg-muted rounded-2xl animate-breath-slow" style={{ animationDelay: `${0.6 + i * 0.15}s` }} />
        ))}
      </div>
      {/* Bottom row of cards skeleton */}
      <div className="w-full max-w-2xl flex flex-row justify-center gap-8 mb-12">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="w-full min-w-[260px] max-w-[320px] h-[120px] bg-muted rounded-2xl animate-breath-slow" style={{ animationDelay: `${1.1 + i * 0.15}s` }} />
        ))}
      </div>
      {/* Mission & Vision skeleton */}
      <div className="w-full max-w-3xl flex flex-col md:flex-row items-center justify-center gap-8 mb-10">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex-1 flex flex-col items-center">
            <div className="h-6 w-24 bg-primary/20 rounded mb-2 animate-breath-slow" style={{ animationDelay: `${1.4 + i * 0.1}s` }} />
            <div className="h-4 w-48 bg-muted rounded mb-2 animate-breath-slow" style={{ animationDelay: `${1.5 + i * 0.1}s` }} />
            <div className="h-4 w-40 bg-muted rounded animate-breath-slow" style={{ animationDelay: `${1.6 + i * 0.1}s` }} />
          </div>
        ))}
      </div>
      {/* Office Address & Map skeleton */}
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-between gap-8 bg-background border border-[color:var(--border,#e5e7eb)/35] rounded-2xl shadow-md p-8 mt-4">
        <div className="flex-1 flex flex-col gap-2 min-w-[220px] items-center md:items-start">
          <div className="h-6 w-48 bg-primary/20 rounded mb-2 animate-breath-slow" style={{ animationDelay: '2s' }} />
          <div className="h-4 w-40 bg-muted rounded mb-1 animate-breath-slow" style={{ animationDelay: '2.1s' }} />
          <div className="h-4 w-56 bg-muted rounded mb-1 animate-breath-slow" style={{ animationDelay: '2.2s' }} />
          <div className="h-4 w-32 bg-muted rounded animate-breath-slow" style={{ animationDelay: '2.3s' }} />
        </div>
        <div className="flex-1 flex items-center justify-center min-w-[220px]">
          <div className="w-[320px] h-[220px] bg-muted rounded-xl animate-breath-slow" style={{ animationDelay: '2.4s' }} />
        </div>
      </div>
    </div>
  );
};

export default AboutLoadingScreen;
