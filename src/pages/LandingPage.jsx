import {Container, Row} from "react-bootstrap";
import Header from "../components/Header";
import {ACARD} from "../components/ACARD";
import image1 from "../assets/img/ai-generated-8005084_1280.png"
import image2 from "../assets/img/cat-dog.jpg"
import image3 from "../assets/img/robot-7768527_1280.webp"

export const LandingPage = () => {
    return (
        <>
            <Header/>
            <Container className="mt-5">
                <h1>Bienvenu sur IA Defender !</h1>
                <h2 className="fw-light">Voici les fonctionnalités actuelles </h2>
                <Row className="mt-5">
                    <ACARD
                        card_title="Prédiction"
                        card_text="Détection de port de masque"
                        bouton_text="En savoir plus"
                        card_img={image1}
                    />
                    <ACARD
                        card_title="Génération d'Image"
                        card_img="https://cdn.pixabay.com/photo/2017/04/07/00/17/dog-2209704_1280.jpg"
                        card_text="Génération d'image adverse"
                        bouton_text="En savoir plus"
                    />
                    <ACARD
                        card_title="Défense"
                        card_text="Tester un image adverse"
                        bouton_text="En savoir plus"
                        card_img={image3}
                    />
                </Row>
            </Container>
        </>
    )
}