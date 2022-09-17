import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import DataTable from "react-data-table-component";
import SearchBar from "../../Components/SearchBar/SearchBar";
import {
  ProductContainer,
  ProductNavContainer,
  ProductBody,
  ProductBar,
} from "./StyledProducts.js";

/* const ExpandedComponent = (  ) => <pre>{JSON.stringify(data, null, 2)}</pre>; REVISAR */
const EditButton = () => <button type="button">Editar</button>;

const columns = [
  {
    name: "ID",
    selector: (row) => row.id,
    sortable: false,
    wrap: true,
    format: (row) => `${row.id.slice(0, 500)}`,
  },
  {
    name: "Nombre",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Codigo",
    selector: (row) => row.code,
    sortable: true,
  },
  {
    name: "Precio",
    selector: (row) => row.price,
    sortable: true,
  },
  {
    name: "Costo",
    selector: (row) => row.cost,
    sortable: true,
  },
  {
    name: "Descripción",
    selector: (row) => row.description,
    sortable: false,
    wrap: true,
    format: (row) => `${row.description.slice(0, 500)}`,
  },
  {
    name: "Imagen",
    cell: (row) => (
      <img height="84px" width="56px" alt={row.name} src={row.image} />
    ),
    sortable: false,
  },
  {
    name: "Categoria",
    selector: (row) => row.type /* (row, index)=>{'type'} */,
    sortable: true,
  },
  {
    button: true,
    cell: () => <EditButton>Download Poster</EditButton>,
  },
  /*  {
    button: true,
    cell: () => <DeleteButton>Download Poster</DeleteButton>,
  }, */
];

const paginationOptions = {
  rowsPerPageText: "Filas por pagina",
  rangeSeparatorText: "de",
  selectAllRowsItem: true,
  selectAllRowsItemText: "Todos",
};
const ExpandedComponent = ({ data }) => (
  <pre>{JSON.stringify(data, null, 2)}</pre>
);

const FilterComponent = () =>{

  const [value, setValue] = React.useState('');

  return(
      <div>
          <input />
          <button onClick={()=>console.log('borrando input value')}>x</button>
      </div>
  )
}

export default function Products() {
  const [products, setProduct] = useState([]);
  const [pending, setPending] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);

  //SEARCH BAR
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  useEffect(() => {
    axios.get(`/productget`).then((r) => {
      setProduct(r.data);
      setPending(false);
    });
  }, []);

  /*  const handleChange = ({ selectedRows }) => {
    // You can set state or dispatch with something like Redux so we can use the retrieved data
    setSelectedProducts(selectedRows)
    console.log('Selected Rows: ', selectedRows);
  }; */

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const contextActions = React.useMemo(() => {
    const handleDelete = () => {
      if (
        window.confirm(
          `Seguro que quiere borrar:\r ${selectedRows.map((r) => r.name)}?`
        )
      ) {
        setToggleCleared(!toggleCleared);
        setProduct(differenceBy(products, selectedRows, "name"));
      }
    };

    return (
      <button
        key="delete"
        onClick={handleDelete}
        style={{ backgroundColor: "red" }}
        icon
      >
        Delete
      </button>
    );
  }, [products, selectedRows, toggleCleared]);

  /* const actionsMemo = React.useMemo(() => <Export onExport={() => downloadCSV(data)} />, []); */

   const filteredItems = products.filter(
		item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
	); 

   const subHeaderComponentMemo = React.useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle);
				setFilterText('');
			}
		};

		return (
			<FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
		);
	}, [filterText, resetPaginationToggle]); 

  return (
    <ProductContainer>
      {console.log(products)}
      {/* {console.log(DataTable.selectAllRowsItem)} */}
      <ProductNavContainer>
        <NavBar />
      </ProductNavContainer>
      {/* <ProductBar>
        <SearchBar />
        <h3>Agregar producto</h3>        
      </ProductBar> */}
      <ProductBody>
        {/* <div className="table-responsive"> */}
        <DataTable
          title="Productos"
          columns={columns}
          data={products}
          progressPending={pending} //LOADING
          /* progressComponent={<CustomLoader />} */
          selectableRows
          contextActions={contextActions}
          onSelectedRowsChange={handleRowSelected}
          clearSelectedRows={toggleCleared}
          expandableRows
          expandableRowsComponent={ExpandedComponent}
          /* expandableRowsComponent={ExpandedComponent} REVISAR  */
          pagination
          paginationComponentOptions={paginationOptions}
          fixedHeader
          fixedHeaderScrollHeight="80vh"
          /* dense */
          highlightOnHover
          pointerOnHover
          /* actions={actionsMemo} */
          //SEARCH BAR
          paginationResetDefaultPage={resetPaginationToggle}
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          persistTableHead
          theme="default" // 'dark'          
        />
      </ProductBody>
    </ProductContainer>
  );
}
