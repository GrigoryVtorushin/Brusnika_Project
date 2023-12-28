import React, {useState} from 'react';
import {Container, Modal, ToggleButton, ToggleButtonGroup} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import {useAds} from "../Store/store";



const Filters = ({show, setShow}: any) => {

    const [value, setValue] = useState([]);
    const {setFilter} = useAds();
    const [filters, setFilters] = useState({
        price_from: 0,
        price_to: 0,
        area_from: 0,
        area_to: 0,
        seller: '',
        published: ''
    });
    let str = '';
    const handleChange = (val: any) => {
        setValue(val);
        if (val.length === 1){
            setFilters({...filters, seller: val[0]});
        } else {
            setFilters({...filters, seller: ''});
        }
    }

    return (
        <Modal show={show} onHide={() => setShow(false)} size={"lg"} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    Фильтры
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row className={'mb-4'}>
                        <Col md={4}>
                            Цена
                        </Col>
                        <Col>
                            <Row className={'align-items-center'}>
                                <InputGroup style={{maxWidth: 360}}>
                                    <Form.Control value={filters.price_from !== 0 ? filters.price_from : ''} onChange={event => {
                                        setFilters({...filters, price_from: Number(event.target.value)})
                                    }} placeholder={'от'}/>
                                    <Form.Control value={filters.price_to !== 0 ? filters.price_to : ''} onChange={event => {
                                        setFilters({...filters, price_to: Number(event.target.value)})
                                    }} placeholder={'до'}/>
                                </InputGroup>
                                руб
                            </Row>
                        </Col>
                    </Row>
                    <Row className={'mb-4'}>
                        <Col md={4}>
                            Площадь участка
                        </Col>
                        <Col>
                            <Row className={'align-items-center'}>
                                <InputGroup style={{maxWidth: 240}}>
                                    <Form.Control value={filters.area_from !== 0 ? filters.area_from : ''} onChange={event => {
                                        setFilters({...filters, area_from: Number(event.target.value)})
                                    }} placeholder={'от'}/>
                                    <Form.Control value={filters.area_to !== 0 ? filters.area_to : ''} onChange={event => {
                                        setFilters({...filters, area_to: Number(event.target.value)})
                                    }} placeholder={'до'}/>
                                </InputGroup>
                                сот
                            </Row>
                        </Col>
                    </Row>
                    <Row className={'mb-4'}>
                        <Col md={4}>
                            Продавец
                        </Col>
                        <Col>
                            <ToggleButtonGroup type="checkbox" value={value} onChange={handleChange}>
                                <ToggleButton variant={"outline-secondary"} className={'me-2 rounded-3'} id="tbg-btn-2" value={'owner'}>
                                    Собственник
                                </ToggleButton>
                                <ToggleButton variant={"outline-secondary"} className={'me-2 rounded-3'} id="tbg-btn-3" value={'agency'}>
                                    Застройщик
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Col>
                    </Row>
                    <Row className={'mb-4'}>
                        <Col md={4}>
                            Дата публикации
                        </Col>
                        <Col>
                            <Form.Select value={filters.published} style={{maxWidth: 140}} onChange={event => {
                                if (event.target.value !== '')
                                    setFilters({...filters, published: event.target.value})
                            }}>
                                <option value={''}>Неважно</option>
                                <option value={'month'}>За месяц</option>
                                <option value={'week'}>За неделю</option>
                                <option value={'day'}>За сегодня</option>
                                <option value={'hour'}>За час</option>
                            </Form.Select>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => {
                    setValue([]);
                    setFilters({
                        price_from: 0,
                        price_to: 0,
                        area_from: 0,
                        area_to: 0,
                        seller: '',
                        published: ''
                    });
                    setFilter('');
                }}>
                    Сбросить фильтры
                </Button>
                <Button type={"submit"} variant="primary" onClick={() => {
                    for (let [k, v] of Object.entries(filters)){
                        if(v !== '' && v !== 0) str += `${k}:${v},`
                    }
                    setShow(false);
                    setFilter(str);
                }}>
                    Показать объекты
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Filters;