import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import ProductCard from "../ProductCard/ProductCard";
import axios from "axios";
import { Form } from "react-bootstrap";
import Loading from "../Loading/Loading";
import { Pagination } from "react-bootstrap";
import { useParams } from "react-router-dom";
export default function Products() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  // const id = useParams;
  // console.log(id);
  async function getallproducts() {
    try {
      const res = await axios.get("https://dummyjson.com/products");
      // console.log(res.data.products);
      setProducts(res.data.products);
      // console.log(res.data.products);
      setTotal(res.data.total);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getallproducts();
  }, [search]);
  {
    if (loading) {
      return <Loading />;
    }
  }
  return (
    <div className=" container my-3">
      <div className="d-flex justify-content-between align-items-center gap-2">
        <h1>Latest Products</h1>
      </div>
      <Row className="g-3">
        {products.map((product) => {
          return (
            <Col key={product.id} sm={12} md={4} lg={3}>
              <ProductCard product={product} />
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
