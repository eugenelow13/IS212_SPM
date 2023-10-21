import { Outlet, NavLink, Link } from "react-router-dom";
import { Nav, Navbar, Container } from 'react-bootstrap';
import { useContext, useState } from "react";
import { AccessContext } from "./AccessProvider";


function CurrentUserNav({ currentUser }) {
    return (<Navbar.Text>
        {currentUser
            && `Welcome, ${currentUser?.staff_fname} ${currentUser?.staff_lname} (${currentUser?.staff_id})`
        }
    </Navbar.Text>);
}

export default function RootLayout() {
    const { currentUser } = useContext(AccessContext);

    return (
        <>
            <header>
                <Navbar bg="dark" data-bs-theme="dark">
                    <Container>
                        <Navbar.Brand>
                            <Link to="/" className='navbar-brand'>SBRP</Link>
                        </Navbar.Brand>
                        <Nav className='me-auto'>
                            <NavLink to="/listings" className="nav-link">Listings</NavLink>
                            {/* <NavLink
                                to="/listings/new"
                                className={"nav-link" + (accessControl !== "HR" ? " disabled" : "")}
                            >
                                Create Listing
                            </NavLink> */}
                            {(currentUser.role == 4) &&
                                <NavLink
                                    to="/listings/new"
                                    className="nav-link">
                                    Create Listing
                                </NavLink>}
                            <NavLink to="/help" className="nav-link">Help</NavLink>
                        </Nav>
                        <CurrentUserNav currentUser={currentUser}></CurrentUserNav>
                    </Container>
                </Navbar>
            </header>
            <main>
                <Container className="mt-3"> 
                    <Outlet />
                </Container>
            </main>
        </>
    )
}