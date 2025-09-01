export default function Component() {
  return (
    <>
      <defs>
        <filter id="dropshadow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blurredAlpha" />
          <feOffset in="blurredAlpha" dx="2" dy="3" result="offsetShadow" />
          <feFlood floodColor="#000" floodOpacity="0.5" result="shadowColor" />
          <feComposite in="shadowColor" in2="offsetShadow" operator="in" result="coloredShadow" />
          <feMerge>
            <feMergeNode in="coloredShadow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <circle
        cx={100}
        cy={100}
        r={65}
        fill="var(--mui-palette-primary-dark)"
        filter="url(#dropshadow)"
      />
      <circle
        cx={100}
        cy={100}
        r={55}
        fill="var(--mui-palette-primary-main)"
        stroke="var(--mui-palette-primary-light)"
        strokeWidth={3}
      />
    </>
  );
}
