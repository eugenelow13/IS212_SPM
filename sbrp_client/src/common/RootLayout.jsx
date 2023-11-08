import { Outlet, NavLink, Link, redirect } from "react-router-dom";
import { Nav, Navbar, Container, Badge } from 'react-bootstrap';
import { useContext, useState } from "react";
import { AccessContext } from "./AccessProvider";
import { logoutUser } from "./sessionUtilities";


function CurrentUserNav({ currentUser }) {
    const accessRoleNameFromNo = (roleNo) => {
        const mapping = {
            1: "Admin",
            2: "User",
            3: "Manager",
            4: "HR"
        }
        return mapping[roleNo];
    }
    return (
        <>
            <Navbar.Text>
                {currentUser
                    && `Welcome, ${currentUser?.staff_fname} ${currentUser?.staff_lname} (${currentUser?.staff_id})`
                }
            </Navbar.Text>
            {currentUser
                && <Badge className="ms-1" bg="primary">{accessRoleNameFromNo(currentUser.role)}</Badge>
            }
        </>
    );
}

export default function RootLayout() {
    const { currentUser, setCurrentUser } = useContext(AccessContext);

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
                            <>
                                <NavLink
                                    to="/listings/new"
                                    className="nav-link">
                                    Create Listing
                                </NavLink>
                                <NavLink
                                    to="/applications"
                                    className="nav-link">
                                    View Applicants
                                </NavLink>
                            </>
                            }
                            {/* <NavLink to="/help" className="nav-link">Help</NavLink> */}
                        </Nav>
                        <CurrentUserNav currentUser={currentUser}></CurrentUserNav>
                        <Nav>
                            {currentUser &&
                                <NavLink
                                    className="ms-1"
                                    onClick={() => {
                                        logoutUser();
                                        setCurrentUser("");
                                        redirect("/")
                                    }}
                                >
                                    Log Out
                                </NavLink>
                            }
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