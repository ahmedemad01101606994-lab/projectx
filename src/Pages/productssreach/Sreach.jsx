import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import ProductCard from "../ProductCard/ProductCard";
import axios from "axios";
import { Form } from "react-bootstrap";
import Loading from "../Loading/Loading";
import { Pagination } from "react-bootstrap";
import { useParams } from "react-router-dom";
export default function Sreach() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const sreach = useParams().sreach;
  console.log(sreach);
  async function getallproducts() {
    try {
      const res = await axios.get(
        `https://dummyjson.com/products/search?q=${sreach}`
      );
      // console.log(res.data.products);
      setProducts(res.data.products);
      // console.log(res.data.products);
      // setTotal(res.data.total);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getallproducts();
  }, []);
  {
    if (loading) {
      return <Loading />;
    }
  }
  return (
    <div className=" min-vh-100 container my-3">
      <Row className="g-3">
        {products.map((product) => {
          return (
            <Col key={product.id} sm={12} md={4} lg={3}>
              <ProductCard product={product} />
            </Col>
          );
        })}
        {products.length === 0 && (
          <h1 className="w-100 text-danger justify-content-center text-center">
            No products found
          </h1>
        )}
      </Row>
    </div>
  );
}
