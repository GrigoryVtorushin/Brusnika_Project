import React from 'react';
import {Button, Carousel, Col, Container, Form, Row} from "react-bootstrap";
import {ad, useFavourites, useFavouritesApi, useIsAuth} from "../Store/store";
import {Link} from "react-router-dom";

interface props {
    ad: ad
}

const FavouriteItem = ({ad}: props) => {

    const removeFromFavourites = useFavourites(state => state.removeFromFavourites);
    const {favouritesApi, fetchFavourites, addToFavApi, removeFromFavApi} = useFavouritesApi();
    const {isAuth, token } = useIsAuth();
    return (
        <Container style={{paddingBottom: "20px ", borderBottom: "1px solid #E2E3E3", marginTop: 30}}>
            <Row>
                <Col md={4}>
                    <div className={'d-flex'}>
                        <Form className={'me-2'}>
                            <Form.Check
                                type={"checkbox"}
                                id={String(ad.id)}
                            >
                            </Form.Check>
                        </Form>
                        <Carousel interval={null}>
                            {ad.images.map(image => {
                                return <Carousel.Item>
                                    <img style={{maxWidth: 400,maxHeight: "225px"}} src={image.full} alt={'Фото не загрузилось'}/>
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