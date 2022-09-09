import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import DataTable from 'react-data-table-component'
import SearchBar from "../../Components/SearchBar/SearchBar";
import {
  ProductContainer,
  ProductNavContainer,
  ProductBody,
} from "./StyledProducts.js";

const columns = [
  {
    name:'ID',
    selector:'id',
    sortable:true
  },
  {
    name:'Nombre',
    selector:'name',
    sortable:true
  },
  {
    name:'Codigo',
    selector:'code',
    sortable:true
  },
  {
    name:'Precio',
    selector:'price',
    sortable:true
  },
  {
    name:'Costo',
    selector:'cost',
    sortable:true
  },
  {
    name:'Descripción',
    selector:'description',
    sortable:true
  },
  {
    name:'Imagen',
    selector:'image',
    sortable:true
  },
  {
    name:'Categoria',
    selector:'type',/* (row, index)=>{'type'} */
    sortable:true
  }
]

const paginationOptions = {
  rowsPerPageText: 'Filas por pagina',
  rangeSeparatorText: 'de',
  selectAllRowsItem:true,
  selectAllRowsItemText: 'Todos'
}

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
      <SearchBar/>
      <ProductBody>
        {/* <div className="table-responsive"> */}
        <DataTable 
        columns={columns}
        data={products}
        /* title='Productos' */
        pagination
        paginationComponentOptions={paginationOptions}
        fixedHeader
        fixedHeaderScrollHeight="80vh"
        />   
        {/* </div>    */}  
      </ProductBody>
    </ProductContainer>
  );
}
