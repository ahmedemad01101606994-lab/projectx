import React from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { CiShoppingCart } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import {
  clearCart,
  decreasequantity,
  increasequantity,
  removeFromCart,
} from "../../../store/cartslice";
// import { store } from "../../../store/store";

function Cart() {
  const dispatch = useDispatch();
  const { cartItems, totalamount } = useSelector((state) => state.cart);
  //   console.log(cartItem);
  return (
    <div className=" container my-3 py-3">
      <div className=" min-vh-100 login">
        <h3 className=" d-flex align-items-center">
          <span className="text-primary">
            <CiShoppingCart className=" fs-1" />
          </span>
          Cart
        </h3>
        {cartItems.length == 0 ? (
          <h2 className=" shadow p-3 fs-4 d-flex justify-content-center align-items-center">
            Cart is Empty
          </h2>
        ) : (
          <>
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item.id}>
                  <Row className=" d-flex align-items-center">
                    <Col md={4}>
                      <div>
                        <img src={item.thumbnail} alt="" width={100} />
                      </div>
                      <h6>{item.title}</h6>
                      <h5>${item.price}</h5>
                    </Col>
                    <Col md={4} className="d-flex justify-content-center">
                      <Button
                        variant={
                          item.quantity == 1 ? "secondary" : "outline-secondary"
                        }
                        onClick={() => {
                          dispatch(decreasequantity(item.id));
                        }}
                        disabled={item.quantity == 1}
                      >
                        -
                      </Button>
                      <span className="mx-3 pt-1">{item.quantity}</span>
                      <Button
                        variant={
                          item.quantity == 1 ? "secondary" : "outline-secondary"
                        }
                        onClick={() => {
                          dispatch(increasequantity(item.id));
                        }}
                        disabled={item.stock == item.quantity}
                      >
                        +
                      </Button>
                    </Col>
                    <Col md={2}>
                      <p className="mb-0">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </Col>
                    <Col md={2}>
                      <Button
                        variant="outline-danger"
                        onClick={() => {
                          dispatch(removeFromCart(item.id));
                        }}
                      >
                        <MdOutlineRemoveShoppingCart />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <Card className="mt-3 p-3 shadow-sm">
              <h4 className="mb-0 ">Total:{totalamount.toFixed(2)}</h4>
              <Button
                variant="warning"
                onClick={() => {
                  dispatch(clearCart());
                }}
              >
                clear cart
              </Button>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
