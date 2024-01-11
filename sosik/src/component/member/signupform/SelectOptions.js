import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";

const SelectOptions = ({ defaultValue, values, handleInputChange, name }) => (
  <Form.Select
    defaultValue={defaultValue}
    name={name}
    onChange={handleInputChange}
  >
    <option>{defaultValue}</option>
    {values.map((value) => (
      <option key={value} value={value}>
        {value}
      </option>
    ))}
  </Form.Select>
);

export default SelectOptions;
