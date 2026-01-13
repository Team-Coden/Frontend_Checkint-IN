export default function StatsCard() {
  return (
    <section className="mt-20 px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
      <div>
        <h2 className="text-4xl font-bold">12k+</h2>
        <p className="text-gray-500 mt-2">Customers</p>
      </div>

      <div>
        <h2 className="text-4xl font-bold">34k+</h2>
        <p className="text-gray-500 mt-2">Downloads</p>
      </div>

      <div>
        <h2 className="text-4xl font-bold">98%</h2>
        <p className="text-gray-500 mt-2">Happy Clients</p>
      </div>
    </section>
  );
}
