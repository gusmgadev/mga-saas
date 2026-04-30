import { BRAND, SECTION_COLORS } from "@/lib/constants";

export function WhyUs() {
  const reasons = [
    {
      title: "Experiencia",
      description: "Años de experiencia en soluciones tecnológicas para empresas de todos los tamaños",
    },
    {
      title: "Personalizado",
      description: "Cada solución es adaptada a las necesidades específicas de tu negocio",
    },
    {
      title: "Soporte 24/7",
      description: "Equipo siempre disponible para resolver tus consultas y problemas",
    },
    {
      title: "Innovación",
      description: "Usamos las tecnologías más modernas y actualizadas del mercado",
    },
  ];

  return (
    <section
      className="py-12 px-4 sm:px-6 lg:px-8"
      style={{ background: SECTION_COLORS.whyUs.bg }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4" style={{ color: BRAND.colors.primary }}>
            ¿Por qué elegirnos?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Nos diferenciamos por nuestro compromiso con la calidad y satisfacción de nuestros clientes
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reasons.map((reason, index) => (
            <div key={index} className="flex gap-4">
              <div
                className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: BRAND.colors.primary }}
              >
                {index + 1}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: BRAND.colors.primary }}>
                  {reason.title}
                </h3>
                <p className="text-gray-600">{reason.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
