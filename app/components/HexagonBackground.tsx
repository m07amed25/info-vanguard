"use client"

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"

export interface HexagonBackgroundProps {
  className?: string
  children?: React.ReactNode
  hexagonSize?: number
  hexagonMargin?: number
  glowColor?: string
  borderColor?: string
  /** When true, fills the parent (e.g. hero) instead of the viewport */
  contained?: boolean
}

export default function HexagonBackground({
  className,
  children,
  hexagonSize = 40,
  hexagonMargin = 2,
  glowColor = "var(--color-accent)",
  borderColor = "rgba(25, 25, 30, 0.7)",
  contained = false,
}: HexagonBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [grid, setGrid] = useState({ rows: 0, cols: 0, scale: 1 })

  const hexWidth = hexagonSize
  const hexHeight = hexagonSize * 1.15
  const rowSpacing = hexagonSize * 0.86

  const updateGrid = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const { width, height } = container.getBoundingClientRect()
    const scale = Math.max(1, Math.min(width, height) / 800)
    const scaledSize = hexagonSize * scale

    const cols = Math.ceil(width / scaledSize) + 2
    const rows = Math.ceil(height / (scaledSize * 0.86)) + 2

    setGrid({ rows, cols, scale })
  }, [hexagonSize])

  useEffect(() => {
    updateGrid()
    const container = containerRef.current
    if (!container) return

    const ro = new ResizeObserver(updateGrid)
    ro.observe(container)
    return () => ro.disconnect()
  }, [updateGrid])

  const scaledHexWidth = hexWidth * grid.scale
  const scaledHexHeight = hexHeight * grid.scale
  const scaledRowSpacing = rowSpacing * grid.scale
  const scaledMargin = hexagonMargin * grid.scale

  const hexagonStyle = useMemo(
    () => ({
      width: scaledHexWidth,
      height: scaledHexHeight,
      marginLeft: scaledMargin,
      "--margin": `${scaledMargin}px`,
    }),
    [scaledHexWidth, scaledHexHeight, scaledMargin],
  )

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden hover:[--glow-color:#1c7304] ${contained ? "absolute inset-0" : "fixed inset-0"} ${className ?? ""}`}
      style={{
        // base variables; hover over hexagons overrides --glow-color to #1c7304
        "--glow-color": glowColor,
        "--border-color": borderColor,
      } as React.CSSProperties}
    >
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: grid.rows }).map((_, rowIndex) => {
          const isOddRow = rowIndex % 2 === 1
          const marginLeft = isOddRow ? -(scaledHexWidth / 2) + scaledMargin : scaledMargin

          return (
            <div
              key={rowIndex}
              className="flex"
              style={{
                marginTop: rowIndex === 0 ? -scaledHexHeight * 0.25 : -scaledRowSpacing * 0.16,
                marginLeft: marginLeft - scaledHexWidth * 0.1,
              }}
            >
              {Array.from({ length: grid.cols }).map((_, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={
                    "relative shrink-0 transition-all duration-1000 [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)] before:absolute before:inset-0 before:bg-[var(--border-color)] before:transition-all before:duration-1000 after:absolute after:inset-[var(--margin)] after:bg-transparent after:[clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)] after:transition-all after:duration-500 hover:before:bg-[var(--glow-color)] hover:before:duration-0 hover:after:bg-transparent hover:after:duration-0 hover:before:shadow-[0_0_20px_var(--glow-color)]"
                  }
                  style={hexagonStyle as React.CSSProperties}
                />
              ))}
            </div>
          )
        })}
      </div>

      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(ellipse at 30% 20%, var(--glow-color) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, var(--glow-color) 0%, transparent 50%)`,
        }}
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, transparent 30%, rgba(5,5,8,0.92) 100%)",
        }}
      />

      {children && <div className="relative z-10 h-full w-full">{children}</div>}
    </div>
  )
}
