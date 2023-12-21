import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useRouter } from "next/router";

const HeaderSearchForm = () => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setInputValue(e.target.value);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation, you can add more complex validation logic here
    if (!inputValue.trim()) {
      setError("Please enter a value");
      return;
    }

    // Handle the form submission logic here
    console.log("Form submitted with value:", inputValue);
    router.push({
      pathname: "/search",
      query: { request: inputValue },
    });

    // Reset the form
    setInputValue("");
    setError("");
  };

  return (
    <Form className="d-flex" onSubmit={handleSubmit}>
      <Form.Control
        type="search"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
        value={inputValue}
        onChange={handleChange}
      />
      <Button type="submit" variant="outline-success">
        Search
      </Button>
    </Form>
  );
};

export default HeaderSearchForm;
