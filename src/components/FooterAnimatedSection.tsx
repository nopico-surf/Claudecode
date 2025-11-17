import Frame4Desktop from "../imports/Frame10-446-378";
import Frame4Mobile from "../imports/Frame11-446-235";

export function FooterAnimatedSection() {
  return (
    <>
      {/* Desktop - Rodapé largo do Figma */}
      <div className="hidden md:block w-full h-[320px] overflow-hidden rounded-2xl">
        <Frame4Desktop />
      </div>

      {/* Mobile - Rodapé estreito do Figma */}
      <div className="md:hidden w-full h-[370px] overflow-hidden rounded-2xl">
        <Frame4Mobile />
      </div>
    </>
  );
}
