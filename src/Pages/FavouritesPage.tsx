import React from 'react';
import {Container, Row, Form, Col, Button} from "react-bootstrap";
import {useFavourites, useFavouritesApi, useIsAuth, useSort} from "../Store/store";
import FavouriteItem from "../Components/FavouriteItem/FavouriteItem";
import {useQuery} from "react-query";

const FavouritesPage = () => {

    const {favourites,  clearFavourites, setFavourites} = useFavourites()
    const {favouritesApi, fetchFavourites, clearFavApi, setFavorites} = useFavouritesApi();
    const {isAuth, token } = useIsAuth();
    const {sortByArea, setSorted, sortByPrice, sortByTime} = useSort();
    useQuery(
        'favourites',
        () => fetchFavourites(token)
    );
    return (
        <Container style={{minHeight: 600}}>

            <Row className={'mt-4 mb-4'}>
                <h1>Избранное</h1>
            </Row>
            <Row xs={"auto"} style={{marginBottom: 20}}>
                <Col>
                    <Form.Select onChange={event => {
                        let value = event.target.value
                        if (value ==="") {
                            setSorted({sorted: value, reversed: false});
                            isAuth && setFavorites(sortByTime(favouritesApi));
                            !isAuth && setFavourites(sortByTime(favourites));
                        }
                        if (value ==="price_up") {
                            setSorted({sorted: value, reversed: false});
                            isAuth && setFavorites(sortByPrice(favouritesApi));
                            !isAuth && setFavourites(sortByPrice(favourites));
                        }
                        if (value ==="price_down") {
                            setSorted({sorted: value, reversed: true});
                            isAuth && setFavorites(sortByPrice(favouritesApi));
                            !isAuth && setFavourites(sortByPrice(favourites));
                        }
                        if (value ==="area_down") {
                            setSorted({sorted: value, reversed: false})
                            isAuth && setFavorites(sortByArea(favouritesApi));
                            !isAuth && setFavourites(sortByArea(favourites));
                        }
                        if (value ==="area_up") {
                            setSorted({sorted: value, reversed: true})
                            isAuth && setFavorites(sortByArea(favouritesApi));
                            !isAuth && setFavourites(sortByArea(favourites));
                        }

                    }} style={{maxWidth: 220, marginLeft:"20px"}} aria-label="Default select example">
                        <option value=''>По умолчанию</option>
                        <option value="price_down">Сначала дешевле</option>
                        <option value="price_up">Сначала дороже</option>
                        <option value="area_down">По возрастанию площади</option>
                        <option value="area_up">По убыванию площади</option>
                    </Form.Select>
                </Col>

                {/*<Col>*/}
                {/*    <Button style={{background: "#0D47A1"}}>*/}
                {/*        Удалить выбранное*/}
                {/*    </Button>*/}
                {/*</Col>*/}
                <Col>
                    <Button onClick={() => {
                        isAuth && clearFavApi(token);
                        !isAuth && clearFavourites();
                        isAuth && fetchFavourites(token);
                    }} >
                        Очистить избранное
                    </Button>
                </Col>
            </Row>
            <div style={{fontSize: 30}} hidden={isAuth ? Boolean(favouritesApi.length): Boolean(favourites.length)}>
                Ваше избранное пусто
            </div>
            <Row>
                {!isAuth && favourites.map(ad => <FavouriteItem ad={ad}/>)}
                {isAuth && favouritesApi.map(ad => <FavouriteItem ad={ad}/>)}
            </Row>

        </Container>
    );
};

export default FavouritesPage;