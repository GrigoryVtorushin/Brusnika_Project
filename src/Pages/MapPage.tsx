import React, {useState} from 'react';
import MapComponent from "../Components/MapComponent";
import {InputGroup, Form, Button, Container, Row} from "react-bootstrap";
import Filters from "../Components/Filters";
import {useAds} from "../Store/store";

const MapPage = () => {

    const [showFilters, setShowFilters] = useState(false)
    const setSearch = useAds(state => state.setSearch);
    return (
        <Container className={'mt-4'}>
            <Row>
                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="Поиск"
                        aria-label="Поиск"
                        aria-describedby="basic-addon2"
                        onChange={event => setTimeout(() => setSearch(event.target.value), 1000)}
                    />
                    <Button variant="outline-secondary" id="button-addon2" onClick={() => setShowFilters(true)}>
                        Фильтры
                    </Button>
                </InputGroup>

            </Row>

            <Row style={{height: "600px"}}>
                <MapComponent/>
            </Row>

            <Filters show={showFilters} setShow={setShowFilters} />
        </Container>

    );
};

export default MapPage;