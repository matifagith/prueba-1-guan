import React from "react";
import NavBar from "../../Components/NavBar/NavBar";
import {ProductContainer, ProductNavContainer, ProductBody} from './StyledProducts.js'

export default function Products(){
    return(
        <ProductContainer>
            <ProductNavContainer><NavBar/></ProductNavContainer>
            <ProductBody>Products</ProductBody>
        </ProductContainer>
    )
}