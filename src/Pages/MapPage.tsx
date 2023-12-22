import React from 'react';
import MapComponent from "../Components/MapComponent";
import {InputGroup, Form, Button, Container, Row, Col} from "react-bootstrap";

const MapPage = () => {
    return (
        <Container className={'mt-4'}>
            <Row>
                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="Поиск"
                        aria-label="Поиск"
                        aria-describedby="basic-addon2"
                    />
                    <Button variant="outline-secondary" id="button-addon2">
                        Фильтры
                    </Button>
                </InputGroup>

            </Row>

            <Row style={{height: "600px"}}>
                <MapComponent />
            </Row>
        </Container>

    );
};

export default MapPage;