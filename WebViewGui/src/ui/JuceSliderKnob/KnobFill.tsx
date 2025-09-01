export interface KnobProps {
  value: number
}

export default function Component({
  value
}: KnobProps) {
  return (
    <path
      d="
        M 50 120
        L 50 -80
        A 50 50 0 0 0 -50 -80"
      fill="none"
      stroke="black"
      stroke-width="45"
      stroke-linecap="round"
    />
  );
}
