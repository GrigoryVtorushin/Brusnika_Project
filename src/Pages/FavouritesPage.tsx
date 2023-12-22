import React from 'react';
import {Container, Row, Form, Col, Button} from "react-bootstrap";
import {useFavourites, useFavouritesApi, useIsAuth} from "../Store/store";
import LandItem from "../Components/LandItem";
import FavouriteItem from "../Components/FavouriteItem";
import {useQuery} from "react-query";

const FavouritesPage = () => {

    const {favourites, addToFavourites, removeFromFavourites, clearFavourites} = useFavourites()
    const {favouritesApi, fetchFavourites, addToFavApi, removeFromFavApi, clearFavApi} = useFavouritesApi();
    const {isAuth, token } = useIsAuth();

    const {isLoading, isError} = useQuery(
        'favourites',
        () => fetchFavourites(token)
    );
    return (
        <Container>
            <Row>
                <h1>Избранное</h1>
            </Row>
            <Row xs={"auto"}>
                <Col>
                    <Form>
                        <Form.Check
                            type={"checkbox"}
                            id={'default-checkbox'}
                            label={`${isAuth ? favouritesApi.length: favourites.length} объявлений`}
                        >
                        </Form.Check>
                    </Form>
                </Col>
                <Col>
                    <Form.Select aria-label="Default select example">
                        <option value="1">По умолчанию</option>
                        <option value="2">Сначала дешевле</option>
                        <option value="3">Сначала дороже</option>
                        <option value="4">По возрастанию площади</option>
                        <option value="5">По убыванию площади</option>
                    </Form.Select>
                </Col>
                <Col>
                    <Button style={{background:"#0D47A1"}}>
                        Показать на карте
                    </Button>
                </Col>
                <Col>
                    <Button style={{background: "#0D47A1"}}>
                        Удалить выбранное
                    </Button>
                </Col>
                <Col>
                    <Button onClick={() => {
                        isAuth && clearFavApi(token);
                        !isAuth && clearFavourites();
                        isAuth && fetchFavourites(token);
                    }} style={{background: "#0D47A1"}}>
                        Очистить избранное
                    </Button>
                </Col>
            </Row>
            <Row>
                {!isAuth && favourites.map(ad => <FavouriteItem ad={ad}/>)}
                {isAuth && favouritesApi.map(ad => <FavouriteItem ad={ad}/>)}
            </Row>

        </Container>
    );
};

export default FavouritesPage;