import { use, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Pages/Navbar";
import Login from "./Pages/Login/Login";
import Loading from "./Pages/Loading/Loading";
import { Toaster, toast } from "react-hot-toast";
import Home from "./Pages/Home/Home";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import Products from "./Pages/Products/Products";
import { setUser, clearUser } from "./store/userSlice";
import ProductsbyId from "./Pages/ProductsbyId/ProductsbyId";
import Cart from "./Pages/Home/Cart/Cart";
import "./App.css";
import Sreach from "./Pages/productssreach/sreach";
import Dashbord from "./Pages/Dashbord/Dashbord";
import Users from "./Users/Users";
import DashboardProducts from "./DashboardProducts/DashboardProducts";
import AddProduct from "./DashboardProducts/AddProduct";
import Adduser from "./Users/Adduser";
import Carts from "./carts/Carts";
import Addcarts from "./carts/Addcarts";
function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const islogined = useSelector((state) => state.user.islogined);

  useEffect(() => {
    async function checkme() {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
          const token = user.accessToken;
          const res = await axios.get("https://dummyjson.com/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          dispatch(setUser(res.data));
        }
      } catch (error) {
        toast.error(error?.response?.data?.message);
        dispatch(clearUser());
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    }
    checkme();
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div data-bs-theme={theme} className={theme}>
      <Toaster position="bottom-center" />
      <Header theme={theme} setTheme={setTheme} />
      <Routes>
        {!islogined && <Route path="/Login" element={<Login />} />}
        <Route path="/" element={<Home theme={theme} setTheme={setTheme} />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" Component={ProductsbyId} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Sreach/:sreach" Component={Sreach} />
        {/* <Route path="/Dashbord" element={<Dashbord />} /> */}
        <Route path="/Dashbord" element={<Dashbord />}>
          <Route index element={<DashboardProducts />} />
          <Route path="products" element={<DashboardProducts />} />
          <Route path="products/Add" element={<AddProduct />} />
          <Route path="Users" element={<Users />} />
          <Route path="Users/Add" element={<Adduser />} />
          <Route path="carts" element={<Carts />} />
          <Route path="Carts/Add" element={<Addcarts />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
