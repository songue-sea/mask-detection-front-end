import React, { useContext } from "react";
import { Container, Row, Col, Button, Card, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const { user, handleLogout } = useContext(AuthContext); // ✅ Récupère la fonction logout
    const navigate = useNavigate();

    return (
        <>
            {/* Navigation Bar */}
            <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
                <Container>
                    <Navbar.Brand>
                        <a className="navbar-brand text-uppercase fw-bold">
                            <span className="bg-primary rounded-3 bg-gradient p-1 text-light">IA</span>Defender
                        </a>
                    </Navbar.Brand>

                    <Nav className="ms-auto">
                        {/* ✅ Dropdown avec Profil + Déconnexion */}
                        <NavDropdown title={`👤 ${user?.username || "Utilisateur"}`} id="nav-dropdown">
                            <NavDropdown.Item onClick={() => navigate("/profile")}>Voir le profil</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={handleLogout} className="text-danger">🚪 Déconnexion</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Container>
            </Navbar>

            <Container>
                {/* Welcome Message */}
                <Card className="text-center mb-4">
                    <Card.Body>
                        <h4>📌 Bienvenue, {user?.username || "Utilisateur"} !</h4>
                    </Card.Body>
                </Card>

                {/* Main Buttons */}
                <Row className="g-3 text-center">
                    <Col md={6}>
                        <Button variant="primary" size="lg" className="w-100" onClick={() => navigate("/prediction")}>
                            🔵 Prédiction d’image
                        </Button>
                    </Col>
                    <Col md={6}>
                        <Button variant="warning" size="lg" className="w-100" onClick={() => navigate("/ig")}>
                            🟠 Génération d’image
                        </Button>
                    </Col>
                    <Col md={6}>
                        <Button variant="success" size="lg" className="w-100" onClick={() => navigate("/defense")}>
                            🟢 Tester un modèle robuste
                        </Button>
                    </Col>
                    <Col md={6}>
                        <Button variant="info" size="lg" className="w-100" onClick={() => navigate("/historique")}>
                            🟣 Historique
                        </Button>
                    </Col>
                </Row>

                {/* Latest Analysis */}
                <Card className="text-center mt-4">
                    <Card.Body>
                        <h5>📊 Dernières analyses effectuées</h5>
                        <p>Aucune analyse récente.</p>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default Dashboard;
