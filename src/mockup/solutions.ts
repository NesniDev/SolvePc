interface TarjetaProblema {
  title: string;
  description: string;
  category: "OS" | "Red" | "Rendimiento" | "Virus" | "Hardware" | "Software";
  difficulty: "Fácil" | "Intermedio" | "Avanzado";
  image: string;
}

export const problemasTecnicos: TarjetaProblema[] = [
  {
    title: "Resolver pantalla azul de Windows (BSOD)",
    description: "Diagnosticar códigos de error, conflictos de controladores y restaurar el sistema en Windows 10 y 11.",
    category: "OS",
    difficulty: "Avanzado",
    image: "/categories/os.svg",
  },
  {
    title: "El WiFi se desconecta cada pocos minutos",
    description: "Estabilizar la conexión inalámbrica ajustando energía, canal y configuración de DNS.",
    category: "Red",
    difficulty: "Fácil",
    image: "/categories/network.svg",
  },
  {
    title: "El computador va lento sin razón aparente",
    description: "Identificar cuellos de botella, programas de inicio y optimizar el rendimiento general.",
    category: "Rendimiento",
    difficulty: "Fácil",
    image: "/categories/performance.svg",
  },
  {
    title: "Ransomware detectado - contención y recuperación",
    description: "Aislar el equipo, proteger evidencia y ejecutar un plan de recuperación seguro.",
    category: "Virus",
    difficulty: "Avanzado",
    image: "/categories/virus.svg",
  },
  {
    title: "SSD no detectado en BIOS o administrador de discos",
    description: "Verificar conexiones, firmware y particiones para recuperar la unidad.",
    category: "Hardware",
    difficulty: "Intermedio",
    image: "/categories/hardware.svg",
  },
  {
    title: "Las aplicaciones se cierran al iniciar",
    description: "Revisar registros de eventos, dependencias y reinstalaciones limpias.",
    category: "Software",
    difficulty: "Intermedio",
    image: "/categories/software.svg",
  },
  {
    title: "La VPN corporativa no conecta después de una actualización",
    description: "Solucionar fallos TLS, certificados y rutas de red.",
    category: "Red",
    difficulty: "Intermedio",
    image: "/categories/network.svg",
  },
  {
    title: "La batería del portátil se descarga muy rápido",
    description: "Analizar procesos en segundo plano y calibrar perfiles de energía.",
    category: "Rendimiento",
    difficulty: "Fácil",
    image: "/categories/performance.svg",
  },
  {
    title: "Actualización de macOS se queda en la pantalla de instalación",
    description: "Recuperar el sistema mediante modo recuperación y reinicio de NVRAM.",
    category: "OS",
    difficulty: "Intermedio",
    image: "/categories/os.svg",
  },
];