import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteCart, updateCart } from "../store/dashcartSlice";

function Carts() {
  const dispatch = useDispatch();
  const reduxCarts = useSelector((state) => state.dashcart.carts);
  console.log(reduxCarts);
  const [apiCarts, setApiCarts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCart, setSelectedCart] = useState(null);

  const [userId, setUserId] = useState("");
  const [productsLength, setProductsLength] = useState(0);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const res = await axios.get("https://dummyjson.com/carts");
        setApiCarts(res.data.carts);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCarts();
  }, []);

  const allCarts = [...apiCarts, ...reduxCarts];

  const openEditModal = (cart) => {
    setSelectedCart(cart);
    setUserId(cart.userId);
    setProductsLength(cart.products?.length || 0);
    setTotal(cart.total);
    setDiscount(cart.discountedTotal);
    setShowEditModal(true);
  };

  // حفظ التعديلات
  const handleEdit = () => {
    const updatedCart = {
      ...selectedCart,
      userId: Number(userId),
      products: Array(Number(productsLength)).fill({}),
      total: Number(total),
      discountedTotal: Number(discount),
    };

    if (reduxCarts.some((c) => c.id === selectedCart.id)) {
      dispatch(updateCart(updatedCart));
    } else {
      setApiCarts((prev) =>
        prev.map((c) => (c.id === selectedCart.id ? updatedCart : c))
      );
    }

    setShowEditModal(false);
  };

  const handleDelete = (cart) => {
    if (reduxCarts.some((c) => c.id === cart.id)) {
      dispatch(deleteCart(cart.id));
    } else {
      setApiCarts((prev) => prev.filter((c) => c.id !== cart.id));
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h3>Loading carts...</h3>
      </div>
    );
  }

  return (
    <div className="p-3 min-vh-100 shadow rounded">
      <div className="d-flex justify-content-between mb-3">
        <h1>Carts</h1>
        <Button as={Link} to="/Dashboard/Carts/Add">
          Add Cart
        </Button>
      </div>

      <div style={{ maxHeight: "70vh", overflowY: "auto" }}>
        <Table striped bordered hover responsive className="align-middle">
          <thead className="table-dark">
            <tr>
              <th>User ID</th>
              <th>Products Length</th>
              <th>Total</th>
              <th>Discount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allCarts.map((cart) => (
              <tr key={cart.id}>
                <td>{cart.userId}</td>
                <td>{cart.products?.length || 0}</td>
                <td>${cart.total}</td>
                <td>${cart.discountedTotal}</td>
                <td>
                  <Button
                    variant="success"
                    className="me-2"
                    onClick={() => openEditModal(cart)}
                  >
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(cart)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>User ID</Form.Label>
              <Form.Control
                type="number"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Products Length</Form.Label>
              <Form.Control
                type="number"
                value={productsLength}
                onChange={(e) => setProductsLength(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Total</Form.Label>
              <Form.Control
                type="number"
                value={total}
                onChange={(e) => setTotal(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Discount</Form.Label>
              <Form.Control
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Carts;
