
interface Filtros {
  titulo: string;
  opciones: Opcion[];
}

interface Opcion {
  name: string;
  image?: string;
}

export const filtros: Filtros[] = [
  {
    titulo: "Categorías",
    opciones: [{
      name:"Todos",
      image: "/categories/hardware.svg"  
    }, {
      name: "Hardware",
      image: "/categories/hardware.svg"
    }, {
      name: "Software",
      image: "/categories/software.svg"
    }, {
      name: "Network",
      image: "/categories/network.svg"
    }, {
      name: "Performance",
      image: "/categories/performance.svg"
    },{
      name: "OS",
      image: "/categories/os.svg"
    },{
      name: "Virus",
      image: "/categories/virus.svg"
    }]
  },
  {
    titulo: "Ordenar por",
    opciones: [
      {
        name: "Fácil", 
      },
      {
        name: "Difícil", 
      },
      {
        name: "Intermedio", 
      },
    ]
  },
  {
    titulo: "Buscar por",
    opciones: [{
      name: "Error",
    },
    {
      name: "Descripción",
    },
    {
      name: "Solución",
    },
  ]
  },
  {
    titulo: "Sistema operativo",
    opciones: [{
      name: "Windows",
    },
    {
      name: "Linux",
    },
    {
      name: "MacOS",
    },
  ]
  }
];