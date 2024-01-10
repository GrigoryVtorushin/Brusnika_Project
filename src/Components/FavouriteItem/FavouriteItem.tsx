import React from 'react';
import {Button, Carousel, Col, Container, Row} from "react-bootstrap";
import {ad, useFavourites, useFavouritesApi, useIsAuth} from "../../Store/store";
import {Link} from "react-router-dom";
import './FavouriteItem.css'

interface props {
    ad: ad
}

const FavouriteItem = ({ad}: props) => {

    const removeFromFavourites = useFavourites(state => state.removeFromFavourites);
    const { fetchFavourites, removeFromFavApi} = useFavouritesApi();
    const {isAuth, token } = useIsAuth();
    return (
        <Container className={'fav-item'} >
            <Row>
                <Col md={4}>
                    <div>
                        {/*<Form className={'me-2'}>*/}
                        {/*    <Form.Check*/}
                        {/*        type={"checkbox"}*/}
                        {/*        id={String(ad.id)}*/}
                        {/*    >*/}
                        {/*    </Form.Check>*/}
                        {/*</Form>*/}
                        <Carousel style={{background: "black"}} interval={null}>
                            {ad.images.map(image => {
                                return <Carousel.Item>
                                    <div style={{display: "flex", justifyContent: "center"}}>
                                        <img style={{maxHeight: "225px"}} src={image.full} alt={'Фото не загрузилось'}/>
                                    </div>
                                </Carousel.Item>
                            })}

                        </Carousel>
                    </div>
                </Col>

                <Col md={6}>
                    <div >
                        <Link to={`/${ad.id}`} state={ad} style={{textDecoration: "none", color: "black"}}>
                            <p style={{fontSize: "20px"}}>{ad.title}</p>
                        </Link>
                        <p style={{fontSize: "24px", fontWeight: "600"}}>{ad.price}</p>
                        <p style={{fontSize: "14px"}}>{ad.address}</p>
                        <p style={{fontSize: "12px",
                            height:'90px', overflow: "hidden", textOverflow: "ellipsis"}}>{ad.description}</p>
                    </div>
                </Col>
                <Col>
                    <Button onClick={() => {
                        !isAuth && removeFromFavourites(ad);
                        isAuth && removeFromFavApi(ad.id, token);
                        isAuth && fetchFavourites(token)
                    }}>
                        Удалить
                    </Button>
                </Col>
            </Row>

        </Container>
    );
};

export default FavouriteItem;