export default function Footer() {
  return (
    <footer className="py-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xl font-extrabold text-white tracking-tight">
              NADOM<span className="text-white/60">.BG</span>
            </span>
            <p className="text-sm text-white/40 mt-1">
              Национална агенция домоуправител
            </p>
          </div>
          <p className="text-sm text-white/30">
            &copy; {new Date().getFullYear()} NADOM.BG. Всички права запазени.
          </p>
        </div>
      </div>
    </footer>
  );
}
