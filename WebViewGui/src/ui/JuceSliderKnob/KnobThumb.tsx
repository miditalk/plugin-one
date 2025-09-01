export interface KnobProps {
  value: number
}

export default function Component({
  value
}: KnobProps) {
  return (
    <g
      transform={`
        translate(100 100)
        rotate(${(value * 270) + 45})
      `}
    >
      <rect
        width={5}
        height={80}
        rx={2.5}
        ry={2.5}
        fill="var(--mui-palette-primary-moreDark)"
        style={{
          zIndex: 300
        }}
      />
    </g>
  );
}
