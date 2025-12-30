import React, { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addCart } from "../store/dashcartSlice";
import { useNavigate } from "react-router-dom";

export default function Addcarts() {
  const useridref = useRef();
  const productlengthref = useRef();
  const totalref = useRef();
  const discountref = useRef();

  const dispatch = useDispatch();
  const go = useNavigate();

  function handlesubmit(e) {
    e.preventDefault();
    const length = Number(productlengthref.current.value) || 0;
    const newcarts = {
      userId: Number(useridref.current.value),
      products: Array(length).fill({}) || 2,
      total: Number(totalref.current.value),
      discountedTotal: Number(discountref.current.value),
    };

    dispatch(addCart(newcarts));
    go("/Dashbord/carts");
  }

  return (
    <Form onSubmit={handlesubmit}>
      <Form.Group className="mb-3">
        <Form.Label>User ID</Form.Label>
        <Form.Control type="number" ref={useridref} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Products length</Form.Label>
        <Form.Control type="number" ref={productlengthref} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Total</Form.Label>
        <Form.Control type="number" ref={totalref} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Discount</Form.Label>
        <Form.Control type="number" ref={discountref} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
