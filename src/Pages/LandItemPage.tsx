import React, {useState} from 'react';
import {Button, Carousel, Col, Container, Dropdown, Image, Row} from "react-bootstrap";
import {Link, useLocation} from "react-router-dom";
import {ad, useFavourites, useFavouritesApi, useIsAuth} from "../Store/store";
import {Map, Placemark, YMaps} from "@pbe/react-yandex-maps";
import {contains} from "../Components/LandItem";

const LandItemPage = () => {

    const {favouritesApi, addToFavApi, removeFromFavApi, fetchFavourites} = useFavouritesApi();
    const {favourites, addToFavourites, removeFromFavourites} = useFavourites();
    const {isAuth, token} = useIsAuth();
    const adData: ad = useLocation().state;
    const [isInFav, setIsInFav] = useState(adData.profile.is_favorite)
    // const [isInFav, setIsInFav] = useState(false);
    // if(isAuth){
    //     setIsInFav(favouritesApi.includes(adData))
    // } else {
    //     setIsInFav(favourites.includes(adData))
    // }
    const date = new Date(adData.time * 1000).toLocaleDateString();

    console.log(adData)
    return (
        <>
            <Container id={"body"} className={'mt-4'} >
                <Row className={'ms-5'}>
                    <Col>
                        <Link style={{textDecoration: "none", color: "black"}} to={'/'}>Главная</Link>
                        <svg width="30" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path id="Vector" d="M2.09478 0L0.57251 1.41L5.51718 6L0.57251 10.59L2.09478 12L8.57251 6L2.09478 0Z" fill="#8A8C8C"/>
                        </svg>
                        {adData.title}
                    </Col>
                </Row>

                <Row>
                    <Col xs={11} md={7} >
                        <Row className={'ms-5'}>
                            <h2 style={{fontWeight: "600"}}>{adData.title}</h2>
                            <p>Опубликовано {date}</p>
                        </Row>

                    </Col>
                    <Col xs={7} md={5}>
                        <Row className={'ms-5'}>
                            <h2 style={{fontWeight: "600"}}>{adData.price} </h2>
                            <p>{adData.normalized_price}</p>
                        </Row>

                    </Col>
                </Row>
                <Row>
                    <Col xs={11} md={7}>
                        <Row className={'ms-5'}>
                            <Carousel  interval={null} style={{maxWidth: "636px"}}>
                                {adData.images.map(image => {
                                    return <Carousel.Item >
                                        <Image style={{maxWidth: "636px"}} src={image.full} alt={'Фото не загрузилось'}/>
                                    </Carousel.Item>
                                })}

                            </Carousel>
                        </Row>

                    </Col>
                    <Col xs={7} md={5} >
                        <Row className={'ms-5'}>
                            <Button
                                onClick={() => {
                                    !isAuth && addToFavourites(adData);
                                    isAuth && addToFavApi(adData.id, token);
                                    setIsInFav(true)
                                }}
                                hidden={isInFav} variant={"light"} className={'w-auto mb-3 border-dark border-opacity-25'}>В избранное</Button>
                            <Button
                                onClick={() => {
                                    !isAuth && removeFromFavourites(adData);
                                    isAuth && removeFromFavApi(adData.id, token);
                                    setIsInFav(false)
                                }}
                                hidden={!isInFav} variant={"light"} className={'w-auto mb-3 border-dark border-opacity-25'}>В избранном</Button>
                        </Row>
                        <Row className={'ms-5 mb-3'} style={{fontSize: '30px'}}>
                            {adData.phones}
                        </Row>
                        <Row className={'ms-5'}>
                            <div className={'d-flex '}>
                                <div style={{
                                    background:"#0D47A1",
                                    width: "46px",
                                    height: "46px",
                                    color:"white",
                                    borderRadius:"100%",
                                    fontSize:"32px",
                                    display: "flex",
                                    textAlign: "center",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginRight: "18px"
                                }}>
                                    {adData.agency_name ? adData.agency_name.charAt(0): ""}
                                </div>
                                <div>
                                    <div style={{fontSize: "20px", fontWeight: "600"}}>
                                        {adData.agency_name ? adData.agency_name: "Неизвестный пользователь"}
                                    </div>
                                    <div style={{fontSize: "12px", color: "#8A8C8C"}}>
                                        Частное лицо{}
                                    </div>
                                </div>
                            </div>

                        </Row>
                    </Col>
                </Row>

            </Container>

            <Container className={'mt-4'}>
                <Row>
                    <h2 style={{fontSize:"20px", fontWeight:"600"}}>Расположение</h2>
                    <p>{adData.address}</p>
                </Row>
                <Row>
                    <YMaps>
                        <Map defaultState={{
                            center: [56.8519, 60.6122],
                            zoom: 9,
                        }} width={"770px"} height={'364px'}>
                            <Placemark geometry={[adData.lat, adData.lng]} />
                        </Map>
                    </YMaps>
                </Row>
                <Row className={'mt-3'}>
                    <h2 style={{fontSize:"20px", fontWeight:"600"}}>Описание</h2>
                    <p>{adData.description}</p>
                </Row>
            </Container>
        </>
    );
};

export default LandItemPage;