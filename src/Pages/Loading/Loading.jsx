import { Container } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

function Loading() {
  return (
    <Container className=" d-flex justify-content-center align-items-center vh-100">
      <Spinner animation="border" />
    </Container>
  );
}

export default Loading;
