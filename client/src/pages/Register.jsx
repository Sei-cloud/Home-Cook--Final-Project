import React, { useState } from "react";
import { Button, Form, Message } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const Register = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "", 
  });
  const [registerUser, { error }] = useMutation(REGISTER_USER);
  const [errorMessages, setErrorMessages] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Check if passwords match
    if (formState.password !== formState.confirmPassword) {
      setErrorMessages((prev) => ({
        ...prev,
        password: "Passwords do not match",
      }));
      return;
    }

    try {
      const { data } = await registerUser({
        variables: {
          username: formState.username,
          email: formState.email,
          password: formState.password,
        },
      });
      Auth.login(data.register.token);
    } catch (e) {
      console.error(e);

      // Handle specific errors
      if (e.message.includes("Username")) {
        setErrorMessages((prev) => ({
          ...prev,
          username: "Username is already taken",
        }));
      }
      if (e.message.includes("Email")) {
        setErrorMessages((prev) => ({
          ...prev,
          email: "Email is already taken",
        }));
      }
      // General error handling
      if (!e.message.includes("Username") && !e.message.includes("Email")) {
        setErrorMessages((prev) => ({
          ...prev,
          general: "Registration failed. Please try again.",
        }));
      }
    }
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <Form.Input
        label="Username"
        placeholder="Your username"
        name="username"
        value={formState.username}
        onChange={handleChange}
        error={!!errorMessages.username}
      />
      {errorMessages.username && (
        <Message error content={errorMessages.username} />
      )}

      <Form.Input
        label="Email"
        placeholder="Your email"
        name="email"
        type="email"
        value={formState.email}
        onChange={handleChange}
        error={!!errorMessages.email}
      />
      {errorMessages.email && <Message error content={errorMessages.email} />}

      <Form.Input
        label="Password"
        placeholder="******"
        name="password"
        type="password"
        value={formState.password}
        onChange={handleChange}
        error={!!errorMessages.password}
      />

      <Form.Input
        label="Confirm Password"
        placeholder="******"
        name="confirmPassword"
        type="password"
        value={formState.confirmPassword}
        onChange={handleChange}
        error={!!errorMessages.password}
      />
      {errorMessages.password && (
        <Message error content={errorMessages.password} />
      )}

      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default Register;
