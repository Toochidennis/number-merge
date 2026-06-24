export function FloatingParticles() {
  return (
    <div className="home-particles" aria-hidden="true">
      {Array.from({ length: 14 }, (_, index) => <i key={index} />)}
    </div>
  );
}
