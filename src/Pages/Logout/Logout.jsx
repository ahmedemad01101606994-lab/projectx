import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { clearuser } from "../../store/userSlice";
import toast from "react-hot-toast";
function Logout() {
  const dispatch = useDispatch();
  function handlelogout() {
    dispatch(clearuser());
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
