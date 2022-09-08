import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import axios from 'axios'
import {
  ProductContainer,
  ProductNavContainer,
  ProductBody,
} from "./StyledProducts.js";

export default function Products() {
  const [products, setProduct] = useState([]);
  useEffect(() => {
    axios
      .get(`/productget`)
      .then((r) => setProduct(r.data));      
  }, []);

  return (
    <ProductContainer>
        {console.log(products)}
      <ProductNavContainer>
        <NavBar />
      </ProductNavContainer>
      <ProductBody>Products</ProductBody>
    </ProductContainer>
  );
}
