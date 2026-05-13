export interface Solutions {
  title: string;
  slug: string;
  description: string;
  category: "OS" | "Red" | "Rendimiento" | "Virus" | "Hardware" | "Software";
  difficulty: "Fácil" | "Intermedio" | "Avanzado";
  image: string;
  explain: Explain;
}

export interface Explain {
  title: string;
  description: string;
  photo: string;
  prerequisites: string[];
  steps: string[];
  terminal: string;
}

