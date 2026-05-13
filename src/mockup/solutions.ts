import type { Solutions } from "src/interfaces/Solutions";


export const problemasTecnicos: Solutions[] = [
  {
    title: "Resolver pantalla azul de Windows (BSOD)",
    slug: "resolver-pantalla-azul-de-windows-bsod",
    description: "Diagnosticar códigos de error, conflictos de controladores y restaurar el sistema en Windows 10 y 11.",
    explain: {
        title: "¿Qué está sucediendo?",
        description: "Una «Pantalla azul de la muerte» (BSOD) es la respuesta de protección de Windows ante un fallo irrecuperable del núcleo. El sistema se detiene para evitar la corrupción de datos y escribe un volcado de memoria en el disco. El código de detención que se muestra es la vía más rápida para identificar la causa raíz; esta guía le orientará para capturarlo, interpretarlo y aplicar la acción correctiva adecuada.",
        photo: "/categories/img/so.webp",
        prerequisites: [
          "Derechos de administrador local en el dispositivo afectado.",
          "Unidad USB de recuperación de Windows 10/11 (opcional, pero altamente recomendada).",
          "Controladores OEM más recientes descargados en una unidad externa.",
          "Al menos 30 minutos de tiempo ininterrumpido en la estación de trabajo."
        ],
        steps: [
          "Abra el administrador de controladores de dispositivos y busque el controlador que está causando el problema (frecuentemente marcado con un triángulo amarillo).",
          "Si el problema inició tras una actualización, seleccione el controlador, haga clic derecho y elija 'Revertir controlador anterior'.",
          "Desconecte periféricos no esenciales para descartar conflictos de hardware externo.",
          "Verifique la integridad del disco duro y la memoria RAM utilizando las herramientas de diagnóstico integradas.",
          "Si el sistema no arranca, ingrese al Entorno de Recuperación de Windows (WinRE) y desinstale la última actualización."
        ],
        terminal: "sfc /scannow"
      },
    category: "OS",
    difficulty: "Avanzado",
    image: "/categories/os.svg",
  },
  {
    title: "El WiFi se desconecta cada pocos minutos",
    slug: "el-wifi-se-desconecta-cada-pocos-minutos",
    description: "Estabilizar la conexión inalámbrica ajustando energía, canal y configuración de DNS.",
    explain:
      {
        title: "Diagnóstico y estabilización de la conexión",
        description: "Las interrupciones frecuentes de la red inalámbrica suelen estar vinculadas a tres factores principales: una política agresiva de ahorro de energía del sistema operativo que apaga el adaptador, interferencia de radiofrecuencia con redes vecinas, o una caché de DNS corrupta que impide la resolución continua de nombres de dominio.",
        photo: "/categories/img/network.webp",
        prerequisites: [
          "Derechos de administrador local en el equipo.",
          "Credenciales de acceso al panel de administración del enrutador (router).",
          "Cable de red Ethernet (opcional, para descartar fallos físicos en la tarjeta inalámbrica).",
          "15 minutos de disponibilidad."
        ],
        steps: [
          "Acceda al 'Administrador de dispositivos', busque su adaptador de red, vaya a 'Propiedades' > 'Administración de energía' y desmarque la opción de apagar el dispositivo para ahorrar energía.",
          "Ingrese a la configuración de su enrutador y cambie el canal de transmisión (canales 1, 6 u 11 son recomendados para la banda de 2.4GHz para evitar solapamientos).",
          "Restablezca la configuración de red y purgue la caché de resolución DNS del sistema.",
          "Actualice los controladores de la tarjeta de red desde la página oficial del fabricante del equipo."
        ],
        terminal: "ipconfig /flushdns && ipconfig /renew"
      }
    ,
    category: "Red",
    difficulty: "Fácil",
    image: "/categories/network.svg",
  },
  {
    title: "El computador va lento sin razón aparente",
    slug: "el-computador-va-lento-sin-razon-aparente",
    description: "Identificar cuellos de botella, programas de inicio y optimizar el rendimiento general.",
    explain:
      {
        title: "Mitigación de cuellos de botella de rendimiento",
        description: "La ralentización súbita de un equipo generalmente indica que un recurso de hardware crítico (CPU, RAM o Disco) ha alcanzado el 100% de su capacidad. Esto puede deberse a procesos en segundo plano no optimizados, acumulación de aplicaciones en el arranque o la indexación exhaustiva del sistema.",
        photo: "/categories/img/performance.webp",
        prerequisites: [
          "Derechos de administrador local en el sistema.",
          "Acceso sin restricciones al Administrador de Tareas (Windows) o Monitor de Actividad (macOS).",
          "Aproximadamente 20 minutos para observar y analizar el comportamiento en reposo y bajo carga."
        ],
        steps: [
          "Abra el Administrador de tareas (o Monitor de Actividad) y ordene los procesos por consumo de CPU, Memoria o Disco para identificar la aplicación problemática.",
          "Deshabilite aplicaciones innecesarias en la pestaña 'Inicio' para liberar recursos durante el arranque.",
          "Ejecute un análisis completo con un software antimalware para descartar minería de criptomonedas oculta o troyanos.",
          "Verifique el espacio libre en el disco principal; los sistemas operativos requieren al menos un 15% de espacio libre para gestionar la memoria virtual de manera eficiente."
        ],
        terminal: "Get-Process | Sort-Object CPU -Descending | Select-Object -First 10"
      }
    ,
    category: "Rendimiento",
    difficulty: "Fácil",
    image: "/categories/performance.svg",
  },
  {
    title: "Ransomware detectado - contención y recuperación",
    slug: "ransomware-detectado-contencion-y-recuperacion",
    description: "Aislar el equipo, proteger evidencia y ejecutar un plan de recuperación seguro.",
    explain:
      {
        title: "Protocolo de Respuesta a Incidentes",
        description: "Un ataque de ransomware cifra los archivos del usuario exigiendo un rescate. La máxima prioridad pedagógica y operativa en este escenario es la contención: evitar el 'movimiento lateral', es decir, que el malware se propague a través de la red local hacia servidores u otros equipos conectados.",
        photo: "/categories/img/virus.webp",
        prerequisites: [
          "Derechos de administrador de red o Dominio (si aplica).",
          "Acceso físico inmediato al equipo comprometido.",
          "Unidad de almacenamiento externa y segura que contenga copias de seguridad aisladas (offline).",
          "1 a 2 horas de tiempo, priorizando el aislamiento sobre el diagnóstico inicial."
        ],
        steps: [
          "Desconecte el equipo inmediatamente de la red (física y WiFi) pero NO lo apague si sospecha que la clave de descifrado podría estar temporalmente en la memoria RAM.",
          "Identifique la variante del ransomware observando la extensión de los archivos cifrados y el archivo de texto de rescate.",
          "Verifique si existen instantáneas de volumen (Shadow Copies) que no hayan sido eliminadas por el malware.",
          "Formatee la unidad afectada completamente. No intente limpiar el sistema operativo existente, ya que podrían quedar puertas traseras.",
          "Restaure los datos exclusivamente a partir de una copia de seguridad aislada (offline) verificada previamente."
        ],
        terminal: "vssadmin list shadows"
      }
    ,
    category: "Virus",
    difficulty: "Avanzado",
    image: "/categories/virus.svg",
  },
  {
    title: "SSD no detectado en BIOS o administrador de discos",
    slug: "ssd-no-detectado-en-bios-o-administrador-de-discos",
    description: "Verificar conexiones, firmware y particiones para recuperar la unidad.",
    explain:
      {
        title: "Diagnóstico a nivel de Hardware y Volúmenes lógicos",
        description: "Cuando un disco de estado sólido (SSD) desaparece del sistema, la falla debe aislarse en dos niveles: físico (cables de datos/energía o ranuras M.2 dañadas) y lógico (tabla de particiones corrupta o unidad no inicializada).",
        photo: "/categories/img/hardware.webp",
        prerequisites: [
          "Derechos de administrador local.",
          "Herramientas de hardware (destornillador adecuado para chasis de PC o portátil).",
          "Conocimiento básico para navegar por la interfaz de la BIOS/UEFI.",
          "Pulsera antiestática (opcional, para evitar descargas que dañen los componentes)."
        ],
        steps: [
          "Apague el equipo, desconecte la energía y vuelva a asentar físicamente el SSD en su puerto o cambie el cable SATA.",
          "Acceda a la BIOS/UEFI y verifique si el puerto de almacenamiento está habilitado y detecta el modelo del dispositivo.",
          "Si la BIOS lo detecta pero Windows no, abra el Administrador de discos ('diskmgmt.msc').",
          "Si el disco aparece como 'No inicializado', inicialícelo en formato GPT (o MBR para sistemas antiguos).",
          "Asigne una nueva letra de unidad y formatéelo en NTFS o exFAT si aparece como espacio 'No asignado'."
        ],
        terminal: "diskpart"
      }
    ,
    category: "Hardware",
    difficulty: "Intermedio",
    image: "/categories/hardware.svg",
  },
  {
    title: "Las aplicaciones se cierran al iniciar",
    slug: "las-aplicaciones-se-cierran-al-iniciar",
    description: "Revisar registros de eventos, dependencias y reinstalaciones limpias.",
    explain:
      {
        title: "Análisis de dependencias y registros de eventos",
        description: "Un cierre inesperado (crash) instantáneo al iniciar una aplicación suele ser el síntoma de una dependencia ausente o corrupta (como bibliotecas .DLL, frameworks .NET o Visual C++ Redistributables), o un conflicto de permisos a nivel de sistema de archivos.",
        photo: "/categories/img/software.webp",
        prerequisites: [
          "Derechos de administrador local.",
          "Conexión a internet estable para descargar dependencias ausentes.",
          "Instalador original de la aplicación o acceso a la cuenta de licenciamiento de software.",
          "15 minutos de tiempo de diagnóstico ininterrumpido."
        ],
        steps: [
          "Abra el 'Visor de eventos' de Windows y navegue a 'Registros de Windows' > 'Aplicación' para buscar errores recientes marcados en rojo.",
          "Verifique que su sistema cuenta con los requisitos de framework actualizados (ej. reinstalar Visual C++ Redistributable).",
          "Haga clic derecho en el ejecutable y seleccione 'Ejecutar como administrador' para descartar bloqueos de permisos.",
          "Desinstale la aplicación, elimine manualmente las carpetas residuales en 'AppData' y vuelva a instalarla de forma limpia."
        ],
        terminal: "Get-EventLog -LogName Application -EntryType Error -Newest 10"
      }
    ,
    category: "Software",
    difficulty: "Intermedio",
    image: "/categories/software.svg",
  },
  {
    title: "La VPN corporativa no conecta después de una actualización",
    slug: "la-vpn-corporativa-no-conecta-despues-de-una-actualizacion",
    description: "Solucionar fallos TLS, certificados y rutas de red.",
    explain:
      {
        title: "Resolución de túneles VPN y adaptadores virtuales",
        description: "Las actualizaciones del sistema operativo frecuentemente restablecen las configuraciones de red, lo que puede corromper el adaptador de red virtual (TAP/TUN) que utiliza la VPN, o desincronizar los certificados de seguridad necesarios para establecer el túnel TLS/IPsec.",
        photo: "/categories/img/network.webp",
        prerequisites: [
          "Derechos de administrador local.",
          "Credenciales del cliente VPN y dispositivo de Autenticación Multifactor (MFA) a mano.",
          "Confirmación previa del equipo de IT de que no hay caídas de servicio en los concentradores VPN.",
          "20 minutos de tiempo para pruebas de enrutamiento."
        ],
        steps: [
          "En el Administrador de dispositivos, desinstale el adaptador de red virtual asociado a su cliente VPN (ej. 'TAP-Windows Adapter').",
          "Verifique la hora y zona horaria de su equipo, ya que un desfase invalida los certificados de seguridad en el protocolo TLS.",
          "Asegúrese de que el Firewall del sistema no esté bloqueando los puertos UDP/TCP requeridos por su protocolo VPN.",
          "Reinstale el cliente VPN corporativo para que reconfigure automáticamente las rutas y los adaptadores virtuales."
        ],
        terminal: "route print"
      }
    ,
    category: "Red",
    difficulty: "Intermedio",
    image: "/categories/network.svg",
  },
  {
    title: "La batería del portátil se descarga muy rápido",
    slug: "la-bateria-del-portatil-se-descarga-muy-rapido",
    description: "Analizar procesos en segundo plano y calibrar perfiles de energía.",
    explain:
      {
        title: "Análisis de consumo energético y degradación",
        description: "El agotamiento prematuro de la batería se divide en dos factores: degradación química de las celdas de litio (hardware) y consumo desmedido por procesos que impiden que el procesador entre en estados de suspensión profunda, conocidos como 'wakelocks' (software).",
        photo: "/categories/img/performance.webp",
        prerequisites: [
          "Derechos de administrador local.",
          "Cargador original (o certificado) del equipo portátil disponible.",
          "Aproximadamente 10 minutos para generar y analizar el reporte, y tiempo pasivo posterior para ejecutar un ciclo de calibración."
        ],
        steps: [
          "Genere un reporte detallado de la salud de la batería para comparar la 'Capacidad de diseño' contra la 'Capacidad de carga completa'.",
          "Ajuste el brillo de la pantalla (el mayor consumidor de energía) y cambie el perfil de energía a 'Equilibrado' o 'Eficiencia'.",
          "Desactive el Bluetooth si no está en uso y limite las aplicaciones que tienen permiso para ejecutarse en segundo plano.",
          "Realice una calibración: cargue el equipo al 100%, déjelo descargar hasta que se apague solo y vuelva a cargarlo ininterrumpidamente."
        ],
        terminal: "powercfg /batteryreport /output \"C:\\battery_report.html\""
      }
    ,
    category: "Rendimiento",
    difficulty: "Fácil",
    image: "/categories/performance.svg",
  },
  {
    title: "Actualización de macOS se queda en la pantalla de instalación",
    slug: "actualizacion-de-macos-se-queda-en-la-pantalla-de-instalacion",
    description: "Recuperar el sistema mediante modo recuperación y reinicio de NVRAM.",
    explain:
      {
        title: "Recuperación de macOS y gestión de memoria no volátil",
        description: "Cuando la barra de progreso de una actualización de macOS se congela de forma permanente, indica un fallo al escribir en la partición del sistema, una incompatibilidad de kernel (kexts) de terceros, o datos corruptos en la NVRAM, la memoria que guarda ajustes de arranque críticos.",
        photo: "/categories/img/so.webpg",
        prerequisites: [
          "Conexión a internet estable (preferiblemente conexión física Ethernet) para procesos de Recuperación por Internet.",
          "Cable de alimentación de CA conectado ininterrumpidamente al Mac.",
          "Copia de seguridad reciente de Time Machine (verificada preferiblemente).",
          "De 1 a 2 horas de disponibilidad, dependiendo de la velocidad de escritura del disco local y de la red."
        ],
        steps: [
          "No interrumpa el proceso de inmediato; espere al menos 2 horas, ya que algunas actualizaciones reorganizan profundamente el sistema de archivos (APFS).",
          "Si está completamente bloqueado, fuerce el apagado manteniendo presionado el botón de encendido por 10 segundos.",
          "Reinicie reseteando la NVRAM/PRAM (Mantenga Option + Command + P + R al encender) para borrar configuraciones de arranque defectuosas.",
          "Si el problema persiste, inicie en 'Modo Seguro' (manteniendo Shift) o arranque en 'Modo Recuperación' (Command + R) para reinstalar macOS sin perder datos de usuario."
        ],
        terminal: "diskutil verifyVolume /"
      }
    ,
    category: "OS",
    difficulty: "Intermedio",
    image: "/categories/os.svg",
  }
];