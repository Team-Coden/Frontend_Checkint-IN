import FeatureCard from "../components/FeatureCard";

export default function Features() {
  return (
    <section className="mt-28 px-6">
      <h2 className="text-center text-3xl md:text-4xl font-bold">
        Amazing Features
      </h2>

      <p className="text-center text-gray-600 mt-3 max-w-2xl mx-auto">
        Everything you need to build a modern and professional website quickly.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <FeatureCard 
          icon="⚡" 
          title="Fast Performance" 
          text="Optimized for speed and smooth experience."
        />
        <FeatureCard 
          icon="🔒" 
          title="Secure" 
          text="Top-tier security built for modern applications." 
        />
        <FeatureCard 
          icon="🎨" 
          title="Customizable" 
          text="Fully customizable UI components." 
        />
      </div>
    </section>
  );
}
