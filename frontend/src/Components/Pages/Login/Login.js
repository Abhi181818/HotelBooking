import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  InputGroup,
  Form,
  FormControl,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGithub,
  faGoogle,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { useAuth } from "../../Context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import './Login.css';
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const { isAuthenticated, setIsAuthenticated ,setUser} = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => { 

    window.scrollTo(0, 0);
  }, []);


  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/user/authenticate",
        {
          email: username,
          password: password,
        }
      );
      // console.log(response.data);
      if (response.data==="User authenticated successfully") {
        setIsAuthenticated(true);
        setUser(username);
        toast.success("Login Successful", {
          position: "top-center",
          autoClose: 2000,
        });
        navigate("/");
        
      }
      else{
        toast.error("Login Failed", {
          position: "top-center",
          autoClose: 2000,
        });
      }
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
            >
    <Container fluid className="mt-2 rounded shadow" style={{ width: "50rem" }}>
      <Row>
        <Col
          md="6"
          className="text-center text-md-start d-flex flex-column justify-content-center"
        >
          <h1 className="text-white my-5 display-3 fw-bold ls-tight px-3 hover-text">
            The best offer <br />
            <span className="text-primary">for your stay</span>
          </h1>

          <p className="px-3" style={{color:"GrayText"}}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
            itaque accusantium odio, soluta, corrupti aliquam quibusdam tempora
            at cupiditate quis eum maiores libero veritatis? Dicta facilis sint
            aliquid ipsum atque?
          </p>
        </Col>
        <Col md="6" className="mt-2">
          <Card className="p-2 card1">
            <CardBody className="p-3">
              <h2 className="text-center hover-text fw-bold text-white">Welcome back</h2>
              <InputGroup className="">
                <Form.Label htmlFor="form1" className="w-100 text-white">
                  Email
                </Form.Label>
                <FormControl
                  id="form1"
                  type="email"
                  className="rounded"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </InputGroup>
              <InputGroup >
                <Form.Label htmlFor="form2" className="w-100 text-white">
                  Password
                </Form.Label>
                <FormControl
                  id="form2"
                    type="password"
                    className="rounded"
                    style={{opacity:"0.8"}}
                    onChange={(e) => setPassword(e.target.value)}
            
                />
              </InputGroup>
              <div className="d-flex justify-content-center">
                <Form.Check
                  type="checkbox"
                  id="flexCheckDefault"
                    label="Subscribe to our newsletter"
                    className="text-white"
                />
              </div>
              <Button className="w-100" size="md" onClick={handleLogin}>
                Log In
              </Button>
              <div className="text-center text-white">
                <p>or log in with:</p>
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
};

export default Login;
