import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addUser, deleteUser } from "../store/dashuserSlice";

function UsersDashboard() {
  const dispatch = useDispatch();
  const reduxUsers = useSelector((state) => state.dashuser.users);
  console.log(reduxUsers);
  const [apiUsers, setApiUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [editUsername, setEditUsername] = useState("");
  const [editAge, setEditAge] = useState("");
  const [editGender, setEditGender] = useState("");
  const [editDepartment, setEditDepartment] = useState("");

  // جلب المستخدمين من Dummy API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("https://dummyjson.com/users");
        setApiUsers(res.data.users);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // دمج كل المستخدمين للعرض
  const allUsers = [...apiUsers, ...reduxUsers];

  // فتح modal تعديل المستخدم
  const openEditModal = (user) => {
    setSelectedUser(user);
    setEditUsername(user.username || user.user);
    setEditAge(user.age);
    setEditGender(user.gender);
    setEditDepartment(user.company?.department || user.departmet);
    setShowEditModal(true);
  };

  // تعديل المستخدم
  const handleEdit = () => {
    const updatedUser = {
      ...selectedUser,
      username: editUsername,
      age: Number(editAge),
      gender: editGender,
      departmet: editDepartment,
      company: selectedUser.company
        ? { ...selectedUser.company, department: editDepartment }
        : undefined,
      user: selectedUser.user ? editUsername : undefined,
    };

    // تعديل فقط إذا المستخدم موجود في Redux
    if (reduxUsers.some((u) => u.id === selectedUser.id)) {
      dispatch(addUser(updatedUser)); // تحديث Redux
    } else {
      // تعديل مؤقت للـ API users فقط في state المحلي
      setApiUsers((prev) =>
        prev.map((u) => (u.id === selectedUser.id ? updatedUser : u))
      );
    }

    setShowEditModal(false);
  };

  // حذف المستخدم
  const handleDelete = (user) => {
    if (reduxUsers.some((u) => u.id === user.id)) {
      dispatch(deleteUser(user.id));
    } else {
      setApiUsers((prev) => prev.filter((u) => u.id !== user.id));
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
        <h1>Users</h1>
        <Button as={Link} to="/Dashbord/Users/Add">
          Add User
        </Button>
      </div>

      <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
        <Table striped bordered hover responsive className="align-middle">
          <thead className="table-dark">
            <tr>
              <th>Username</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user, index) => (
              <tr key={`${user.id}-${index}`}>
                <td>{user.username || user.user}</td>
                <td>{user.age}</td>
                <td>{user.gender}</td>
                <td>{user.company?.department || user.departmet}</td>
                <td>
                  <Button
                    variant="warning"
                    className="me-2"
                    onClick={() => openEditModal(user)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      setSelectedUser(user);
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
          <strong>{selectedUser?.username || selectedUser?.user}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => selectedUser && handleDelete(selectedUser)}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Username</Form.Label>
              <Form.Control
                value={editUsername}
                onChange={(e) => setEditUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                value={editAge}
                onChange={(e) => setEditAge(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Gender</Form.Label>
              <Form.Select
                value={editGender}
                onChange={(e) => setEditGender(e.target.value)}
              >
                <option>male</option>
                <option>female</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Department</Form.Label>
              <Form.Control
                value={editDepartment}
                onChange={(e) => setEditDepartment(e.target.value)}
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

export default UsersDashboard;
