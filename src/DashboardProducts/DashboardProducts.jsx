import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteProduct, editProduct } from "../store/form";

function DashboardProducts() {
  const dispatch = useDispatch();
  const newProducts = useSelector((state) => state.form.products);

  const [apiProducts, setApiProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [editTitle, setEditTitle] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editStock, setEditStock] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editThumbnail, setEditThumbnail] = useState("");

  // جلب منتجات API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://dummyjson.com/products");
        setApiProducts(res.data.products);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // دمج كل المنتجات للعرض
  const allProducts = [...apiProducts, ...newProducts];

  // فتح modal تعديل المنتج
  const openEditModal = (product) => {
    setSelectedProduct(product);
    setEditTitle(product.title);
    setEditPrice(product.price);
    setEditStock(product.stock);
    setEditCategory(product.category);
    setEditThumbnail(product.thumbnail);
    setShowEditModal(true);
  };

  // تعديل المنتج
  const handleEdit = () => {
    const updatedProduct = {
      ...selectedProduct,
      title: editTitle,
      price: Number(editPrice),
      stock: Number(editStock),
      category: editCategory,
      thumbnail: editThumbnail,
    };

    if (newProducts.some((np) => np.id === selectedProduct.id)) {
      dispatch(editProduct(updatedProduct));
    } else {
      setApiProducts((prev) =>
        prev.map((p) => (p.id === selectedProduct.id ? updatedProduct : p))
      );
    }

    setShowEditModal(false);
  };

  // حذف المنتج
  const handleDelete = (product) => {
    if (newProducts.some((np) => np.id === product.id)) {
      // حذف المنتج الجديد من Redux + localStorage
      dispatch(deleteProduct(product.id));
    } else {
      // حذف مؤقت للمنتج من API
      setApiProducts((prev) => prev.filter((p) => p.id !== product.id));
    }
    setShowDeleteModal(false);
  };

  if (loading)
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h3>Loading...</h3>
      </div>
    );

  return (
    <div className="p-3 min-vh-100 shadow rounded">
      <div className="d-flex justify-content-between mb-3">
        <h1>Products</h1>
        <Button as={Link} to="/Dashbord/Products/Add">
          Add Product
        </Button>
      </div>

      <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
        <Table striped bordered hover responsive className="align-middle">
          <thead className="table-dark">
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map((p, index) => (
              <tr key={`${p.id}-${index}`}>
                <td>
                  <img src={p.thumbnail} alt={p.title} width={50} />
                </td>
                <td>{p.title}</td>
                <td>${p.price}</td>
                <td>{p.stock}</td>
                <td>
                  <Button
                    variant="warning"
                    className="me-2"
                    onClick={() => openEditModal(p)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      setSelectedProduct(p);
                      setShowDeleteModal(true);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete{" "}
          <strong>{selectedProduct?.title}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => selectedProduct && handleDelete(selectedProduct)}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={editPrice}
                onChange={(e) => setEditPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                value={editStock}
                onChange={(e) => setEditStock(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Category</Form.Label>
              <Form.Control
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                value={editThumbnail}
                onChange={(e) => setEditThumbnail(e.target.value)}
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

export default DashboardProducts;
