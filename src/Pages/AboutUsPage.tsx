import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

const AboutUsPage = () => {
    return (
        <Container>
            <Row className={'ms-5 mt-4'}>
                <Col>
                    <Link style={{textDecoration: "none", color: "black"}} to={'/'}>Главная</Link>
                    <svg width="30" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path id="Vector" d="M2.09478 0L0.57251 1.41L5.51718 6L0.57251 10.59L2.09478 12L8.57251 6L2.09478 0Z" fill="#8A8C8C"/>
                    </svg>
                    О нас
                </Col>
            </Row>
            <Row style={{fontSize: 32,width: 128, margin: "5px auto 60px auto"}}>
                Команда
            </Row>
            <Row style={{maxWidth: 1020, margin: "0 auto"}} className={'justify-content-between'}>
                <Col style={{maxWidth: 240 }}>
                    <Row>
                        <img style={{maxHeight: 280, borderRadius: 50}} src={require('../images/Kurator.png')} alt={''}/>
                    </Row>
                    <Row style={{fontSize: 32, fontWeight: 600, padding: "20px 12px"}}>
                        Сивцева Екатерина
                    </Row>
                    <Row style={{padding: "0 12px"}}>
                        Куратор
                    </Row>
                </Col>
                <Col style={{maxWidth: 240 }}>
                    <Row>
                        <img style={{maxHeight: 280, borderRadius: 50}} src={require('../images/Varya.png')} alt={''}/>
                    </Row>
                    <Row style={{fontSize: 32, fontWeight: 600, padding: "20px 12px"}}>
                        Амосова Варвара
                    </Row>
                    <Row style={{padding: "0 12px"}}>
                        Тимлид, аналитик
                    </Row>
                </Col>
                <Col style={{maxWidth: 240 }}>
                    <Row>
                        <img style={{maxHeight: 280, borderRadius: 50}} src={require('../images/Lenya.png')} alt={''}/>
                    </Row>
                    <Row style={{fontSize: 32, fontWeight: 600, padding: "20px 12px"}}>
                        Плотницкий Леонид
                    </Row>
                    <Row style={{padding: "0 12px"}}>
                        Аналитик
                    </Row>
                </Col>
            </Row>
            <Row style={{maxWidth: 1020, margin: "90px auto"}} className={'justify-content-between'}>
                <Col style={{maxWidth: 240 }}>
                    <Row>
                        <img style={{maxHeight: 280, borderRadius: 50}} src={require('../images/Artem.png')} alt={''}/>
                    </Row>
                    <Row style={{fontSize: 32, fontWeight: 600, padding: "20px 12px"}}>
                        Виноградов Артём
                    </Row>
                    <Row style={{padding: "0 12px"}}>
                        Backend - разработчик
                    </Row>
                </Col>
                <Col style={{maxWidth: 240 }}>
                    <Row>
                        <img style={{maxHeight: 280, borderRadius: 50}} src={require('../images/Grisha.png')} alt={''}/>
                    </Row>
                    <Row style={{fontSize: 32, fontWeight: 600, padding: "20px 12px"}}>
                        Вторушин Григорий
                    </Row>
                    <Row style={{padding: "0 12px"}}>
                        Frontend - разработчик
                    </Row>
                </Col>
                <Col style={{maxWidth: 240 }}>
                    <Row>
                        <img style={{maxHeight: 280, borderRadius: 50}} src={require('../images/Nastya.png')} alt={''}/>
                    </Row>
                    <Row style={{fontSize: 32, fontWeight: 600, padding: "20px 12px"}}>
                        Черноусова Анастасия
                    </Row>
                    <Row style={{padding: "0 12px"}}>
                        Дизайнер
                    </Row>
                </Col>
            </Row>

        </Container>
    );
};

export default AboutUsPage;