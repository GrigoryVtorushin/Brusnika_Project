import React from 'react';
import MainPage from "./Pages/MainPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NavigationBar from "./Components/NavigationBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import FavouritesPage from "./Pages/FavouritesPage";
import ProfilePage from "./Pages/ProfilePage";
const App = () => {
    return (
        <div id={"app"}>
            <BrowserRouter>
                <NavigationBar/>
                <Routes>
                    <Route path={'/'} element={<MainPage/>}/>
                    <Route path={'/favourites'} element={<FavouritesPage/>}/>
                    <Route path={'/profile'} element={<ProfilePage/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;