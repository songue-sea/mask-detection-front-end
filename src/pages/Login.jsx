import {useContext, useState} from "react";
import {Form, Button, Container, Card, Alert, Spinner, NavbarBrand, Nav, NavLink, Navbar} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

const Login = () => {
    const { handleLogin } = useContext(AuthContext); //on charge le contexte ici un consumer ...
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Réinitialiser l'erreur
        setLoading(true);

        try {
            let res = await handleLogin(username,password);
            if (res) {
                navigate("/dashboard");
            }
            else {
                setError("Identifiants incorrects !");
            }

        } catch {
            setError("Une erreur est survenue !");
        }
        setLoading(false);
    };


    return (
        <>
            <Navbar bg="dark" expand={"lg"} variant="dark" className={"shadow-sm"}>
                <Container>
                    <NavbarBrand><a className="navbar-brand text-uppercase fw-bold" href="/">
                        <span
                            className="bg-primary rounded-3 bg-gradient p-1 text-light">IA</span>Defender</a>
                    </NavbarBrand>
                    <Nav className={"ms-auto"}>
                        <NavLink as={Link} to="/login" active="true">Connexion</NavLink>
                        <Button as={Link} to="/register" variant="primary " active="false" className="ms-2">
                            Inscription
                        </Button>
                    </Nav>
                </Container>
            </Navbar>
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card style={{ width: "400px" }} className="p-4 shadow-lg">
                <Card.Title className="text-center mb-3">🔐 Connexion</Card.Title>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="username">
                        <Form.Label>Nom d'utilisateur :</Form.Label>
                        <Form.Control
                            type="username"
                            placeholder="Entrez votre nom d'utilisateur"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="password" className="mt-3">
                        <Form.Label>Mot de passe :</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Entrez votre mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100 mt-4" disabled={loading}>
                        {loading ?  <Spinner animation="border" size="sm" /> : "Se connecter"}
                    </Button>
                </Form>

                <div className="text-center mt-3">
                    <Link to="/register">Créer un compte</Link>
                </div>
            </Card>
        </Container>
        </>
    );
};

export default Login;
