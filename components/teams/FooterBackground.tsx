"use client";

export default function FooterBackground() {
  return (
    <div className="absolute inset-0">
      {/* Static radial gradient using premium dark bluish color */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(30, 58, 138, 0.2),transparent_70%)]" />
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
    </div>
  );
}
