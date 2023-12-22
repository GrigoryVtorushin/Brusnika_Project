import React from 'react';
import background from '../images/Ekaterinburg.png'
import LandItemList from "../Components/LandItemList";
import {Button, Spinner} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useAds} from "../Store/store";

const MainPage = ({isLoading, isError} : any) => {

    const totalItems = useAds(state => state.totalItems);

    return (
        <>
            <div style={{backgroundImage: `url(${background})`,
                height:'328px',
                backgroundPosition: "center",
                backgroundRepeat:"no-repeat" ,
                backgroundSize: "auto"}}
            >
                <div style={{maxWidth: "1000px", margin: "0 auto", paddingTop: "156px"}}>
                    <h1 style={{color: "white", marginBottom: "30px", fontWeight: "600"}}>Продажа земельных участков</h1>
                    <div className="input-group">
                        <input type="text"
                               className="form-control"
                               placeholder="Поиск"
                               aria-label="Поиск"
                               aria-describedby="input-group-button-right"
                        />
                        <Button variant={"light"}>Фильтры</Button>

                    </div>
                </div>
            </div>
            <div style={{margin:"72px 70px"}}>
                <h2 style={{fontWeight:"600"}}>Все предложения</h2>
                <div className={"d-flex "}>
                    Найдено {totalItems} объявлений
                    <div style={{color: "#1565C0", marginLeft:"20px"}}>
                        <img src={require("../images/sortIcon.png")} alt={''}/>
                        Сортировка
                    </div>
                    <Link to={'/map'}>
                        <div style={{color: "#1565C0", marginLeft:"20px"}}>
                            <img style={{marginRight: "5px"}} src={require("../images/onMap.png")} alt={''}/>
                            На карте
                        </div>
                    </Link>

                </div>
            </div>
            <div>
                {isLoading && <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>}
                {!isLoading && !isError && <LandItemList/>}
                {isError && <div>Произошла ошибка загрузки данных.</div>}
            </div>


        </>
    );
};

export default MainPage;