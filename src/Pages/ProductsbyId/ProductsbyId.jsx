import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading/Loading";
import Rating from "../Rating/Rating";
import { Button, Card, CardBody, Col, Row } from "react-bootstrap";
import ProductCard from "../ProductCard/ProductCard";
import { Pagination } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartslice";
import { Container } from "react-bootstrap";
function ProductsbyId() {
  const dispatch = useDispatch();

  const [skip, setSkip] = useState(0);
  //total
  const [total, setTotal] = useState(0);
  const limit = 4;
  const apilimit = limit + 1;
  //pages round up
  const pages = Math.ceil(total / limit);
  // console.log(pages);
  //current page
  const currentPage = skip / limit + 1;
  //handel change page
  function handleChangePage(page) {
    setSkip((page - 1) * limit);
  }
  function handleAddToCart() {
    dispatch(addToCart(product));
    // toast.success("Added to cart 🛒");
  }
  const id = useParams().id;
  console.log(id);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [category, setCategory] = useState("");
  const [products, setProducts] = useState([]);
  async function showproduct() {
    try {
      const res = await axios.get(`https://dummyjson.com/products/${id}`);
      console.log(res.data);
      setProduct(res.data);
      setCategory(res.data.category);
      // console.log(category);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    showproduct();
  }, [id]);
  async function displaysamecategory() {
    if (!product.category) return;
    try {
      const res = await axios.get(
        `https://dummyjson.com/products/category/${product.category}?limit=${apilimit}&skip=${skip}`
      );
      const filtered = res.data.products
        .filter((p) => p.id !== product.id)
        .slice(0, limit);
      console.log(filtered);
      setProducts(filtered);

      setTotal(res.data.total - 1);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    displaysamecategory();
  }, [product.category, skip]);

  if (loading) {
    return <Loading />;
  }
  return (
    <Container>
      <div className="d-flex gap-3 align-items-center">
        <div>
          <img
            src={product.thumbnail}
            alt={product.title}
            className="img-fluid rounded"
            style={{ maxWidth: "300px" }}
          />
        </div>
        <div>
          <h1>{product.title}</h1>
          <h2>
            <Rating rating={product.rating} />
          </h2>
          <h3>${product.price}</h3>
          <h4>
            Availability:
            <span
              className={product.stock > 0 ? "text-primary" : "text-danger"}
            >
              {product.stock > 0 ? " In stock" : " Out of stock"}
            </span>
          </h4>

          {product.brand && (
            <h5>
              Brand:
              <span className=" text-primary">{product.brand}</span>
            </h5>
          )}
          <p>{product.description}</p>
          <Button onClick={handleAddToCart} variant="success">
            Add to Cart
          </Button>
        </div>
        z\
      </div>
      <div>
        <h1>Similar Products</h1>
        <Row className="g-2">
          {products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product.id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
        <Pagination className="mt-3 justify-content-center">
          {currentPage !== 1 && (
            <Pagination.First onClick={() => handleChangePage(1)} />
          )}
          <Pagination.Prev
            onClick={() => handleChangePage(currentPage - 1)}
            disabled={currentPage == 1}
          ></Pagination.Prev>
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
            disabled={currentPage == pages}
            onClick={() => handleChangePage(currentPage + 1)}
          ></Pagination.Next>
          {currentPage !== pages && (
            <Pagination.Last onClick={() => handleChangePage(pages)} />
          )}
        </Pagination>
      </div>
    </Container>
  );
}

export default ProductsbyId;
