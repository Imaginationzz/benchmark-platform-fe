import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import QuestionForm from "./components/questionForm";
import NavBar from "./components/NavBar";
import { Container } from "react-bootstrap";

function App() {
  return (
    <>
      <div className="mb-5">
        <NavBar />
      </div>
      <div className="box-1">
        <Container>
          <div className="App">
            <QuestionForm />
          </div>
        </Container>
      </div>
    </>
  );
}

export default App;
