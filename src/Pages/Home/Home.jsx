import axios from "axios";
import React, { useEffect } from "react";
import { Carousel, Form, Pagination } from "react-bootstrap";
import { useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { Row, Col } from "react-bootstrap";
import Loading from "../Loading/Loading";
import { imges } from "../../assets/img";
import Sorting from "../Sorting/Sorting";
import Footer from "../Footer/Footer";
function Home() {
  const theme = localStorage.getItem("theme") || "light";
  //store product
  const [category, setCategory] = useState([]);
  //selected value
  const [selected, setSelected] = useState("");
  //loading
  const [products, setProducts] = useState([]);
  //skip
  const [loading, setLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  //total
  const [total, setTotal] = useState(0);
  const limit = 8;
  //pages round up
  const pages = Math.ceil(total / limit);
  // console.log(pages);
  //current page
  const currentPage = skip / limit + 1;
  //handel change page
  function handleChangePage(page) {
    setSkip((page - 1) * limit);
  }
  async function seleced() {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://dummyjson.com/products/category-list"
      );
      setCategory(res.data);

      setSelected(res.data[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    seleced();
  }, []);

  useEffect(() => {
    async function getallproducts() {
      if (!selected) return;
      setLoading(true);
      try {
        //end point
        const res = await axios.get(
          `https://dummyjson.com/products/category/${selected}?limit=${limit}&skip=${skip}`
        );
        // console.log(res);
        //store product
        setProducts(res.data.products);
        //store total
        setTotal(res.data.total);
      } catch (error) {
        console.log(error.response.data.message);
      } finally {
        setLoading(false);
      }
    }
    getallproducts();
  }, [selected, skip]);
  {
  }
  if (loading) {
    return <Loading />;
  }
  // console.log(total, skip, limit);
  return (
    <div className="container my-3 py-3">
      <Carousel>
        {imges.map((item) => (
          <Carousel.Item key={item}>
            <img src={item} alt="" />
          </Carousel.Item>
        ))}
      </Carousel>
      <div className="mb-3 d-flex justify-content-between align-items-center gap-3 mt-3">
        <h1 className="text-center">Categories</h1>
        <Form>
          <Form.Select
            value={selected} // تحكم في الاختيار من خلال value
            onChange={(ev) => setSelected(ev.target.value)}
          >
            {category.map((item) => (
              <option key={item} value={item}>
                {item.toUpperCase()}
              </option>
            ))}
          </Form.Select>
        </Form>
      </div>
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
      {/* pagination */}

      <Pagination className="mt-3 justify-content-center">
        {/* {console.log(new Array(pages).fill().map((item, index) => index + 1))} */}
        {/* new array(pages)->return array length =pages->empty */}
        {/* new array (pages).fill(pages)->fill itemes same value pages */}
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
      <Sorting />
      <Footer />
    </div>
  );
}

export default Home;
