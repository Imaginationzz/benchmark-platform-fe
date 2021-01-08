import React from "react";
import { Alert, Button, Col, Form, Row, Spinner } from "react-bootstrap";

class QuestionForm extends React.Component {
  state = {
    questions: [],
    questionsBox: {
      question1Box: false,
      question2Box: false,
      question3Box: false,
      question4Box: false,
    },
    errMessage: "",
    loading: false,
  };

  updateCheckBox = (e) => {
    let tempQues = { ...this.state.questionsBox };
    let currentId = e.currentTarget.id;

    tempQues[currentId] = e.currentTarget.checked;

    this.setState({ questionsBox: tempQues });
  };

  submitQuestions = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    try {
      let response = await fetch(
        `http://localhost:3001/exams/${this.state.questions.id}/answers`,
        {
          method: "POST",
          body: JSON.stringify(this.state.questions.id),
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        }
      );
      if (response.ok) {
        alert("Answers Received!");
        this.setState({
          questions: [],
          errMessage: "",
          loading: false,
        });
      } else {
        console.log("an error occurred");
        let error = await response.json();
        this.setState({
          errMessage: error.message,
          loading: false,
        });
      }
    } catch (e) {
      console.log(e); // Error
      this.setState({
        errMessage: e.message,
        loading: false,
      });
    }
  };
  componentDidMount = async () => {
    try {
      let response = await fetch("http://localhost:3001/exams");
      let questions = await response.json();
      console.log(questions.answers);
      this.setState({ questions: questions, loading: false });
    } catch (e) {
      console.log("error happened", e);
      this.setState({ loading: false });
    }
  };

  render() {
    console.log(this.state.questions);
    return (
      <div>
        {this.state.errMessage && (
          <Alert variant="danger">
            We encountered a problem with your request
            {this.state.errMessage}
          </Alert>
        )}
        {this.state.loading && (
          <div className="d-flex justify-content-center my-5">
            Starting the exam, please wait
            <div className="ml-2">
              <Spinner animation="border" variant="success" />
            </div>
          </div>
        )}
        {this.state.questions &&
          this.state.questions.answers &&
          this.state.questions.answers.length > 0 && (
            <>
              <div>
                <h1>Question:{this.state.questions.text}</h1>
              </div>
              <Form className="w-100 mb-5" onSubmit={this.submitQuestions}>
                <Row>
                  <Col md={1} className=" ml-4 align-self-end">
                    <Form.Group>
                      <Form.Label>
                        <Form.Check
                          type="checkbox"
                          id="question1Box"
                          label=""
                          checked={this.state.questionsBox.question1Box}
                          onChange={this.updateCheckBox}
                        />
                      </Form.Label>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label htmlFor="question1">Answer1</Form.Label>
                      <Form.Control
                        type="text"
                        name="question1"
                        id="question1"
                        placeholder="question1"
                        value={this.state.questions.answers[0].text}
                        onChange={this.updateFields}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={1} className="flex flex-column align-self-end">
                    <Form.Group>
                      <Form.Label>
                        <Form.Check
                          type="checkbox"
                          id="question2Box"
                          label=""
                          checked={this.state.questionsBox.question2Box}
                          onChange={this.updateCheckBox}
                        />
                      </Form.Label>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label htmlFor="question2">Answer2</Form.Label>
                      <Form.Control
                        type="text"
                        name="question2"
                        id="question2"
                        placeholder="question2"
                        value={this.state.questions.answers[1].text}
                        onChange={this.updateCheckBox}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={1} className="ml-4  align-self-end">
                    <Form.Group>
                      <Form.Label>
                        <Form.Check
                          type="checkbox"
                          id="question3Box"
                          label=""
                          checked={this.state.questionsBox.question3Box}
                          onChange={this.updateCheckBox}
                        />
                      </Form.Label>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label htmlFor="question3">Answer3</Form.Label>
                      <Form.Control
                        type="text"
                        name="question3"
                        id="question3"
                        placeholder="question3"
                        value={this.state.questions.answers[2].text}
                        onChange={this.updateFields}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={1} className="flex flex-column align-self-end">
                    <Form.Group>
                      <Form.Label>
                        <Form.Check
                          type="checkbox"
                          id="question4Box"
                          label=""
                          checked={this.state.questionsBox.question4Box}
                          onChange={this.updateFields}
                        />
                      </Form.Label>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label htmlFor="question4">Answer4</Form.Label>
                      <Form.Control
                        type="text"
                        name="question4"
                        id="question4"
                        placeholder="question4"
                        value={this.state.questions.answers[3].text}
                        onChange={this.updateFields}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button className="button" type="submit">
                  Proceed
                </Button>
              </Form>
            </>
          )}
      </div>
    );
  }
}

export default QuestionForm;
