import svgPaths from "./svg-zs6qgjr2fj";

function FinalFive() {
  return (
    <div className="absolute left-0 size-[546px] top-0" data-name="final five 1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 546 546">
        <g clipPath="url(#clip0_467_417)" id="final five 1">
          <path d={svgPaths.p26c5dd80} fill="var(--fill-0, #FFC72C)" id="Vector" />
          <path d={svgPaths.p3f63f880} fill="var(--fill-0, #001F3D)" id="Vector_2" />
          <path d={svgPaths.p11ec51f0} fill="var(--fill-0, #001F3D)" id="Vector_3" />
          <path d={svgPaths.p906b291} fill="var(--fill-0, #001F3D)" id="Vector_4" />
        </g>
        <defs>
          <clipPath id="clip0_467_417">
            <rect fill="white" height="546" width="546" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

export default function Group() {
  return (
    <div className="relative size-full">
      <FinalFive />
    </div>
  );
}