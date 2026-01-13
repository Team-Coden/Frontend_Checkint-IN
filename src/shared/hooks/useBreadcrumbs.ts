import { useLocation } from "react-router-dom"
import { breadcrumbModules } from "@/shared/hooks/config/breadcrumbConfig"

export function useBreadcrumbs() {
  const location = useLocation()

  const segments = location.pathname.split("/").filter(Boolean)

  const breadcrumbs = []

  // 1. Detectar módulo si existe
  const moduleKey = segments[0]
  if (breadcrumbModules[moduleKey]) {
    breadcrumbs.push({
      label: breadcrumbModules[moduleKey],
      href: "/" + moduleKey,
      isLast: segments.length === 1,
    })
  }

  // 2. Agregar las subrutas (donde estás dentro del módulo)
  segments.slice(1).forEach((segment, index) => {
    const href = "/" + segments.slice(0, index + 2).join("/")

    breadcrumbs.push({
      label: segment
        .replaceAll("-", " ")
        .replace(/\b\w/g, (l) => l.toUpperCase()),
      href,
      isLast: index === segments.slice(1).length - 1,
    })
  })

  return breadcrumbs
}
