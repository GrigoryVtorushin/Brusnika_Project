import React from 'react';
import background from '../images/Ekaterinburg.png'
import LandItemList from "../Components/LandItemList";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useAds} from "../Store/store";

const MainPage = ({isLoading} : any) => {

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
                        {/*<div style={{background: "#fff", padding:"5px", borderRadius:"5px", marginLeft: "5px"}}>*/}
                        {/*    <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                        {/*        <g id="Union">*/}
                        {/*            <path d="M13.25 0.5H11.25V2.5H0.25V4.5H11.25V5.5H13.25V0.5Z" fill="#8A8C8C"/>*/}
                        {/*            <path d="M15.25 2.5H20.25V4.5H15.25V2.5Z" fill="#8A8C8C"/>*/}
                        {/*            <path d="M4.25 11.5V10.5H0.25V8.5H4.25V6.5H6.25V11.5H4.25Z" fill="#8A8C8C"/>*/}
                        {/*            <path d="M18.25 14.5H0.25V16.5H18.25V17.5H20.25V12.5H18.25V14.5Z" fill="#8A8C8C"/>*/}
                        {/*            <path d="M20.25 8.5H8.25V10.5H20.25V8.5Z" fill="#8A8C8C"/>*/}
                        {/*        </g>*/}
                        {/*    </svg>*/}
                        {/*</div>*/}




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
                <LandItemList/>
            </div>


        </>
    );
};

export default MainPage;