import React, {useEffect, useState} from 'react';
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
    const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/
    const { Formik } = formik;
    const {setIsAuth, setToken, fetchProfile} = useIsAuth();
    const schema = yup.object().shape({
        firstName: yup.string().required('Это обязательное поле').min(1),
        lastName: yup.string().required('Это обязательное поле'),
        middleName: yup.string(),
        username: yup.string().required('Это обязательное поле'),
        phone: yup.string()
            .required('Это обязательное поле').matches(phoneRegExp, "Неправильный номер телефона"),
        password: yup.string().required('Это обязательное поле'),
    });

    const [query, setQuery] = useState("");
    const [displayMessage, setDisplayMessage] = useState("");
    const[usernameError, setUsernameError] = useState('');
    useEffect(() => {
        const timeOutId = setTimeout(async () => {
            setDisplayMessage(query);
            const { data } = await axios.get(`https://urfu-project.fufsob.ru/api/username-exists?username=${query}`);
            if (data.status === "ok"){
                setUsernameError('Это имя пользователя уже занято')
            } else if (query === ''){
                setUsernameError('Это обязательное поле')
            } else {
                setUsernameError('')
            }
        }, 1000);
        return () => clearTimeout(timeOutId);
    }, [query]);



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
                        last_name: values.lastName,
                        first_name: values.firstName,
                        middle_name: values.middleName,
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
                    firstName: '',
                    lastName: '',
                    middleName: '',
                    username: '',
                    phone: "+7",
                    password: '',
                }}
            >
                {({ handleSubmit, handleChange, values, touched, errors }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="4" controlId="validationFormik01">
                                <Form.Label>Имя</Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control
                                        type="text"
                                        name="firstName"
                                        value={values.firstName}
                                        onChange={handleChange}
                                        isValid={touched.firstName && !errors.firstName}
                                        isInvalid={!!errors.firstName}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.firstName}
                                    </Form.Control.Feedback>
                                </InputGroup>

                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationFormik02">
                                <Form.Label>Фамилия</Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control
                                        type="text"
                                        name="lastName"
                                        value={values.lastName}
                                        onChange={handleChange}
                                        isValid={touched.lastName && !errors.lastName}
                                        isInvalid={!!errors.lastName}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.lastName}
                                    </Form.Control.Feedback>
                                </InputGroup>

                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationFormik03">
                                <Form.Label>Отчество</Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control
                                        type="text"
                                        name="middleName"
                                        value={values.middleName}
                                        onChange={handleChange}
                                        isValid={touched.middleName && !errors.middleName}
                                        isInvalid={!!errors.middleName}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.middleName}
                                    </Form.Control.Feedback>
                                </InputGroup>

                            </Form.Group>

                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="4" controlId="validationFormikUsername">
                                <Form.Label>Логин</Form.Label>
                                <InputGroup >
                                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                    <Form.Control
                                        type="text"
                                        placeholder="Логин"
                                        aria-describedby="inputGroupPrepend"
                                        name="username"
                                        onChange={event => {
                                            setQuery(event.target.value)
                                            handleChange(event.target.value)
                                            values.username = query
                                        }}
                                        value={query}
                                        isInvalid={!!usernameError}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {usernameError}
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
                                <InputGroup>
                                    <Form.Control
                                        type="text"
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

                        <Button type="submit" onClick={() => {
                            console.log(errors)
                        }}>Зарегистрироваться</Button>

                        <div style={{cursor: "pointer", marginTop: 10, width: 200}} onClick={() => setNeedRegister(false)}>
                            Уже есть аккаунт? - Войти
                        </div>
                    </Form>
                )}
            </Formik>
        </div>

    );
};

export default SignUp;