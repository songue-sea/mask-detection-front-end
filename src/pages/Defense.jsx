import React, { useState, useContext } from "react";
import { Form, Button, Alert, Spinner, Container, Card } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const DefensePage = () => {
    const { user } = useContext(AuthContext);
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handlePrediction = async () => {
        if (!image) {
            setError("Veuillez sélectionner une image.");
            return;
        }

        setLoading(true);
        setError(null);
        setResult(null);

        const formData = new FormData();
        formData.append("file", image);

        try {
            const token = localStorage.getItem("access_token");
            const response = await axios.post("http://localhost:5000/predict-robust", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                },
            });

            setResult(response.data);
        } catch (err) {
            setError("Erreur lors de la prédiction. Vérifiez votre connexion.");
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setImage(null);
        setPreview(null);
        setResult(null);
        setError(null);
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card style={{ width: "40rem", padding: "20px" }}>
                <h3 className="text-center">📤 Téléchargez une image pour analyse</h3>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Control type="file" onChange={handleImageChange} />
                    </Form.Group>
                    {preview && <img src={preview} alt="Prévisualisation" className="img-fluid mb-3" />}
                    <Button variant="primary" onClick={handlePrediction} disabled={loading} className="me-2">
                        {loading ? <Spinner animation="border" size="sm" /> : "🔵 Lancer la Prédiction"}
                    </Button>
                    {result && (
                        <Button variant="secondary" onClick={handleReset} className="ms-2">
                            🔄 Tester une autre image
                        </Button>
                    )}
                </Form>
                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                {result && (
                    <Alert variant="success" className="mt-3">
                        📊 Résultat : <strong>{result.prediction.toUpperCase()}</strong> ({(result.confidence * 100).toFixed(2)}%)
                    </Alert>
                )}
            </Card>
        </Container>
    );
};

export default DefensePage;
