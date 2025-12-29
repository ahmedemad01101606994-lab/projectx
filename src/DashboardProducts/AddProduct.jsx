import React, { useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { addform } from "../store/form";
import { v4 as uuidv4 } from "uuid";

function AddProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const titleref = useRef();
  const descriptionref = useRef();
  const priceref = useRef();
  const categoryref = useRef();
  const imageref = useRef();

  const handleSubmit = (ev) => {
    ev.preventDefault();

    const newProduct = {
      id: uuidv4(),
      title: titleref.current.value,
      description: descriptionref.current.value,
      price: Number(priceref.current.value),
      category: categoryref.current.value,
      thumbnail: imageref.current.value,
      stock: 10,
    };

    console.log("Adding new product:", newProduct);
    dispatch(addform(newProduct));
    navigate("/Dashbord/products");
  };

  return (
    <div className="p-3">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label>Title</Form.Label>
          <Form.Control
            ref={titleref}
            type="text"
            required
            placeholder="Enter product title"
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Description</Form.Label>
          <Form.Control
            ref={descriptionref}
            as="textarea"
            rows={3}
            required
            placeholder="Enter description"
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Price</Form.Label>
          <Form.Control
            ref={priceref}
            type="number"
            required
            placeholder="Enter price"
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Category</Form.Label>
          <Form.Control
            ref={categoryref}
            type="text"
            required
            placeholder="Enter category"
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            ref={imageref}
            type="text"
            required
            placeholder="Enter image URL"
          />
        </Form.Group>

        <Button type="submit">Add Product</Button>
        <Button
          as={Link}
          to="/Dashbord/products"
          variant="secondary"
          className="ms-2"
        >
          Cancel
        </Button>
      </Form>
    </div>
  );
}

export default AddProduct;
