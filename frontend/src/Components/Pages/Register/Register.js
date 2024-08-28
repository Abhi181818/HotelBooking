import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Form,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGithub,
  faGoogle,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      toast.error("All fields are required", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    axios
      .post("http://localhost:8080/user/add", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      })
      .then((res) => {
        toast.success("User Registered Successfully", {
          position: "top-center",
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate("/login")
        }, 200);
      })
      .catch((err) => {
        toast.error("Registration failed. Please try again.", {
          position: "top-center",
          autoClose: 2000,
        });
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <Container fluid className="mt-2 shadow" style={{ width: "50rem" }}>
        <Row>
          <Col
            md="6"
            className="text-center text-md-start d-flex flex-column justify-content-center"
          >
            <h1 className="my-5 display-3 fw-bold ls-tight px-3 text-white hover-text">
              The best offer <br />
              <span className="text-primary">for your stay</span>
            </h1>

            <p className="px-3" style={{ color: "hsl(217, 10%, 50.8%)" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
              itaque accusantium odio, soluta, corrupti aliquam quibusdam
              tempora at cupiditate quis eum maiores libero veritatis? Dicta
              facilis sint aliquid ipsum atque?
            </p>
          </Col>
          <Col md="6">
            <Card className="card1">
              <CardBody className="text-white">
                <h2 className="text-center hover-text fw-bold">Register</h2>
                <Form onSubmit={handleSignUp}>
                  <InputGroup className="">
                    <Form.Label htmlFor="form1" className="w-100">
                      First Name
                    </Form.Label>
                    <FormControl
                      id="form1"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </InputGroup>
                  <InputGroup className="">
                    <Form.Label htmlFor="form2" className="w-100">
                      Last Name
                    </Form.Label>
                    <FormControl
                      id="form2"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </InputGroup>
                  <InputGroup className="">
                    <Form.Label htmlFor="form3" className="w-100">
                      Email
                    </Form.Label>
                    <FormControl
                      id="form3"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </InputGroup>
                  <InputGroup className="">
                    <Form.Label htmlFor="form4" className="w-100">
                      Password
                    </Form.Label>
                    <FormControl
                      id="form4"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </InputGroup>
                  <InputGroup className="">
                    <Form.Label htmlFor="form5" className="w-100">
                      Confirm Password
                    </Form.Label>
                    <FormControl
                      id="form5"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </InputGroup>
                  <div className="d-flex justify-content-center mb-4">
                    <Form.Check
                      type="checkbox"
                      id="flexCheckDefault"
                      label="Subscribe to our newsletter"
                    />
                  </div>
                  <Button className="w-100 signup" size="md" type="submit">
                    Sign Up
                  </Button>
                </Form>
                <div className="text-center">
                  <p>or sign up with:</p>
                  <Button
                    variant="link"
                    className="mx-3"
                    style={{ color: "#1266f1" }}
                  >
                    <FontAwesomeIcon icon={faGoogle} />
                  </Button>
                  <Button
                    variant="link"
                    className="mx-3"
                    style={{ color: "#1266f1" }}
                  >
                    <FontAwesomeIcon icon={faFacebook} />
                  </Button>
                  <Button
                    variant="link"
                    className="mx-3"
                    style={{ color: "#1266f1" }}
                  >
                    <FontAwesomeIcon icon={faTwitter} />
                  </Button>
                  <Button
                    variant="link"
                    className="mx-3"
                    style={{ color: "#1266f1" }}
                  >
                    <FontAwesomeIcon icon={faGithub} />
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
}

export default Register;
