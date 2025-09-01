export interface KnobProps {
  value: number
}

export default function Component({
  value
}: KnobProps) {
  const angle = (value * 270) - 180;
  const radian = angle * Math.PI / 180;
  const distance = 90;
  const x1 = distance * Math.cos(radian);
  const y1 = distance * Math.sin(radian);

  return (
    <g
      transform="
        translate(100 100)
        rotate(-45)
      "
    >
      <path
        d={`
          M ${-distance} 0
          A ${distance} ${distance} 0 ${angle < 0 ? 0 : 1} 1 ${x1} ${y1}
        `}
        fill="none"
        stroke="var(--mui-palette-primary-main"
        strokeWidth="15"
        style={{}}
      />
    </g>
  );
}
