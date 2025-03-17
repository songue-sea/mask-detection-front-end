import {Button, Card, Col} from "react-bootstrap";

export const ACARD = ({card_title,card_text,card_img,bouton_text}) => {
    return (
        <Col md={4}>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={card_img} className={{weight:100}} alt="photo_here" />
                <Card.Body>
                    <Card.Title className="fw-bold">{card_title}</Card.Title>
                    <Card.Text>{card_text}</Card.Text>
                    <a className="btn btn-primary">{bouton_text}</a>
                </Card.Body>
            </Card>
        </Col>
    )
}