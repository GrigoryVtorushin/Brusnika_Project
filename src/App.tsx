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
import AboutUsPage from "./Pages/AboutUsPage";


const App = () => {
  const {page, limit, filter, sort, desc, search} = useAds();

    const fetchAds = useAds(state => state.fetchAds);
    const {isLoading, isError} = useQuery(['ads', page, limit, sort, filter, desc, search],
        () => fetchAds(page, limit, sort, filter, desc, search),
        {keepPreviousData: true});
    const allAds = useAds(state => state.allAds);

    return (
        <div id={"app"}>
            <div id={'body'}>
                <BrowserRouter>
                    <NavigationBar/>
                    <Routes>
                        <Route path={'/'} element={<MainPage isLoading={isLoading} isError={isError}/>}/>
                        <Route path={'/about'} element={<AboutUsPage/>}/>
                        <Route path={'/favourites'} element={<FavouritesPage/>}/>
                        <Route path={'/profile'} element={<ProfilePage/>}/>
                        {allAds.map(ad => {
                            return <Route path={`/${ad.id}`} element={<LandItemPage id={ad.id}/>} key={ad.id}/>
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