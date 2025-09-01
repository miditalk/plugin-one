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
      <line
        x1={0}
        y1={0}
        x2={0}
        y2={60}
        strokeWidth="5"
        strokeLinecap="round"
        stroke="var(--mui-palette-white)"
      />
    </g>
  );
}
