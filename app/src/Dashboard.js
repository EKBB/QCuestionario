import React, { useEffect, useState } from 'react'
import { Card, Container, Row, Col } from 'react-bootstrap'
import { FileEarmarkBarGraphFill, PeopleFill } from 'react-bootstrap-icons';
import axios from "axios"

export const Dashboard = () => {
    const [metrics, setMetrics] = useState({
        numberUsers: 0,
        numberQuestionnaires: 0
    });
    const [user, setUser] = useState({});

    useEffect(() => {
        getUser()
        getMetrics()
    }, []);

    const getUser = () => {
        const user = JSON.parse(localStorage.user);
        setUser(user);
    }

    const getMetrics = async () => {
        try {
            console.log("si paso")

            const res = await axios.get("http://localhost:4000/questionnaires/getMetrics")
            console.log("si paso")

            const data = {
                numberUsers: res.data.numberUsers,
                numberQuestionnaires: res.data.numberQuestionnaires
            }
            console.log("si paso")

            setMetrics(data)
            console.log("si paso")

        } catch (error) {
            console.log(error)
            alert("Hubo un error al obtener las metricas", )
        }
    }



    return (
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title>Bienvenido de nuevo {user.name} </Card.Title>
                    <Row>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Numero de usuarios registrados: </Card.Title>
                                    <PeopleFill /> {metrics.numberUsers}
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Numero de cuestionarios creados: </Card.Title>
                                    <FileEarmarkBarGraphFill /> {metrics.numberQuestionnaires}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    )
}
