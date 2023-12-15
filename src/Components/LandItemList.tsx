import React, {useEffect, useState} from 'react';
import LandItem from "./LandItem";

import {useQuery} from "react-query";
import axios from "axios";
import {ad, useAds} from "../Store/store";
import {Button, Container, Pagination} from "react-bootstrap";


// async function fetchAds() {
//     const { data } = await axios.get(
//         `https://urfu-project.fufsob.ru/api/get-data`
//     );
//     return data;
// }

const LandItemList = () => {
    let page = useAds(state => state.page);
    const incrementPage = useAds(state => state.incrementPage);
    const decrementPage = useAds(state => state.decrementPage);
    const ads:ad[] = useAds(state => state.ads);
    const totalPages = useAds(state => state.totalPages);
    const setPage = useAds(state => state.setPage)
    let pageItems = [];
    for (let i = 1; i <= totalPages; i++){
        pageItems.push(<Pagination.Item onClick={() => setPage(i)} key={i} active={i === page}>{i}</Pagination.Item>)
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

            <Container style={{ display:"flex", justifyContent: "center"}}>
                <Pagination>
                    <Button className={'me-1'} onClick={decrementPage} disabled={!page}>
                        Назад
                    </Button>
                    {pageItems}
                    <Button className={'ms-1'} onClick={incrementPage}>
                        Вперед
                    </Button>
                </Pagination>
            </Container>
        </>
    );
};

export default LandItemList;