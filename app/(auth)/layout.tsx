import { theme } from "@/lib/theme";
import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8"
      style={{ backgroundColor: theme.colors.background }}
    >
      {/* Logo arriba de la card */}
      <div className="mb-6">
        <Link href="/">
          <Image
            src={theme.logo.path}
            alt={theme.company.name}
            width={theme.auth.logo.width}
            height={theme.auth.logo.height}
            className="object-contain"
            priority
          />
        </Link>
      </div>

      {/* Card blanca */}
      <div
        className="w-[50vw] min-w-[380px] max-w-[700px]
                   rounded-[12px]
                   shadow-[0_4px_24px_rgba(0,0,0,0.10),0_1px_4px_rgba(0,0,0,0.06)]
                   border border-[#E8E8E8]
                   p-12
                   max-[640px]:w-full max-[640px]:min-w-0 max-[640px]:max-w-full
                   max-[640px]:rounded-none max-[640px]:shadow-none
                   max-[640px]:border-0 max-[640px]:border-t max-[640px]:border-b max-[640px]:border-[#E8E8E8]"
        style={{ backgroundColor: theme.colors.background }}
      >
        {children}
      </div>

      {/* Link volver al inicio */}
      <Link
        href="/"
        className="mt-6 text-sm transition hover:opacity-80"
        style={{ color: theme.colors.textMuted }}
      >
        ← Volver al inicio
      </Link>
    </div>
  );
}
