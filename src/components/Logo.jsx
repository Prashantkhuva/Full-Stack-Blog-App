function Logo({ width = "50px" }) {
  return (
    <div
      style={{ width }}
      className="font-heading text-2xl font-bold text-text tracking-tight"
    >
      <span className="text-accent">M</span>egaBlog
      <span className="text-accent">.</span>
    </div>
  );
}

export default Logo;
