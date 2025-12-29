import React, { use } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ProductsbyId from "../ProductsbyId/ProductsbyId";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartslice";
import StarRating from "../Rating/Rating";
import "./style.css";

function ProductCard({ product }) {
  // console.log(product.stock);
  const navigate = useNavigate();
  function handleshoemore() {
    navigate(`/products/${product.id}`);
  }
  const dispatch = useDispatch();
  function handleaddtocart() {
    dispatch(addToCart(product));
  }
  return (
    <div className=" align-items-stretch h-100 shadow-sm  ">
      <Card className="h-100">
        <Card.Img
          variant="top"
          src={product.thumbnail}
          alt={product.title}
          className="product-img"
        />
        <Card.Body>
          <Card.Title>
            {product.title.split(" ").slice(0, 2).join(" ")}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-danger">
            {product.category.toUpperCase()}
          </Card.Subtitle>
          <Card.Text className="">
            <h6>price:${product.price}</h6>
            <span className=" d-flex gap-1 align-items-center">
              Rating:
              <StarRating rating={product.rating} />
            </span>
          </Card.Text>
        </Card.Body>
        <Card.Footer className=" d-flex justify-content-between align-items-center">
          <Button variant="outline-warning" onClick={handleshoemore}>
            Show More
          </Button>
          {product.stock > 0 ? (
            <Button variant="success" onClick={handleaddtocart}>
              Add to Cart
            </Button>
          ) : (
            <Button variant="secondary" disabled>
              out of Stock
            </Button>
          )}
        </Card.Footer>
      </Card>
    </div>
  );
}

export default ProductCard;
