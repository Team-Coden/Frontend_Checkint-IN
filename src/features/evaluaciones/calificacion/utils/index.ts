// Evaluation categories configuration
export const EVALUATION_CATEGORIES = {
  capacidades: [
    { key: 'conocimientosTeoricos', label: 'Conocimientos Teóricos' },
    { key: 'seguimientoInstrucciones', label: 'Seguimiento de Instrucciones' },
    { key: 'organizacion', label: 'Organización' },
    { key: 'metodo', label: 'Método de Trabajo' },
    { key: 'ritmoTrabajo', label: 'Ritmo de Trabajo' },
  ],
  habilidades: [
    { key: 'iniciativa', label: 'Iniciativa' },
    { key: 'trabajoEquipo', label: 'Trabajo en Equipo' },
    { key: 'puntualidadAsistencia', label: 'Puntualidad y Asistencia' },
    { key: 'responsabilidad', label: 'Responsabilidad' },
  ],
  actitudes: [
    { key: 'relacionesInterpersonales', label: 'Relaciones Interpersonales' },
    { key: 'adaptacionAmbiente', label: 'Adaptación al Ambiente' },
    { key: 'presentacionPersonal', label: 'Presentación Personal' },
  ],
} as const;

// Badge configuration for grades - returns configuration object
export const getNotaBadgeConfig = (notaFinal: string) => {
  const nota = parseFloat(notaFinal || '0');
  if (nota >= 90) {
    // Excelente → golden-orange-subtle (100 bg / 800 text / 200 border)
    return {
      className: [
        "[--badge-bg:oklch(95.01%_0.047_80.81)]",
        "[--badge-fg:oklch(40.83%_0.087_72.86)]",
        "[--badge-border:oklch(90.49%_0.092_81.19)]",
        "bg-[var(--badge-bg)] text-[var(--badge-fg)] border border-[var(--badge-border)]",
      ].join(" "),
      label: "Excelente"
    };
  } else if (nota >= 80) {
    // Muy Bueno → blue-slate-subtle (100 bg / 700 text / 200 border)
    return {
      className: [
        "[--badge-bg:oklch(92.23%_0.008_241.67)]",
        "[--badge-fg:oklch(41.61%_0.026_241.93)]",
        "[--badge-border:oklch(84.35%_0.014_240.99)]",
        "bg-[var(--badge-bg)] text-[var(--badge-fg)] border border-[var(--badge-border)]",
      ].join(" "),
      label: "Muy Bueno"
    };
  } else if (nota >= 70) {
    // Aprobado → golden-orange solid toned (200 bg / 700 text / 300 border)
    return {
      className: [
        "[--badge-bg:oklch(90.49%_0.092_81.19)]",
        "[--badge-fg:oklch(54.11%_0.117_70.57)]",
        "[--badge-border:oklch(86.11%_0.131_79.28)]",
        "bg-[var(--badge-bg)] text-[var(--badge-fg)] border border-[var(--badge-border)]",
      ].join(" "),
      label: "Aprobado"
    };
  } else {
    // Reprobado → primary-scarlet-subtle (100 bg / 700 text / 200 border)
    return {
      className: [
        "[--badge-bg:oklch(89.13%_0.058_10.39)]",
        "[--badge-fg:oklch(42.99%_0.175_25.91)]",
        "[--badge-border:oklch(79.14%_0.123_12.67)]",
        "bg-[var(--badge-bg)] text-[var(--badge-fg)] border border-[var(--badge-border)]",
      ].join(" "),
      label: "Reprobado"
    };
  }
};

// Format evaluation ID
export const formatEvaluationId = (id: string) => `#${id.slice(-6)}`;

// Calculate final grade from averages
export const calculateNotaFinal = (
  promedioCapacidades: number,
  promedioHabilidades: number,
  promedioActitudes: number
): string => {
  const notaFinal = (promedioCapacidades + promedioHabilidades + promedioActitudes) / 3;
  return notaFinal.toFixed(1);
};

// Check if all categories are approved (>= 70)
export const isAllApproved = (
  promedioCapacidades: string,
  promedioHabilidades: string,
  promedioActitudes: string
): boolean => {
  const capacidades = parseFloat(promedioCapacidades || '0');
  const habilidades = parseFloat(promedioHabilidades || '0');
  const actitudes = parseFloat(promedioActitudes || '0');
  
  return capacidades >= 70 && habilidades >= 70 && actitudes >= 70;
};

// Check if the final grade is approved (>= 70)
export const isApproved = (notaFinal: string): boolean => {
  const nota = parseFloat(notaFinal || '0');
  return nota >= 70;
};

// Get color class based on grade
export const getGradeColorClass = (grade: string): string => {
  const nota = parseFloat(grade || '0');
  if (nota >= 90) return 'text-emerald-600 font-semibold';
  if (nota >= 80) return 'text-blue-600 font-semibold';
  if (nota >= 70) return 'text-green-600 font-semibold';
  return 'text-red-600 font-semibold';
};
