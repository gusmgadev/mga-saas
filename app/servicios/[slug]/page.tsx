import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { SERVICES, BRAND } from "@/lib/constants";
import { Globe, Briefcase, Wrench, BarChart3, CheckCircle, ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const iconMap = { Globe, Briefcase, Wrench, BarChart3 };

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.title} | MGA Informática`,
    description: service.fullDescription,
    openGraph: {
      title: `${service.title} | MGA Informática`,
      description: service.description,
      url: `https://mgainformatica.com.ar/servicios/${service.slug}`,
      images: [{ url: service.cardImage, alt: service.title }],
    },
  };
}

export default async function ServicioPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const Icon = iconMap[service.icon as keyof typeof iconMap];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      {/* Header con imagen desenfocada */}
      <div className="relative py-20 px-4 text-white text-center overflow-hidden">
        {/* Imagen de fondo */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{ backgroundImage: `url('${service.cardImage}')`, filter: "blur(6px)" }}
        />
        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
            {Icon && <Icon size={40} color="white" strokeWidth={1.5} />}
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
          >
            {service.title}
          </h1>
          <p className="text-xl text-white/90">{service.description}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <p className="text-gray-600 text-lg leading-relaxed mb-12 text-center">
          {service.fullDescription}
        </p>

        <h2
          className="text-2xl font-bold mb-8 text-center"
          style={{ color: BRAND.colors.primary }}
        >
          ¿Qué incluye?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          {service.features.map((feature) => (
            <div key={feature} className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
              <CheckCircle size={20} color={BRAND.colors.secondary} className="mt-0.5 shrink-0" />
              <span className="text-gray-700 font-medium">{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center space-y-4">
          <a
            href="https://api.whatsapp.com/send?phone=5492974036526&text=Hola%2C%20me%20interesa%20el%20servicio%20de%20{encodeURIComponent(service.title)}"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg text-white font-bold text-lg transition hover:shadow-xl hover:scale-105"
            style={{ background: "#25D366" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Consultá por WhatsApp
          </a>

          <div>
            <Link
              href="/#contact"
              className="inline-block px-8 py-4 rounded-lg font-bold text-lg transition hover:shadow-xl hover:scale-105 border-2"
              style={{ color: BRAND.colors.primary, borderColor: BRAND.colors.primary }}
            >
              Enviar consulta
            </Link>
          </div>

          <div className="pt-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 transition"
            >
              <ArrowLeft size={16} />
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
