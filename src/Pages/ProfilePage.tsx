import React, {useState} from 'react';
import SignIn from "../Components/SignIn";
import {useIsAuth} from "../Store/store";
import Button from "react-bootstrap/Button";
import {Container, FloatingLabel} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import {useQuery} from "react-query";



const ProfilePage = () => {

    const {isAuth, setIsAuth, token, setToken, profile, fetchProfile} = useIsAuth();

    const { isLoading, isError} = useQuery(
        'profile',
        () => fetchProfile(token));

    return (
        <div>
            {!isAuth && <SignIn/>}
            {isAuth && <Container>
                <Row style={{margin: "30px 0"}}>
                    <h1 style={{fontSize: 32, fontWeight: 600, color:"#528FDF"}}>
                        Личный кабинет
                    </h1>
                </Row>
                <Row style={{marginBottom: 50}}>
                    <div className={'d-flex '}>
                        <div style={{
                            background:"#0D47A1",
                            width: "70px",
                            height: "70px",
                            color:"white",
                            borderRadius:"100%",
                            fontSize:"40px",
                            display: "flex",
                            textAlign: "center",
                            justifyContent: "center",
                            alignItems: "center",
                            marginRight: "18px"
                        }}>
                            В
                        </div>
                        <div style={{
                            fontSize: 32,
                            fontWeight: 600,
                            paddingTop: 10
                        }}>
                            {profile.last_name} {profile.first_name} {profile.middle_name}
                        </div>
                    </div>
                </Row>
                <div style={{fontSize: 24, fontWeight: 600, marginBottom: 20}}>
                    Личная информация
                </div>
                <Row style={{marginBottom: 50}}>
                    <Col>
                        <FloatingLabel label={'Фамилия'}>
                            <Form.Control disabled={true} type="text" value={profile.last_name} />
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel label={'Имя'}>
                            <Form.Control disabled={true} type="text" value={profile.first_name} />
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel label={'Отчество'}>
                            <Form.Control disabled={true} type="text" value={profile.middle_name} />
                        </FloatingLabel>
                    </Col>
                </Row>
                <div style={{fontSize: 24, fontWeight: 600, marginBottom: 20}}>
                    Контактная информация
                </div>
                <Row style={{marginBottom: 30}}>
                    <Col md={4}>
                        <FloatingLabel label={'Номер телефона'}>
                            <Form.Control disabled={true} type="text" value={profile.phone}/>
                        </FloatingLabel>
                    </Col>
                    <Col md={4}>
                        <FloatingLabel label={'Имя пользователя'}>
                            <Form.Control disabled={true} type="text" value={profile.username}/>
                        </FloatingLabel>
                    </Col>
                </Row>
                <div className={' d-flex justify-content-end'}>
                    <Button style={{maxWidth: 240}} variant={"outline-danger"} onClick={() => {
                        setIsAuth(false);
                        setToken('');
                    }}>
                        Выйти из личного кабинета
                    </Button>
                </div>

            </Container>}
        </div>
    );
};

export default ProfilePage;