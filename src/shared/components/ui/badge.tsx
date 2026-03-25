import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../../lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        // ── Shadcn originals ──────────────────────────────────────────
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",

        // ── primary-scarlet ───────────────────────────────────────────
        // Solid: scarlet-600 bg, white text
        scarlet:
          "[--badge-bg:oklch(53.18%_0.216_26.56)] [--badge-fg:oklch(1_0_0)] [--badge-border:oklch(42.99%_0.175_25.91)] border-[var(--badge-border)] bg-[var(--badge-bg)] text-[var(--badge-fg)] [a&]:hover:opacity-90",
        // Subtle: scarlet-100 bg, scarlet-700 text, scarlet-200 border
        "scarlet-subtle":
          "[--badge-bg:oklch(89.13%_0.058_10.39)] [--badge-fg:oklch(42.99%_0.175_25.91)] [--badge-border:oklch(79.14%_0.123_12.67)] border-[var(--badge-border)] bg-[var(--badge-bg)] text-[var(--badge-fg)] [a&]:hover:opacity-90",

        // ── golden-orange ─────────────────────────────────────────────
        // Solid: orange-600 bg, white text
        orange:
          "[--badge-bg:oklch(66.62%_0.145_69.36)] [--badge-fg:oklch(1_0_0)] [--badge-border:oklch(54.11%_0.117_70.57)] border-[var(--badge-border)] bg-[var(--badge-bg)] text-[var(--badge-fg)] [a&]:hover:opacity-90",
        // Subtle: orange-100 bg, orange-700 text, orange-200 border
        "orange-subtle":
          "[--badge-bg:oklch(95.01%_0.047_80.81)] [--badge-fg:oklch(54.11%_0.117_70.57)] [--badge-border:oklch(90.49%_0.092_81.19)] border-[var(--badge-border)] bg-[var(--badge-bg)] text-[var(--badge-fg)] [a&]:hover:opacity-90",

        // ── blue-slate ────────────────────────────────────────────────
        // Solid: slate-600 bg, white text
        slate:
          "[--badge-bg:oklch(50.77%_0.031_241.65)] [--badge-fg:oklch(1_0_0)] [--badge-border:oklch(41.61%_0.026_241.93)] border-[var(--badge-border)] bg-[var(--badge-bg)] text-[var(--badge-fg)] [a&]:hover:opacity-90",
        // Subtle: slate-100 bg, slate-700 text, slate-200 border
        "slate-subtle":
          "[--badge-bg:oklch(92.23%_0.008_241.67)] [--badge-fg:oklch(41.61%_0.026_241.93)] [--badge-border:oklch(84.35%_0.014_240.99)] border-[var(--badge-border)] bg-[var(--badge-bg)] text-[var(--badge-fg)] [a&]:hover:opacity-90",

        // ── alabaster-grey ────────────────────────────────────────────
        // Subtle neutral: grey-100 bg, grey-700 text, grey-200 border
        grey:
          "[--badge-bg:oklch(92.37%_0.003_228.79)] [--badge-fg:oklch(41.71%_0.009_241.86)] [--badge-border:oklch(84.38%_0.005_247.89)] border-[var(--badge-border)] bg-[var(--badge-bg)] text-[var(--badge-fg)] [a&]:hover:opacity-90",

        // ── Semantic status shortcuts ─────────────────────────────────
        // activo / aprobado → golden-orange subtle (warm positive)
        success:
          "[--badge-bg:oklch(95.01%_0.047_80.81)] [--badge-fg:oklch(40.83%_0.087_72.86)] [--badge-border:oklch(90.49%_0.092_81.19)] border-[var(--badge-border)] bg-[var(--badge-bg)] text-[var(--badge-fg)] [a&]:hover:opacity-90",
        // inactivo / reprobado → scarlet subtle (clear negative)
        danger:
          "[--badge-bg:oklch(89.13%_0.058_10.39)] [--badge-fg:oklch(42.99%_0.175_25.91)] [--badge-border:oklch(79.14%_0.123_12.67)] border-[var(--badge-border)] bg-[var(--badge-bg)] text-[var(--badge-fg)] [a&]:hover:opacity-90",
        // pendiente / info → slate subtle
        info:
          "[--badge-bg:oklch(92.23%_0.008_241.67)] [--badge-fg:oklch(41.61%_0.026_241.93)] [--badge-border:oklch(84.35%_0.014_240.99)] border-[var(--badge-border)] bg-[var(--badge-bg)] text-[var(--badge-fg)] [a&]:hover:opacity-90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export { Badge, badgeVariants }
