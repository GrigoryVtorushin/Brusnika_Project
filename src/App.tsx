import React from 'react';
import MainPage from "./Pages/MainPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NavigationBar from "./Components/NavBar/NavigationBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import FavouritesPage from "./Pages/FavouritesPage";
import ProfilePage from "./Pages/ProfilePage";
import LandItemPage from "./Pages/LandItemPage";
import Footer from "./Components/Footer";
import MapPage from "./Pages/MapPage";
import {useAds} from "./Store/store";
import {useQuery} from "react-query";


const App = () => {
  const {page, limit, filter, sort, desc} = useAds();

    const fetchAds = useAds(state => state.fetchAds);
    const {isLoading, isError} = useQuery(['ads', page, limit, sort, filter, desc],
        () => fetchAds(page, limit, sort, filter, desc),
        {keepPreviousData: true});
    const ads = useAds(state => state.ads);

    return (
        <div id={"app"}>
            <div id={'body'}>
                <BrowserRouter>
                    <NavigationBar/>
                    <Routes>
                        <Route path={'/'} element={<MainPage isLoading={isLoading} isError={isError}/>}/>
                        <Route path={'/favourites'} element={<FavouritesPage/>}/>
                        <Route path={'/profile'} element={<ProfilePage/>}/>
                        {ads.map(ad => {
                            return <Route path={`/${ad.id}`} element={<LandItemPage/>} key={ad.id}/>
                        })}
                        <Route path={'/map'} element={<MapPage/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
            <Footer/>
        </div>
    );
};

export default App;