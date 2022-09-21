import React, { useEffect, useState } from "react";
/* import NavBar from "../../Components/NavBar/NavBar"; */
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
const EditButton = () => <button type="button">Editar </button>;

const columns = [
  /* {
    button: true,
    cell: () => <EditButton>Download Poster</EditButton>,
  }, */
  {
    cell: (row) => (
      <button
        onClick={() => console.log(row.id) /* clickHandler */}
        id={row.id}
      >
        Editar
      </button>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
  {
    name: "ID",
    selector: (row) => row.id,
    sortable: false,
    wrap: true,
    /* format: (row) => `${row.id.slice(0, 500)}`, */
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
    /* https://stackoverflow.com/questions/61691369/input-fields-of-react-data-table-losing-focus-after-typing */
    name: "Precio",
    selector: (row) => row.price,
    /* cell: (row) => (
      <input
        name={`Precio`}
        id={row.id}
        data={row.price}
        onChange={(e) => console.log(e.target.value)}
        type="text"
        value={row.price}
      />
    ), */
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

const FilterComponent = () => {
  const [value, setValue] = React.useState("");

  return (
    <div>
      <input />
      <button onClick={() => console.log("borrando input value")}>x</button>
    </div>
  );
};

export default function Products() {
  const [products, setProduct] = useState([]);
  const [deleteProducts, setDeleteProducts] = useState([]);
  const [pending, setPending] = useState(true);
  const [papelera, setPapelera] = useState(false);

  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);

  //SEARCH BAR
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [search, setSearch] = useState("");

  const getProductsFromDb = async () => {
    await axios
      .get(`/productget?deleted=${papelera}`)
      .then((r) => {
        setProduct(r.data);
        setPending(false);
      })
      .catch((e) => console.log(e.data));
  };

  const getProductsFromDbByNameOrCode = async (name) => {
    setPending(true);
    await axios
      .get(`/productget?name=${name}&deleted=${papelera}`)
      .then((r) => {
        setProduct(r.data);
        setPending(false);
      })
      .catch((e) => console.log(e.data));
  };

  useEffect(() => {
    setPending(true);
    getProductsFromDb();
  }, [papelera]);

  useEffect(() => {
    getProductsFromDbByNameOrCode(search.toLowerCase());
  }, [search]);

  const handleChange = ({ selectedRows }) => {
    // You can set state or dispatch with something like Redux so we can use the retrieved data
    setSelectedProducts(selectedRows);
    console.log("Selected Rows: ", selectedRows);
  };

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const deletedProducts = async (id) => {
    console.log("id front", id);
    await axios
      .put(
        `productput/logicdelete?action=${papelera ? "undelete" : "delete"}`,
        { id }
      )
      .then((r) => {
        console.log(r.data);
      })
      .then(setSearch(""))
      .then(setPending(true))
      .then(getProductsFromDb())
      .catch((e) => console.log(e.data));
  };

  const contextActions = React.useMemo(() => {
    const handleDelete = () => {
      if (
        window.confirm(
          `Seguro que quiere ${papelera?'restablecer':'borrar'}:\r ${selectedRows.map((r) => r.name)}?`
        )
      ) {
        setToggleCleared(!toggleCleared);
        console.log(selectedRows.map((e) => e.id));
        /* setDeleteProducts(differenceBy(deleteProducts, selectedRows, "name")); */
        const arrId = selectedRows.map((r) => r.id);
        deletedProducts(arrId);
      }
    };

    return (
      <>
        {!papelera ? (
          <button
            key="delete"
            onClick={handleDelete}
            style={{ backgroundColor: "red" }}
            icon
          >
            Eliminar
          </button>
        ) : (
          <button
            key="delete"
            onClick={handleDelete}
            style={{ backgroundColor: "green" }}
            icon
          >
            Restablecer
          </button>
        )}
      </>
    );
  }, [deleteProducts, selectedRows, toggleCleared]);

  /* const actionsMemo = React.useMemo(() => <Export onExport={() => downloadCSV(data)} />, []); */

  const filteredItems = products.filter(
    (item) =>
      item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <ProductContainer>
      {console.log(products)}
      {/* {console.log(DataTable.selectAllRowsItem)} */}
      {/* <ProductNavContainer>
        <NavBar />
      </ProductNavContainer> */}
      {/* <ProductBar>
        <SearchBar />
        <h3>Agregar producto</h3>        
      </ProductBar> */}
      <ProductBody>
        {/* <div className="table-responsive"> */}
        <DataTable
          title="Productos"
          columns={columns}
          data={filteredItems}
          noDataComponent={
            papelera
              ? "La papelera esta vacia"
              : "No hay productos con ese nombre o codigo"
          }
          //LOADING
          progressPending={pending}
          /* progressComponent={<CustomLoader />} */
          selectableRows
          selectableRowsHighlight
          contextActions={contextActions}
          onSelectedRowsChange={handleRowSelected}
          clearSelectedRows={toggleCleared}
          //VISUALIZAR MAS INFO
          expandableRows
          expandableRowsComponent={ExpandedComponent}
          pagination
          paginationComponentOptions={paginationOptions}
          fixedHeader
          fixedHeaderScrollHeight="71.5vh"/* calc(100vh - 164px) */
          /* dense */
          highlightOnHover
          pointerOnHover
          /* actions={actionsMemo} */
          //SEARCH BAR
          paginationResetDefaultPage={resetPaginationToggle}
          subHeader
          subHeaderComponent={
            /* subHeaderComponentMemo */ <div style={{display:"flex", justifyContent:"space", alignItems:"center"}}>
              <button
               style={{  fontSize: "initial"}} 
                onClick={() => {
                  setPapelera(!papelera);
                }}
              >
                {papelera ? "Ir a Inventario" : "Ir a Papelera"}
              </button>
              {console.log("papelera", papelera)}
              <input
                style={{ 
                  marginLeft:"10px",
                  fontFamily: "none",
                  fontSize: "initial",
                  lineHeight: "inherit" }} 
                type="text"
                placeholder="buscar por nombre o codigo"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          }


        


          persistTableHead
          theme="default" // 'dark'
        />
      </ProductBody>
    </ProductContainer>
  );
}
