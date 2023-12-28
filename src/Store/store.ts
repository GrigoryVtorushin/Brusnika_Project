import {create} from "zustand";
import {immer} from "zustand/middleware/immer";
import axios from "axios";
import {persist} from "zustand/middleware";


export type ad = {
    address: string,
    agency_name: string,
    cadastral_number: string | null
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
    user_id: number,
    profile: {
        is_favorite: boolean
    }
}

export interface adState {
    ads: ad[],
    allAds: ad[],
    page: number,
    limit: number,
    totalPages: number,
    totalItems: number,
    sort: string,
    filter: string,
    desc: boolean,
    fetchAds: (page: number, limit: number, sort: string, filter: string, desc: boolean) => void,
    incrementPage: () => void,
    decrementPage: () => void,
    setPage: (pageNumber: number) => void,
    setLimit: (limitNumber: number) => void,
    setSort: (sort: string) => void,
    setFilter: (filter: string) => void,
    setDesc: (desc: boolean) => void,
    setAds: (adsCopy: ad[]) => void,
}

export interface favouritesState {
    favourites: ad[],
    addToFavourites: (ad: ad) => void,
    removeFromFavourites: (ad: ad) => void,
    clearFavourites: () => void,
}

export interface profile {
    id: number,
    first_name: string,
    last_name: string,
    middle_name: string,
    phone: string,
    username: string,
}
export interface isAuthState {
    isAuth: boolean,
    token: string,
    setToken: (t: string) => void,
    setIsAuth: (bool: boolean) => void,
    profile: profile,
    fetchProfile: (token: string) => void
}

export interface favoritesApiState {
    favouritesApi: ad[],
    fetchFavourites: (token: string) => void,
    addToFavApi: (id: number, token: string) => void,
    removeFromFavApi: (id: number, token: string) => void,
    clearFavApi: (token: string) => void,
    setFavorites: (favs: ad[]) => void
}

export interface sortState {
    sorted: {
        sorted: string,
        reversed: boolean
    },
    setSorted: (params: {sorted: string, reversed: boolean}) => void,
    sortByPrice: (ads: ad[]) => ad[],
    sortByArea: (ads: ad[]) => ad[],
    sortByTime: (ads: ad[]) => ad[],
}

export const useAds = create<adState>()(immer((set, get) => ({
    ads: [],
    allAds: [],
    page: 1,
    limit: 25,
    totalPages: 0,
    totalItems: 0,
    sort: 'time',
    filter: '',
    desc: true,
    fetchAds: async (page = 0, limit = 25, sort: string = 'time', filter: string = '', desc: boolean = true, ) => {
        const {data} = await axios.get(`https://urfu-project.fufsob.ru/api/get-data?limit=${limit}&page=${page}&sort=${sort}&filter=${filter}&desc=${desc}`);
        const allData = await axios.get(`https://urfu-project.fufsob.ru/api/get-data?page=${0}&limit=${-1}&sort=${sort}&filter=${filter}&desc=${desc}`)
        set({ads: data.data})
        set({totalPages: data.total_pages})
        set({totalItems: data.total_items})
        set({allAds: allData.data.data})

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
    },
    setLimit: (limitNumber) =>{
        set((state) => ({
            limit: limitNumber
        }))
    },
    setSort: (sort: string) =>{
        set((state) => ({
            sort: sort
        }))
    },
    setFilter: (filter: string) =>{
        set((state) => ({
            filter: filter
        }))
    },
    setDesc: (desc: boolean) =>{
        set((state) => ({
            desc: desc
        }))
    },
    setAds: (adsCopy: ad[]) => {
        set((state) => ({
            ads: adsCopy
        }))
    }

})));

export const useFavourites = create<favouritesState>()(persist(immer((set, get) => ({
    favourites: [],
    addToFavourites: (ad: ad) => {
        set((state) => {
            const index = state.favourites.findIndex((elem) => elem.id === ad.id);
            if (index < 0) return { favourites: [...state.favourites, ad] }
            const newItems = state.favourites.slice();
            return { favourites: newItems }
        });
    },

    removeFromFavourites: (ad: ad) => {
        set((state) => {
            const index = state.favourites.findIndex((elem) => elem.id === ad.id);
            if (index < 0) return {};
            const newItems = state.favourites.slice();
            newItems.splice(index, 1);
            return { favourites: newItems }
        })
    },
    clearFavourites: () => set({favourites: []}),


})), {name: 'favouritesStore', version: 1}));

export const useFavouritesApi = create<favoritesApiState>()(immer((set, get) => ({
    favouritesApi: [],
    fetchFavourites: async (token: string) => {
        const { data } = await axios.get(`https://urfu-project.fufsob.ru/api/get-favorites?token=${token}`);
        set({favouritesApi: data.data})
    },
    addToFavApi: async (id: number, token: string) => {
        await axios.post(`https://urfu-project.fufsob.ru/api/add-favorite?offer_id=${id}&token=${token}`)
    },
    removeFromFavApi: async (id: number, token: string) => {
        await axios.post(`https://urfu-project.fufsob.ru/api/remove-favorite?offer_id=${id}&token=${token}`);
    },
    clearFavApi: async (token: string) => {
        await axios.post(`https://urfu-project.fufsob.ru/api/clear-favorites?token=${token}`)
    },
    setFavorites: (favs: ad[]) => {
        set((state) => ({
            favouritesApi: favs
        }))
    }

})))


export const useIsAuth = create<isAuthState>()(persist(immer((set, get) => ({
    token: '',
    setToken: (t) => set({token: t}),
    isAuth: false,
    setIsAuth: (bool) => set({isAuth: bool}),
    profile: {
        id: 0,
        first_name: '',
        last_name: '',
        middle_name: '',
        phone: '',
        username: '',
    },
    fetchProfile: async (token: string) => {
        const { data } = await axios.get(`https://urfu-project.fufsob.ru/api/profile?token=${token}`);
        set({profile: data.profile})
    }
})), {name: 'isAuthStore', version: 1}));


export const useSort = create<sortState>()(immer((set, get) => ({
    sorted: {sorted: '', reversed: false},
    setSorted: (params: {sorted: string, reversed: boolean}) => {
        set((state) => ({
            sorted: params
        }));
    },

    sortByPrice: (ads: ad[]) => {
        const sortedAds = [...ads];
        sortedAds.sort((ad1, ad2) => {
            if (useSort.getState().sorted.reversed) {
                return ad1.price_rub - ad2.price_rub;
            }
            return ad2.price_rub - ad1.price_rub;
        });
        return sortedAds;
    },

    sortByArea: (ads: ad[]) => {
        const sortedAds = [...ads];
        sortedAds.sort((ad1, ad2) => {
            if (useSort.getState().sorted.reversed) {
                return ad1.area - ad2.area;
            }
            return ad2.area - ad1.area;
        });
        return sortedAds
    },

    sortByTime: (ads: ad[]) => {
        const sortedAds = [...ads];
        sortedAds.sort((ad1, ad2) => {
            if (useSort.getState().sorted.reversed) {
                return ad1.time - ad2.time;
            }
            return ad2.time - ad1.time;
        });
        return sortedAds
    },
})));
export const useFilter = create()(immer((set, get) => ({

})));