import React, {useState} from 'react';
import {Button, Carousel, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {ad, useFavourites, useFavouritesApi, useIsAuth} from "../../Store/store";
import './LandItem.css'
interface props {
    adData: ad
}

export function contains(a: ad[], obj: ad) {
    let i = a.length;
    while (i--) {
        if (a[i].id === obj.id) {
            return true;
        }
    }
    return false;
}

const LandItem = ({ adData }: props) => {

    const addToFavourites = useFavourites(state => state.addToFavourites);
    const removeFromFavourites = useFavourites(state => state.removeFromFavourites);
    const {favouritesApi, addToFavApi, removeFromFavApi} = useFavouritesApi();
    const {isAuth, token} = useIsAuth();
    const [isInFav, setIsInFav] = useState(contains(favouritesApi, adData))

    return (
        <div className={'land-item'}>
           <Container >
               <Row>
                   <Col xs={6} md={3}>
                       <div>
                           <Carousel style={{background: "black"}} interval={null}>
                               {adData.images.map(image => {
                                   return <Carousel.Item >
                                       <div style={{display: "flex", justifyContent: "center"}}>
                                           <img style={{maxHeight: "225px"}} src={image.full} alt={'Фото не загрузилось'}/>
                                       </div>

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
                        <div style={{margin: "0 auto", maxWidth: 130}}>
                            <Button hidden={isInFav} onClick={() => {
                                !isAuth && addToFavourites(adData);
                                isAuth && addToFavApi(adData.id, token);
                                setIsInFav(true)
                            }}>В избранное</Button>
                            <Button hidden={!isInFav} onClick={() => {
                                !isAuth && removeFromFavourites(adData);
                                isAuth && removeFromFavApi(adData.id, token)
                                setIsInFav(false)
                            }}>В избранном</Button>

                            {/*<img src={require("../images/IconLike.png")} alt={'В избранное'}/>*/}
                            {/*<Button style={{marginLeft: "16px"}}>*/}
                            {/*    Показать телефон*/}
                            {/*</Button>*/}
                        </div>
                   </Col>
               </Row>
           </Container>

        </div>
    );
};

export default LandItem;