export default  function FeatureCard({  icon, title, text }: { icon: any, title: string, text: string }) {
  return (
    <div className="p-6 rounded-2xl border shadow-sm hover:shadow-md transition">
      <div className="text-4xl">{icon}</div>
      <h3 className="text-xl font-semibold mt-4">{title}</h3>
      <p className="text-gray-600 mt-2">{text}</p>
    </div>
  );
}
