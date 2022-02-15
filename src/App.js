import logo from "./logo.svg";
import "./App.css";
import ScreenFreeReminderCard from "./components/screenFreeReminder/ScreenFreeReminderCard";
import LockScreen from './components/screenFreeReminder/LockScreen'
import { Container, Row, Col } from "react-bootstrap";

function App() {
  return (
    <Container className="App">
      <LockScreen/>
      <Row>
        <Col className="col-4 mt-5">
          <ScreenFreeReminderCard />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
