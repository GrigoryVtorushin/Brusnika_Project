import React from 'react';
import {Button, Carousel, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {ad, useAds} from "../Store/store";


interface props {
    adData: ad
}

const LandItem = ({ adData }: props) => {



    return (
        <>
            <Link to={`/${adData.id}`} state={adData} style={{textDecoration: "none", color: "black"}}>
           <Container style={{margin: "30px 50px", borderBottom: "1px solid #14191A1F", paddingBottom:"30px"}}>
               <Row>
                   <Col xs={6} md={3}>
                       <div>
                           <Carousel interval={null}>
                               {adData.images.map(image => {
                                   return <Carousel.Item>
                                       <img style={{maxHeight: "225px"}} src={image.full} alt={'Фото не загрузилось'}/>
                                   </Carousel.Item>
                               })}

                           </Carousel>
                       </div>
                   </Col>
                   <Col xs={8} md={6}>
                       <div >
                           <p style={{fontSize: "20px"}}>{adData.title}</p>
                           <p style={{fontSize: "24px", fontWeight: "600"}}>{adData.price}</p>
                           <p style={{fontSize: "14px"}}>{adData.address}</p>
                           <p style={{fontSize: "12px",
                               height:'110px', overflow: "hidden", textOverflow: "ellipsis"}}>{adData.description}</p>
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
            </Link>
        </>
    );
};

export default LandItem;