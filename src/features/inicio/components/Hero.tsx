export default function Hero() {
  return (
    <section className="text-center mt-20 px-6">
      <p className="text-indigo-500 font-semibold">WE ARE BUILDers!</p>

      <h1 className="text-4xl md:text-6xl font-bold mt-4 leading-tight">
        Build stunning websites<br />& app faster than ever
      </h1>

      <p className="text-gray-600 max-w-xl mx-auto mt-6">
        Our platform helps you create modern, responsive and beautiful websites 
        in minutes. Perfect for startups, agencies, and developers.
      </p>

      <button className="mt-8 px-8 py-3 bg-black text-white rounded-xl hover:bg-gray-800">
        Get Started
      </button>

      <img
        src="https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=2000"
        alt="Startup"
        className="w-full max-w-4xl mx-auto mt-12 rounded-2xl shadow-lg"
      />
    </section>
  );
}
