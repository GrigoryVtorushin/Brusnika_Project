import React, {useState} from 'react';
import {Clusterer, Map, Placemark, YMaps} from "@pbe/react-yandex-maps";
import {ad, useAds} from "../Store/store";
import {Button, Carousel, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

const MapComponent = () => {
    const allAds: ad[] = useAds(state => state.allAds)
    const mapData = {
        center: [56.8519, 60.6122],
        zoom: 9,
    };
    const [show, setShow] = useState(false);
    const [index, setIndex] = useState(0);


    return (
        <Container>
            <YMaps>
                {show && <Container style={{
                    width: "40%",
                    height:"100%",
                    maxWidth:"330px",
                    maxHeight: "600px",
                    background: "white",
                    zIndex:"1",
                    position: "absolute",
                    border: "1px solid #8A8C8C",
                    padding: "10px 24px"
                }}>
                    <Row>
                        <div style={{cursor: "pointer"}} className={'d-flex justify-content-end mt-2 mb-3'} onClick={() => setShow(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.00003 3.88891L1.11112 0L9.19424e-06 1.11111L3.88892 5.00002L0 8.88895L1.11111 10.0001L5.00003 6.11113L8.88888 9.99998L9.99999 8.88887L6.11114 5.00002L9.99998 1.11118L8.88887 7.35539e-05L5.00003 3.88891Z" fill="#14191A"/>
                            </svg>
                        </div>
                    </Row>
                    <Row  >

                        { allAds[index].images.length && <div>
                            <Carousel style={{background: "black"}} interval={null}>
                                {allAds[index].images.length && allAds[index].images.map(image => {
                                    return <Carousel.Item >
                                        <div style={{display: "flex", justifyContent: "center"}}>
                                            <img style={{maxHeight: "225px"}} src={image.full} alt={'Фото не загрузилось'}/>
                                        </div>
                                    </Carousel.Item>
                                })}

                            </Carousel>
                        </div>}
                    </Row>
                    <Row className={'mt-2'}>
                        <Col md={10}>
                            {allAds[index].title}
                        </Col>
                        <Col>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="13" viewBox="0 0 15 13" fill="none">
                                <path d="M2.83431 6.62592C2.02412 6.05583 1.5 5.1478 1.5 4.125C1.5 2.39911 2.99238 1 4.83333 1C5.92373 1 6.89185 1.49084 7.5 2.2497C8.10815 1.49084 9.07627 1 10.1667 1C12.0076 1 13.5 2.39911 13.5 4.125C13.5 5.1478 12.9759 6.05583 12.1657 6.62592L7.5 11L2.83431 6.62592Z" stroke="#14191A" stroke-width="1.5"/>
                            </svg>
                        </Col>
                    </Row>
                    <Row style={{fontSize: "20px", fontWeight: "600", marginLeft: "0"}}>
                        {allAds[index].price}
                    </Row>
                    <Row style={{margin: 0}}>
                        {allAds[index].address}
                    </Row>
                    <Row className={'mt-2'}>
                        <Button className={"border"} variant={"light"} >
                            <Link to={`/${allAds[index].id}`} state={allAds[index]} style={{textDecoration: "none", color: "black"}}>
                                Перейти к объявлению
                            </Link>
                        </Button>
                    </Row>
                </Container>}
                <Map defaultState={mapData} width={"100%"} height={'100%'}>

                    <Clusterer
                        options={{
                            preset: "islands#invertedDarkBlueClusterIcons",
                            groupByCoordinates: false,
                        }}
                    >

                        {allAds.map((ad, index) => {
                            return (
                                <Placemark key={index} geometry={[ad.lat, ad.lng]} onClick={() => {
                                    setShow(true);
                                    setIndex(index);
                                }}/>
                            )
                        })}

                    </Clusterer>

                </Map>
            </YMaps>

        </Container>


    );
};

export default MapComponent;