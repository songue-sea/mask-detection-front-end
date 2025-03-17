import {Button, Container, Nav, Navbar, NavbarBrand, NavLink} from "react-bootstrap";
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <Navbar bg="dark" expand={"lg"} variant="dark" className={"shadow-sm"}>
            <Container>
                <NavbarBrand ><a className="navbar-brand text-uppercase fw-bold">
                    <span className="bg-primary rounded-3 bg-gradient p-1 text-light">IA</span>Defender</a>
                </NavbarBrand>
                <Nav className={"ms-auto"}>
                    <NavLink as={Link} to="/login">Connexion</NavLink>
                    <Button as={Link} to="/register" variant="primary" className="ms-2">
                        Inscription
                    </Button>
                </Nav>
            </Container>
        </Navbar>
    )
};
export default Header