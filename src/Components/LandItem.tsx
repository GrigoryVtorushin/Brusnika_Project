import React from 'react';
import {Button, Carousel, Col, Container, Row} from "react-bootstrap";

const LandItem = () => {
    return (
        <>
           <Container style={{margin: "30px 50px", borderBottom: "1px solid #14191A1F", paddingBottom:"30px"}}>
               <Row>
                   <Col xs={6} md={3}>
                       <div>
                           <Carousel interval={null}>
                               <Carousel.Item>
                                    <img style={{maxHeight: "225px"}} src={require("../images/photo.png")} alt={'Фото не загрузилось'}/>

                               </Carousel.Item>
                               <Carousel.Item>
                                   <img style={{maxHeight: "225px", borderRadius: "5px"}} src={require("../images/photo.png")} alt={'Фото не загрузилось'}/>

                               </Carousel.Item>
                               <Carousel.Item>
                                   <img style={{maxHeight: "225px", borderRadius: "5px"}} src={require("../images/photo.png")} alt={'Фото не загрузилось'}/>

                               </Carousel.Item>
                           </Carousel>
                       </div>
                   </Col>
                   <Col xs={8} md={6}>
                       <div >
                           <p style={{fontSize: "20px"}}>Участок, 30.1 сот.{}</p>
                           <p style={{fontSize: "24px", fontWeight: "600"}}>800 000 руб.{}</p>
                           <p style={{fontSize: "14px"}}>Свердловская область, Сысертский район</p>
                           <p style={{fontSize: "12px"}}>Продается участок в КП Кадниково 11.01 сот. Коттеджный поселок Кадниково - это поселок,
                               расположенный в Сысертском районе, рядом с селом Кадниково и загородным комплексом ''Белая лошадь'',
                               в 40 км от Екатеринбурга. С точки зрения экологии это самое лучшее место на Урале, поблизости нет тяжелого...</p>
                       </div>

                   </Col>
                   <Col xs={6} md={3}>
                        <div>
                            <img src={require("../images/IconLike.png")} alt={'В избранное'}/>
                            <Button style={{background: "#0D47A1", borderRadius: "20px", marginLeft: "16px"}}>
                                Показать телефон
                            </Button>
                        </div>
                   </Col>
               </Row>
           </Container>
        </>
    );
};

export default LandItem;