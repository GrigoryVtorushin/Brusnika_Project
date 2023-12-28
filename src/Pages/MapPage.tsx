import React, {useState} from 'react';
import MapComponent from "../Components/MapComponent";
import {InputGroup, Form, Button, Container, Row, Col} from "react-bootstrap";
import {ad} from "../Store/store";
import Filters from "../Components/Filters";

const MapPage = () => {

    const [showFilters, setShowFilters] = useState(false)

    return (
        <Container className={'mt-4'}>
            <Row>
                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="Поиск"
                        aria-label="Поиск"
                        aria-describedby="basic-addon2"
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