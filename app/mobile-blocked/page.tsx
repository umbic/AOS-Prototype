export default function MobileBlockedPage() {
  return (
    <div className="min-h-screen relative flex items-center justify-center">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/touch-grass.jpg)' }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <h1 className="text-5xl font-bold text-white tracking-tight mb-4">
          Touch Grass
        </h1>
        <p className="text-xl text-white/80">
          AgencyOS is only available on Desktop
        </p>
      </div>
    </div>
  )
}
