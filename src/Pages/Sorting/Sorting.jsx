import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Dropdown, Row, Pagination } from "react-bootstrap";
import ProductCard from "../ProductCard/ProductCard";

function Sorting() {
  const data = ["price", "rating", "title"];
  const [sortBy, setSortBy] = useState("Rating");
  const [order, setOrder] = useState("desc");
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const theme = localStorage.getItem("theme") || "light";
  const limit = 8;
  const pages = Math.ceil(total / limit);
  const currentPage = skip / limit + 1;

  async function sortProducts() {
    try {
      const url = `https://dummyjson.com/products?sortBy=${sortBy}&order=${order}&limit=${limit}&skip=${skip}`;
      const res = await axios.get(url);
      setProducts(res.data.products);
      setTotal(res.data.total);
    } catch (error) {
      console.log(error);
    }
  }

  function handleChangePage(page) {
    setSkip((page - 1) * limit);
  }

  useEffect(() => {
    sortProducts();
  }, [sortBy, order, skip]);

  return (
    <div>
      <div className=" d-flex justify-content-between align-items-center mb-3">
        <div className=" fs-1">
          <h1>Sorting</h1>
        </div>
        <Dropdown className="my-2">
          <Dropdown.Toggle variant="success">Sort By: {sortBy}</Dropdown.Toggle>

          <Dropdown.Menu>
            {data.map((item) => (
              <Dropdown.Item key={item} onClick={() => setSortBy(item)}>
                {item}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <Row className="g-3">
        {products.map((product) => (
          <Col sm={6} md={4} lg={3} key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>

      <Pagination className="mt-3 justify-content-center">
        <Pagination.Prev
          disabled={currentPage === 1}
          onClick={() => handleChangePage(currentPage - 1)}
        />

        {new Array(pages).fill().map((_, index) => (
          <Pagination.Item
            key={index}
            active={currentPage === index + 1}
            onClick={() => handleChangePage(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}

        <Pagination.Next
          disabled={currentPage === pages}
          onClick={() => handleChangePage(currentPage + 1)}
        />
      </Pagination>
    </div>
  );
}

export default Sorting;
