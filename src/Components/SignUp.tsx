import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';
import axios from "axios";
import {useIsAuth} from "../Store/store";

const SignUp = ({setNeedRegister}: any) => {
    const { Formik } = formik;
    const {setIsAuth, setToken, fetchProfile} = useIsAuth();
    const schema = yup.object().shape({
        first_name: yup.string().required(),
        last_name: yup.string().required(),
        middle_name: yup.string().required(),
        username: yup.string().required(),
        phone: yup.string().required(),
        password: yup.string().required(),
    });

    return (
        <div style={{maxWidth: "1000px", margin:"100px auto"}}>
            <h1 style={{marginBottom: "30px"}}>Регистрация</h1>
            <Formik
                validationSchema={schema}
                onSubmit={values => {
                    axios.post('https://urfu-project.fufsob.ru/api/register', null, { params:{
                        username: values.username,
                        password: values.password,
                        phone: values.phone,
                        last_name: values.last_name,
                        first_name: values.first_name,
                        middle_name: values.middle_name,
                    }})
                        .then(function (response){
                            setToken(response.data.token)
                            setIsAuth(true);
                            fetchProfile(response.data.token);
                        })
                        .catch(function (error){
                            console.log(error)
                        })
                    console.log(values)
                }}
                initialValues={{
                    first_name: '',
                    last_name: '',
                    middle_name: '',
                    username: '',
                    phone: '+7',
                    password: '',
                }}
            >
                {({ handleSubmit, handleChange, values, touched, errors }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="4" controlId="validationFormik01">
                                <Form.Label>Имя</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="first_name"
                                    value={values.first_name}
                                    onChange={handleChange}
                                    isValid={touched.first_name && !errors.first_name}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationFormik02">
                                <Form.Label>Фамилия</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="last_name"
                                    value={values.last_name}
                                    onChange={handleChange}
                                    isValid={touched.last_name && !errors.last_name}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationFormik03">
                                <Form.Label>Отчество</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="middle_name"
                                    value={values.middle_name}
                                    onChange={handleChange}
                                    isValid={touched.middle_name && !errors.middle_name}
                                />
                            </Form.Group>

                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="4" controlId="validationFormikUsername">
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
                            <Form.Group as={Col} md="4" controlId="validationFormikPhone">
                                <Form.Label>Телефон</Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control
                                        type="text"
                                        placeholder="Телефон"
                                        aria-describedby="inputGroupPrepend"
                                        name="phone"
                                        value={values.phone}
                                        onChange={handleChange}
                                        isInvalid={!!errors.phone}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.phone}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Row>
                        <Row className={'mb-3'}>
                            <Form.Group as={Col} md="4" controlId="validationFormikPassword">
                                <Form.Label>Пароль</Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control
                                        type="password"
                                        placeholder="Пароль"
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

                        <Button type="submit">Зарегистрироваться</Button>

                        <div style={{cursor: "pointer", marginTop: 10}} onClick={() => setNeedRegister(false)}>
                            Уже есть аккаунт? - Войти
                        </div>
                    </Form>
                )}
            </Formik>
        </div>

    );
};

export default SignUp;