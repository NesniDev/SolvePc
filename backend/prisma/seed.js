import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('Iniciando el proceso de sembrado de datos (seeding)...')

  // Opcional: Limpiar registros existentes para evitar duplicados si ejecuta el script varias veces
  // await prisma.solution.deleteMany({});

  const solucionWifi = await prisma.solution.create({
    data: {
      title: 'Desconexión frecuente del adaptador WiFi',
      slug: 'desconexion-frecuente-adaptador-wifi',
      description:
        'El sistema pierde la conexión WiFi de forma aleatoria debido a la gestión de energía del adaptador.',
      category: 'redes',
      difficulty: 'Fácil', // Asegúrese de que coincida con los valores de su ENUM
      image: '/categories/trd.svg',
      so: 'windows',

      // Creación relacional anidada (1:1) para el modelo Explain
      explain: {
        create: {
          title: 'Gestión de energía agresiva del hardware',
          description:
            'Windows 11 tiende a suspender adaptadores inalámbricos para ahorrar energía, lo que causa desconexiones. También puede ser provocado por controladores obsoletos o corrupción del stack TCP/IP.',
          photo: '',
          terminal: 'netsh int ip reset && netsh winsock reset',

          // Arreglos de texto nativos de PostgreSQL pasados directamente
          prerequisites: [
            'Acceso a Administrador',
            'Controladores actualizados'
          ],
          steps: [
            'Abrir Administrador de dispositivos',
            "Desmarcar 'Permitir que el equipo apague este dispositivo' en Propiedades del adaptador",
            'Reiniciar el stack de red con comandos netsh'
          ],

          // Creación relacional anidada (1:N) para los errores comunes
          commonErrors: {
            create: [
              {
                code: 'NET_ADAPTER_POWER_OFF',
                label: 'Suspensión selectiva de energía',
                percentage: '60%'
              }
            ]
          }
        }
      }
    }
  })

  console.log(
    `Proceso de seeding completado con éxito. Solución creada con ID: ${solucionWifi.id}`
  )
}

main()
  .catch((e) => {
    console.error('Error detectado durante la ejecución del seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    // Desconexión segura del cliente Prisma
    await prisma.$disconnect()
  })
