export const BackgroundGlow = () => {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <img src="/images/image.png" alt="" className="absolute inset-0 h-full w-full object-cover opacity-80" />
    </div>
  );
};

export default BackgroundGlow;


