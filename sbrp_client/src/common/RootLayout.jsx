import { Outlet, NavLink, Link } from "react-router-dom";
import { Nav, Navbar, Container } from 'react-bootstrap';
import { useContext, useState } from "react";
import { AccessContext } from "./AccessProvider";

export default function RootLayout() {
    const { accessControl } = useContext(AccessContext);

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
                            {(accessControl == "HR") &&
                                <NavLink
                                    to="/listings/new"
                                    className="nav-link">
                                    Create Listing
                                </NavLink>}
                            <NavLink to="/help" className="nav-link">Help</NavLink>
                        </Nav>
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