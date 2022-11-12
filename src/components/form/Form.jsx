import React, { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { BsFillPersonFill } from "react-icons/bs";
import { AiFillPhone } from "react-icons/ai";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TableComponent from "../table/Table";
import { writeUserData } from "../../utils/firebase";

const FormComponent = () => {
  const [contact, setContact] = useState({
    name: "",
    phone: "",
    gender: "",
    id: new Date().getTime(),
  });
  const [data, setData] = useState([]);

  console.log("contact", contact);
  console.log("data", data);

  const eventChange = (e) => {
    const changeData = { ...contact, [e.target.name]: e.target.value };
    setContact(changeData);
  };

  const eventSubmit = (e) => {
    e.preventDefault();
    writeUserData(contact);
    setData([...data, contact]);
    setContact({
      name: "",
      phone: "",
      gender: "",
      id: new Date().getTime(),
    });
  };

  return (
    <Container fluid>
      <Row className="vh-100">
        <Col
          lg={6}
          className="d-flex flex-column align-items-center justify-content-center "
        >
          <div
            className=" d-block w-75 text-center mb-4 fs-4 bg-dark text-light rounded-3"
            style={{ maxWidth: "500px" }}
          >
            ADD CONTACT
          </div>
          <Form
            className="w-75"
            style={{ maxWidth: "500px" }}
            onSubmit={eventSubmit}
          >
            <InputGroup className="mb-3">
              <InputGroup.Text
                id="basic-addon1"
                style={{
                  backgroundColor: "black",
                  color: "white",
                  border: "none",
                }}
              >
                <BsFillPersonFill size={20} />
              </InputGroup.Text>
              <Form.Control
                style={{
                  backgroundColor: "black",
                  color: "white",
                  border: "none",
                  outlineColor: "none",
                }}
                onChange={eventChange}
                value={contact?.name || ""}
                name="name"
                placeholder="Name"
                type="text"
                required
                aria-describedby="basic-addon1"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text
                id="basic-addon1"
                style={{
                  backgroundColor: "black",
                  color: "white",
                  border: "none",
                }}
              >
                <AiFillPhone size={20} />
              </InputGroup.Text>
              <Form.Control
                style={{
                  backgroundColor: "black",
                  color: "white",
                  border: "none",
                }}
                onChange={eventChange}
                value={contact?.phone || ""}
                name="phone"
                placeholder="Phone Number"
                type="tel"
                required
                aria-describedby="basic-addon1"
              />
            </InputGroup>

            <Form.Group className="mb-3 w-100 mw-">
              <Form.Select
                id="disabledSelect"
                style={{
                  backgroundColor: "black",
                  color: "white",
                  border: "none",
                }}
                name="gender"
                value={contact?.gender || "Gender"}
                onChange={eventChange}
              >
                <option selected disabled>
                  Gender
                </option>
                <option defaultValue="male">Male</option>
                <option defaultValue="female">Female</option>
                <option defaultValue="other">Other</option>
              </Form.Select>
            </Form.Group>

            <Button className="w-100 " type="submit" variant="dark">
              Submit
            </Button>
          </Form>
        </Col>

        <Col
          lg={6}
          className="d-flex align-items-center justify-content-center "
          style={{ maxWidth: "600px", margin: "0 auto" }}
        >
          <TableComponent data={data} setContact={setContact} />
        </Col>
      </Row>
    </Container>
  );
};

export default FormComponent;
