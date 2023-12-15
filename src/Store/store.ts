import {create} from "zustand";
import {immer} from "zustand/middleware/immer";
import axios from "axios";
import {useQuery} from "react-query";


export type ad = {
    address: string,
    agency_name: string,
    area: number,
    area_unit_type: string,
    description: string,
    id: number,
    images: [
        {
            full: string,
            thumbnail: string
        }
    ],
    is_auction: boolean,
    is_by_homeowner: null,
    lat: number,
    lng: number,
    main_image: object,
    normalized_price: string,
    offer_type: string,
    phones: string[],
    price: string,
    price_rub: number,
    priority: number,
    time: number,
    title: string,
    url:string,
    user_id: number
}

export interface adState {
    ads: ad[],
    page: number,
    totalPages: number,
    totalItems: number,
    fetchAds: (page: number) => void,
    incrementPage: () => void,
    decrementPage: () => void,
    setPage: (pageNumber: number) => void,
}

export const useAds = create<adState>()(immer((set, get) => ({
    ads: [],
    page: 1,
    totalPages: 0,
    totalItems: 0,
    fetchAds: async (page = 0) => {
        const { data } = await axios.get(`https://urfu-project.fufsob.ru/api/get-data?page=${page}`);
        set({ads: data.data})
        set({totalPages: data.total_pages})
        set({totalItems: data.total_items})
    },
    incrementPage: () => {
        set((state) => ({
            page: state.page + 1
        }))
    },
    decrementPage: () => {
        set((state) => ({
            page: state.page - 1
        }))
    },
    setPage: (pageNumber: number) => {
        set((state) => ({
            page: pageNumber
        }))
    }

})));

export const useFavourites = create()(immer((set, get) => ({

})));