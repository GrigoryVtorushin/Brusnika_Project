import React from 'react';
import {Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import './NavigationBar.css'

const NavigationBar = () => {
    return (
        <Navbar collapseOnSelect expand={"lg"} bg={"#fff"} variant={"light"} style={{borderBottom: "1px solid #14191A1F", height: "100px"}}>
            <Navbar.Brand className={'ms-5'}><img src={require("../../images/metka.png")} alt={''}/> Екатеринбург</Navbar.Brand>
            <Navbar.Toggle aria-controls={'responsive-navbar-nav'}/>
            <Navbar.Collapse id={'responsive-navbar-nav'}>
                <Nav className='ms-auto'>
                    <Nav.Link className={'me-3'}><Link className={'Link'} to={'/'}>Список объявлений</Link> </Nav.Link>
                    <Nav.Link className={'me-3'}><Link className={'Link'} to={'/about'}>О нас</Link></Nav.Link>
                    <Nav.Link className={'me-3'} href={'/favourites'}><Link className={'Link'} to={'/favourites'}>Избранное</Link></Nav.Link>
                </Nav>
                <Nav style={{marginRight: "72px"}}>
                    <Nav.Link><Link className={'Link'} to={'/profile'}><img src={require("../../images/Profile.png")} alt={'Профиль'}/></Link></Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>

    );
};

export default NavigationBar;