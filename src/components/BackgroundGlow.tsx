export const BackgroundGlow = () => {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base food image background with enhanced blur */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1546554137-f86b9593a222?auto=format&fit=crop&w=1600&q=60')] bg-cover bg-center bg-blur-layer-intense" />
      
      {/* Subtle vibrant colors only on edges with very low intensity */}
      <div className="absolute -left-40 top-0 h-[140%] w-[60%] bg-gradient-to-br from-orange-100/20 via-yellow-100/15 to-amber-100/20 bg-blur-layer" />
      <div className="absolute -right-40 top-0 h-[140%] w-[60%] bg-gradient-to-bl from-red-100/20 via-pink-100/15 to-purple-100/20 bg-blur-layer" />
      <div className="absolute -top-40 left-0 h-[60%] w-[140%] bg-gradient-to-b from-blue-100/15 via-indigo-100/20 to-purple-100/15 bg-blur-layer" />
      
      {/* Center white, shiny, blurred area */}
      <div className="absolute left-1/4 top-1/4 right-1/4 bottom-1/4 bg-white/60 bg-blur-layer rounded-full" />
      <div className="absolute left-1/3 top-1/3 right-1/3 bottom-1/3 bg-white/40 bg-blur-layer rounded-full" />
      
      {/* Subtle white gradient veil for depth */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-white/20 to-white/30" />
    </div>
  );
};

export default BackgroundGlow;


