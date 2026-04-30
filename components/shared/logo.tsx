import Image from "next/image";

export function MgaLogo() {
  return (
    <Image
      src="/images/logos/mga-logo.png"
      alt="MGA Informática"
      width={120}
      height={40}
      priority
      className="h-10 w-auto"
    />
  );
}
