export default function Component() {
  return (
    <>
      <defs>
        <filter id="dropshadow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="blurredAlpha" />
          <feOffset in="blurredAlpha" dx="0" dy="10" result="offsetShadow" />
          <feFlood floodColor="#000" floodOpacity="0.8" result="shadowColor" />
          <feComposite in="shadowColor" in2="offsetShadow" operator="in" result="coloredShadow" />
          <feMerge>
            <feMergeNode in="coloredShadow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="innerglow">
          <feFlood floodColor="#ffffff" floodOpacity="0.1" result="flood" />
          <feComposite in="flood" in2="SourceAlpha" operator="out" result="composite1" />
          <feOffset dx="4" dy="4" in="composite1" result="offset" />
          <feGaussianBlur stdDeviation="2 2" in="offset" edgeMode="none" result="blur" />
          <feComposite in="blur" in2="SourceAlpha" operator="in" result="composite2" />
          <feMerge result="merge">
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="composite2" />
          </feMerge>
        </filter>

      </defs>

      <g filter="url(#dropshadow)">
        <circle
          cx={100}
          cy={100}
          r={60}
          fill="var(--mui-palette-primary-darker)"
          filter="url(#innerglow)"
        />
      </g>

      <circle
        cx={100}
        cy={100}
        r={50}
        fill="var(--mui-palette-primary-main)"
      />
    </>
  );
}
