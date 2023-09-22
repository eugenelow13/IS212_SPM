import { Outlet, NavLink, Link } from "react-router-dom";
import { Nav, Navbar, Container } from 'react-bootstrap';

export default function RootLayout() {
    return (
        <>
            <header>
                <Navbar className='bg-body-tertiary'>
                    <Container>
                        <Navbar.Brand>
                            <Link to="/" className='navbar-brand'>SBRP</Link>
                        </Navbar.Brand>
                        <Nav className='me-auto'>
                            <NavLink to="/listings" className="nav-link">Listings</NavLink>
                            <NavLink to="/help" className="nav-link">Help</NavLink>
                        </Nav>
                    </Container>
                </Navbar>
            </header>
            <main>
                <Container>
                    <Outlet />
                </Container>
            </main>
        </>
    )
}