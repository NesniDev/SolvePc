// src/store/searchStore.ts
import { atom } from 'nanostores'

export const terminoBusquedaStore = atom('')
export const categoriaActivaStore = atom('')        // ← nuevo
export const filtrosActivosStore  = atom<Record<string, string[]>>({}) // ← nuevo (checkboxes)