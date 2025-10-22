import { useEffect, useState } from 'react';

function ConstellationBackground() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Don't render on server
  }

  return (
    <div className="absolute inset-0 opacity-30">
      {/* Animated Dots - Fixed positions to avoid hydration mismatch */}
      {[...Array(50)].map((_, i) => {
        // Use deterministic positioning based on index
        const left = (i * 7.3) % 100;
        const top = (i * 11.7) % 100;
        const delay = (i * 0.1) % 3;
        const duration = 2 + ((i * 0.05) % 2);

        return (
          <div
            key={`dot-${i}`}
            className="absolute h-1 w-1 animate-pulse rounded-full bg-cyan-400"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
            }}
          />
        );
      })}

      {/* Connection Lines - Fixed positions to avoid hydration mismatch */}
      {[...Array(20)].map((_, i) => {
        // Use deterministic positioning based on index
        const left = (i * 13.2) % 100;
        const top = (i * 8.9) % 100;
        const width = 50 + ((i * 3.7) % 100);
        const rotation = (i * 18) % 360;

        return (
          <div
            key={`line-${i}`}
            className="absolute h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: `${width}px`,
              transform: `rotate(${rotation}deg)`,
              opacity: 0.3,
            }}
          />
        );
      })}
    </div>
  );
}

function AgentShieldIcon() {
  return (
    <div className="relative mb-12">
      {/* Outer Glow Effect */}
      <div className="absolute inset-0 scale-110 bg-gradient-to-r from-cyan-500/20 via-teal-500/20 to-cyan-500/20 blur-3xl"></div>

      {/* Shield Container */}
      <div className="relative">
        {/* Shield Background */}
        <div className="relative mx-auto h-48 w-48">
          {/* Shield Shape */}
          <svg
            width="192"
            height="192"
            viewBox="0 0 192 192"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0"
          >
            {/* Shield Path */}
            <path
              d="M96 16L176 48V96C176 128 144 160 96 176C48 160 16 128 16 96V48L96 16Z"
              fill="url(#shieldGradient)"
              stroke="url(#shieldStroke)"
              strokeWidth="2"
            />
            <defs>
              <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(6, 182, 212, 0.1)" />
                <stop offset="50%" stopColor="rgba(20, 184, 166, 0.2)" />
                <stop offset="100%" stopColor="rgba(6, 182, 212, 0.1)" />
              </linearGradient>
              <linearGradient id="shieldStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(6, 182, 212, 0.6)" />
                <stop offset="50%" stopColor="rgba(20, 184, 166, 0.8)" />
                <stop offset="100%" stopColor="rgba(6, 182, 212, 0.6)" />
              </linearGradient>
            </defs>
          </svg>

          {/* Agent Icon Inside Shield */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-cyan-300"
            >
              {/* Headset with Microphone */}
              <circle cx="40" cy="35" r="12" fill="currentColor" opacity="0.8" />
              <path
                d="M28 35C28 25 35 20 40 20C45 20 52 25 52 35"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M25 35C25 30 30 25 35 25"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M55 35C55 30 50 25 45 25"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
              <circle cx="40" cy="50" r="2" fill="currentColor" />
              <path d="M40 52V58" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
        </div>

        {/* Status Dots */}
        <div className="mt-6 flex justify-center gap-2">
          <div className="h-3 w-3 rounded-full bg-slate-600"></div>
          <div className="h-3 w-3 animate-pulse rounded-full bg-cyan-400"></div>
          <div className="h-3 w-3 rounded-full bg-white"></div>
          <div className="h-3 w-3 rounded-full bg-slate-600"></div>
          <div className="h-3 w-3 rounded-full bg-slate-600"></div>
        </div>
      </div>
    </div>
  );
}

interface WelcomeViewProps {
  startButtonText: string;
  onStartCall: () => void;
}

export const WelcomeView = ({
  startButtonText,
  onStartCall,
  ref,
}: React.ComponentProps<'div'> & WelcomeViewProps) => {
  return (
    <div
      ref={ref}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-black"
    >
      {/* Constellation Background - Client-side only */}
      <ConstellationBackground />

      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
          `,
            backgroundSize: '40px 40px',
          }}
        ></div>
      </div>

      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <AgentShieldIcon />

        {/* Main Title */}
        <div className="mb-8">
          <h1 className="mb-4 bg-gradient-to-r from-cyan-200 via-teal-300 to-cyan-200 bg-clip-text text-5xl font-light tracking-wide text-transparent md:text-7xl">
            DEFOM
          </h1>
          <div className="mx-auto h-px w-24 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
        </div>

        {/* Subtitle */}
        <div className="mb-12 max-w-2xl">
          <p className="mb-4 text-xl leading-relaxed font-light text-cyan-300 md:text-2xl">
            Advanced AI Assistant
          </p>
          <p className="leading-relaxed font-light text-slate-400">
            Agent is ready, ask it a question
          </p>
        </div>

        {/* Futuristic Start Button */}
        <div className="mb-12">
          <button
            onClick={onStartCall}
            className="group relative rounded-xl border border-cyan-500/30 bg-gradient-to-r from-slate-800/80 to-slate-900/80 px-16 py-4 font-medium text-cyan-200 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/50 hover:from-slate-700/80 hover:to-slate-800/80"
          >
            <span className="flex items-center gap-3">
              <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-400"></div>
              {startButtonText}
            </span>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-600/0 via-cyan-600/10 to-cyan-600/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          </button>
        </div>

        {/* System Status */}
        <div className="flex gap-8 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400"></div>
            <span>Agent Online</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-teal-400"></div>
            <span>Memory Active</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-cyan-300"></div>
            <span>Search Ready</span>
          </div>
        </div>
      </section>
    </div>
  );
};
