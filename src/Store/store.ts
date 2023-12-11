import {create} from "zustand";
import {immer} from "zustand/middleware/immer";


export const useItems = create()(immer((set, get) => ({

})));

export const useFavourites = create()(immer((set, get) => ({

})));