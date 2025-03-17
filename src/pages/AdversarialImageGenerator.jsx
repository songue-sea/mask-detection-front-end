import React, { useState, useContext } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const GenerateAdversarial = () => {
    const [file, setFile] = useState(null);
    const [epsilon, setEpsilon] = useState("");
    const [label, setLabel] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [adversarialImage, setAdversarialImage] = useState(null);
    const { user } = useContext(AuthContext); // Récupère le token depuis le contexte

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setAdversarialImage(null);

        if (!file || !epsilon || !label) {
            setError("Tous les champs sont obligatoires !");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("epsilon", epsilon);
        formData.append("label", label);

        setIsLoading(true);

        try {
            const token = localStorage.getItem("access_token");
            const response = await axios.post(
                "http://localhost:5000/generate-adversarial",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`, // Inclut le token
                    },
                    responseType: "blob", // On attend une image comme réponse
                }
            );

            // Création d'une URL pour afficher/télécharger l'image
            const url = URL.createObjectURL(new Blob([response.data]));
            setAdversarialImage(url);
        } catch (err) {
            if (err.response) {
                setError(err.response.data.error || "Une erreur est survenue.");
            } else {
                setError("Erreur de communication avec le serveur.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h2>Générer une image adverse</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="fileUpload" className="mb-3">
                    <Form.Label>Image (JPG ou PNG)</Form.Label>
                    <Form.Control type="file" accept=".jpg,.png" onChange={handleFileChange} />
                </Form.Group>

                <Form.Group controlId="epsilon" className="mb-3">
                    <Form.Label>Epsilon (valeur numérique)</Form.Label>
                    <Form.Control
                        type="number"
                        step="0.01"
                        placeholder="0.1"
                        value={epsilon}
                        onChange={(e) => setEpsilon(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="label" className="mb-3">
                    <Form.Label>Label cible (valeur numérique)</Form.Label>
                    <Form.Control
                        type="number"
                        min="0"
                        step="1"
                        max="1"
                        placeholder="0"
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={isLoading}>
                    {isLoading ? <Spinner animation="border" size="sm" /> : "Envoyer"}
                </Button>
            </Form>

            {adversarialImage && (
                <div className="mt-4">
                    <h3>Image adverse générée</h3>
                    <img src={adversarialImage} alt="Adversarial" style={{ maxWidth: "100%", height: "auto" }} />
                    <div className="mt-2">
                        <Button variant="success" href={adversarialImage} download="adversarial.jpg">
                            Télécharger l'image
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GenerateAdversarial;
