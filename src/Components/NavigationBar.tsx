import React from 'react';
import {Nav, Navbar} from "react-bootstrap";

const NavigationBar = () => {
    return (
        <Navbar collapseOnSelect expand={"lg"} bg={"#fff"} variant={"light"}>
            <Navbar.Brand className={'ms-5'}><img src={require("../images/metka.png")} alt={''}/> Екатеринбург</Navbar.Brand>
            <Navbar.Toggle aria-controls={'responsive-navbar-nav'}/>
            <Navbar.Collapse id={'responsive-navbar-nav'}>
                <Nav className='ms-auto'>
                    <Nav.Link className={'me-3'} href={"/"}>Список объявлений</Nav.Link>
                    <Nav.Link className={'me-3'} href={"/"}>О нас</Nav.Link>
                    <Nav.Link className={'me-3'} href={'/favourites'}>Избранное</Nav.Link>
                </Nav>
                <Nav style={{marginRight: "72px"}}>
                    <Nav.Link href={'/profile'}><img src={require("../images/Profile.png")} alt={'Профиль'}/></Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>

    );
};

export default NavigationBar;