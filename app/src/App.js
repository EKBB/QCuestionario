import { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import axios from "axios"


const App = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const onChange = (e) => {
    e.preventDefault();
    const loginData = data;
    loginData[e.target.name] = e.target.value;
    setData(loginData)
  }

    //Peticion a la DB
    const onSubmit = async () => {
      /* Enviar data al server */
      try {
          data.rol="client"
         await axios.post("http://localhost:4000/users/login", data) 
         navigate("/list-users")
         alert("Inicio de sesion Correcto")
      } catch (error) {
         alert("Usuario o Contraseña incorrecta")
      }
      console.log(data)
      
  }

  return (
    <Container className="mt-3">
      <Card className="mb-5" style={{ width: "30rem", margin: "auto" }}>
        <Card.Body>
          <Card.Title className="text-center">
            Bienvenido a cuestionarios UTMA
          </Card.Title>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Correo electronico:</Form.Label>
              <Form.Control placeholder="Ingresa tu correo electronico" type="email" name="email" onChange={onChange} /* Texto informativo para el usuario */ />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña:</Form.Label>
              <Form.Control placeholder="Ingresa tu contraseña" type="password" name="password" onChange={onChange} />
            </Form.Group>

            <Row className="text-center">
              <Col>
                <Button onClick={() => onSubmit()}>Ingresar</Button>
              </Col>
              <Col>
                <p>¿No tienes cuenta? <a href="/register-user">¡Registrate!</a></p>

              </Col>
            </Row>
            <Row>
              <p>¿Olvidaste tu contraseña? <a href="/recover-password">Recuperala aquí</a></p>
            </Row>

          </Form>
        </Card.Body>
      </Card>

    </Container>
  );
}

export default App;
