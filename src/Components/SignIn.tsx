import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';
import axios from "axios";
import {useIsAuth} from "../Store/store";
import SignUp from "./SignUp";
const SignIn = () => {

    const { Formik } = formik;

    const [needRegister, setNeedRegister] = useState(false)

    const { setIsAuth, setToken, fetchProfile} = useIsAuth();
    const schema = yup.object().shape({
        username: yup.string().required(),
        password: yup.string().required(),
    });



    return (
        <>
            { !needRegister &&
                <div style={{maxWidth: "400px", margin: "100px auto"}}>
                    <h1 style={{marginBottom: "30px"}}>Вход</h1>
                    <Formik
                        validationSchema={schema}
                        initialValues={{
                            username: '',
                            password: '',
                        }}
                        onSubmit={values => {
                            axios.post('https://urfu-project.fufsob.ru/api/login', null, { params:{
                                    username: values.username,
                                    password: values.password,
                                }})
                                .then(function (response){
                                    setIsAuth(true);
                                    setToken(response.data.token);
                                    fetchProfile(response.data.token);
                                    console.log(response.data.token)
                                })
                                .catch(function (error){
                                    console.log(error);
                                })
                            console.log(values)
                        }}>
                        {({ handleSubmit, handleChange, values, errors }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                <Row className="mb-3">
                                    <Form.Group controlId="validationFormikUsername">
                                        <Form.Label>Логин</Form.Label>
                                        <InputGroup hasValidation>
                                            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                            <Form.Control
                                                type="text"
                                                placeholder="Логин"
                                                aria-describedby="inputGroupPrepend"
                                                name="username"
                                                value={values.username}
                                                onChange={handleChange}
                                                isInvalid={!!errors.username}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.username}
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
                                </Row>
                                <Row className={'mb-3'}>
                                    <Form.Group controlId="validationFormikPassword">
                                        <Form.Label>Пароль</Form.Label>
                                        <InputGroup hasValidation>
                                            <Form.Control
                                                type="password"
                                                placeholder="Пароль"
                                                aria-describedby="passwordHelpBlock"
                                                name="password"
                                                value={values.password}
                                                onChange={handleChange}
                                                isInvalid={!!errors.password}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.password}
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
                                </Row>
                                <Button type="submit">Войти</Button>
                                <div style={{cursor: "pointer"}} onClick={() => setNeedRegister(true)} className={'mt-3'}>
                                    Нет аккаунта? - Зарегистрируйтесь!
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            }
            {
                needRegister && <SignUp needRegister={needRegister} setNeedRegister={setNeedRegister} />
            }
        </>


    );
};

export default SignIn;