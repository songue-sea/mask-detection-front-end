import { useState } from "react";
import {Form, Button, Container, Card, Alert, Spinner, Navbar, NavbarBrand, Nav, NavLink} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(false);

        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas !");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username,email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess("Compte créé avec succès ! Redirection...");
                setTimeout(() => navigate("/login"), 2000); // Rediriger vers Login après 2s
            } else {
                setError(data.error || "Erreur lors de l'inscription.");
            }
        } catch (err) {
            setError("Impossible de contacter le serveur.");
        }
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
                    <NavLink as={Link} to="/login">Connexion</NavLink>
                    <Button as={Link} to="/register" variant="primary " active="true" className="ms-2">
                        Inscription
                    </Button>
                </Nav>
            </Container>
        </Navbar>
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card style={{ width: "400px" }} className="p-4 shadow-lg">
                <Card.Title className="text-center mb-3">📝 Inscription</Card.Title>
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="email">
                        <Form.Label>Email :</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Entrez votre email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="email" className="mt-3">
                        <Form.Label>Username :</Form.Label>
                        <Form.Control
                            type="text"
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

                    <Form.Group controlId="confirmPassword" className="mt-3">
                        <Form.Label>Confirmez le mot de passe :</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirmez votre mot de passe"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button variant="success" type="submit" className="w-100 mt-4" disabled={loading}>
                        {loading ? <Spinner animation="border" role="status" size="sm" /> : "S'inscrire"}
                    </Button>
                </Form>

                <div className="text-center mt-3">
                    Déjà un compte ? <Link to="/login">Se connecter</Link>
                </div>
            </Card>
        </Container>
        </>
    );
};

export default Register;
