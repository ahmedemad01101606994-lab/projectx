import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { clearUser } from "../../store/userSlice";
import toast from "react-hot-toast";
function Logout() {
  const dispatch = useDispatch();
  function handlelogout() {
    dispatch(clearUser());
    localStorage.removeItem("user");
    toast.success("logout success");
  }
  return (
    <div>
      <Button variant="danger" onClick={handlelogout}>
        logout
      </Button>
    </div>
  );
}

export default Logout;
