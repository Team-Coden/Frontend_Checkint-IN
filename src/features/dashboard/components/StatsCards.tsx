import { GraduationCap, Building2, ClipboardList } from "lucide-react";

const cards = [
  {
    title: "Estudiantes Activos",
    value: 0,
    icon: <GraduationCap className="w-6 h-6 text-blue-600" />,
    subtitle: "Total de estudiantes en Pasantías",
  },
  {
    title: "Centros Asociados",
    value: 0,
    icon: <Building2 className="w-6 h-6 text-blue-600" />,
    subtitle: "Centros colaboradores activos",
  },
  {
    title: "Pasantías en Curso",
    value: 0,
    icon: <ClipboardList className="w-6 h-6 text-blue-600" />,
    subtitle: "Estudiantes realizando pasantías",
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((item, i) => (
        <div
          key={i}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col gap-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-4xl font-bold text-gray-900">{item.value}</span>
            <div className="p-3 bg-blue-100 rounded-full">
              {item.icon}
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-700">{item.title}</h3>
          <p className="text-gray-500 text-sm">{item.subtitle}</p>
        </div>
      ))}
    </div>
  );
}
