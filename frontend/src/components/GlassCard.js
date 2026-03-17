const GlassCard = ({ children, className = '' }) => {
  return (
    <div className={`glass-card rounded-[2.5rem] p-8 ${className}`}>
      {children}
    </div>
  );
};

export default GlassCard;