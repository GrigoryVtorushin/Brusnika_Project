import React from 'react';
import LandItem from "./LandItem/LandItem";
import {useAds, useFavouritesApi, useIsAuth} from "../Store/store";
import {Container, Pagination} from "react-bootstrap";
import {useQuery} from "react-query";



const LandItemList = () => {

    const {page, ads, totalPages, setPage} = useAds();
    const {fetchFavourites} = useFavouritesApi();
    const {token} = useIsAuth();
    useQuery(
        'favourites',
        () => fetchFavourites(token)
    );
    let pageItems = [];
    for (let i = 1; i <= totalPages; i++){
        pageItems.push(<Pagination.Item  onClick={() => {
            setPage(i);
            window.scrollTo(0, 250);

        }
        } key={i} active={i === page}>{i}</Pagination.Item>)
    }

    return (
        <>
            {ads.map(ad =>{

                return <LandItem
                    adData={ad}
                    key={ad.id}
                />
            }

            )}

            <Container style={{ display:"flex", justifyContent: "center", marginTop: 50}}>
                <Pagination>
                    {/*<Button variant={"dark"} className={'me-1'} onClick={decrementPage} disabled={!page}>*/}
                    {/*    Назад*/}
                    {/*</Button>*/}
                    {pageItems}
                    {/*<Button variant={"dark"} className={'ms-1'} onClick={incrementPage}>*/}
                    {/*    Вперед*/}
                    {/*</Button>*/}
                </Pagination>
            </Container>
        </>
    );
};

export default LandItemList;