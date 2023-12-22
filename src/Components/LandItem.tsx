import React, {useState} from 'react';
import {Button, Carousel, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {ad, useAds, useFavourites, useFavouritesApi, useIsAuth} from "../Store/store";


interface props {
    adData: ad
}

const LandItem = ({ adData }: props) => {

    const addToFavourites = useFavourites(state => state.addToFavourites);
    const removeFromFavourites = useFavourites(state => state.removeFromFavourites);
    const favourites = useFavourites(state => state.favourites);
    const [isInFav, setIsInFav] = useState(false);
    const {favouritesApi, addToFavApi, removeFromFavApi, fetchFavourites} = useFavouritesApi();
    const {isAuth, token} = useIsAuth();

    const isInFavApi = favouritesApi.includes(adData);

    return (
        <>

           <Container style={{margin: "30px 50px", borderBottom: "1px solid #14191A1F", paddingBottom:"30px"}}>
               <Row>
                   <Col xs={6} md={3}>
                       <div>
                           <Carousel interval={null}>
                               {adData.images.map(image => {
                                   return <Carousel.Item>
                                       <img style={{maxHeight: "225px"}} src={image.full} alt={'Фото не загрузилось'}/>
                                   </Carousel.Item>
                               })}

                           </Carousel>
                       </div>
                   </Col>
                   <Col xs={8} md={6}>
                       <div >
                           <Link to={`/${adData.id}`} state={adData} style={{textDecoration: "none", color: "black"}}>
                               <p style={{fontSize: "20px"}}>{adData.title}</p>
                           </Link>
                           <p style={{fontSize: "24px", fontWeight: "600"}}>{adData.price}</p>
                           <p style={{fontSize: "14px"}}>{adData.address}</p>
                           <p style={{fontSize: "12px",
                               height:'90px', overflow: "hidden", textOverflow: "ellipsis"}}>{adData.description}</p>
                       </div>

                   </Col>
                   <Col xs={6} md={3}>
                        <div>

                            <Button hidden={isInFav} onClick={() => {
                                !isAuth && addToFavourites(adData);
                                isAuth && addToFavApi(adData.id, token);
                                setIsInFav(true);

                            }}>В избранное</Button>
                            <Button hidden={!isInFav} onClick={() => {
                                !isAuth && removeFromFavourites(adData);
                                isAuth && removeFromFavApi(adData.id, token)
                                setIsInFav(false);
                            }}>В избранном</Button>

                            {/*<img src={require("../images/IconLike.png")} alt={'В избранное'}/>*/}
                            <Button style={{marginLeft: "16px"}}>
                                Показать телефон
                            </Button>
                        </div>
                   </Col>
               </Row>
           </Container>

        </>
    );
};

export default LandItem;