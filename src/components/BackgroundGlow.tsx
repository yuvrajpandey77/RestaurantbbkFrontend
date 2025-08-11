export const BackgroundGlow = () => {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base food image background */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1546554137-f86b9593a222?auto=format&fit=crop&w=1600&q=60')] bg-cover bg-center" />
      {/* On top: large blurred white blobs at edges to create soft color wash */}
      <div className="absolute -left-40 top-0 h-[140%] w-[60%] bg-white/70 bg-blur-layer" />
      <div className="absolute -right-40 bottom-0 h-[140%] w-[60%] bg-white/70 bg-blur-layer" />
      {/* Subtle gradient veil for depth */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/60 via-white/40 to-white/60" />
    </div>
  );
};

export default BackgroundGlow;


