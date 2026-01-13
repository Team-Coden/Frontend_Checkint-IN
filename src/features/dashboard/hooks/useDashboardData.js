import { useState, useEffect } from "react";

export default function useDashboardData() {
  const [stats, setStats] = useState({
    students: 0,
    centers: 0,
    internships: 0,
  });

  useEffect(() => {
    // Simulación de fetch — luego conectas tu API aquí
    setTimeout(() => {
      setStats({
        students: 42,
        centers: 10,
        internships: 18,
      });
    }, 500);
  }, []);

  return stats;
}
