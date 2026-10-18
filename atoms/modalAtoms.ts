
import { atom } from "jotai";
import type { DocumentData } from "firebase/firestore";
import type { Movie } from "../typings";

export const modalState = atom(false);

export const movieState = atom<Movie | DocumentData | null>(null);
