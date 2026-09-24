// Shows the workout image. If the image is missing, a dark box with the logo is shown.
export default function WorkoutImage({ src, alt, className = "" }) {
  if (!src) {
    return (
      <div className={`flex items-center justify-center bg-panel ${className}`}>
        <img src="/images/logo.png" alt="FitLog" className="h-8 w-8 opacity-60" />
      </div>
    );
  }
  return <img src={src} alt={alt} className={`object-cover ${className}`} />;
}
