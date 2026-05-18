import { atom } from 'nanostores';

// Creamos un "átomo" de estado global inicializado como un string vacío
export const terminoBusquedaStore = atom<string>("");