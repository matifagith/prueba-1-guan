import React, { useEffect, useState } from "react";
/* import NavBar from "../../Components/NavBar/NavBar"; */
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import DataTable from "react-data-table-component";
import SearchBar from "../../Components/SearchBar/SearchBar";
import Swal from "sweetalert2";
import uploadcare from "uploadcare-widget";
/* /uploadcare.lang.es.min.js */
import {
  ProductContainer,
  ProductNavContainer,
  ProductBody,
  ProductBar,
} from "./StyledProducts.js";

/* const ExpandedComponent = (  ) => <pre>{JSON.stringify(data, null, 2)}</pre>; REVISAR */
const EditButton = () => <button type="button">Editar </button>;

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
  const [types, setTypes] = useState([]);
  const [deleteProducts, setDeleteProducts] = useState([]);
  const [pending, setPending] = useState(true);
  const [papelera, setPapelera] = useState(false);

  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);

  //SEARCH BAR
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [search, setSearch] = useState("");

  const Select = () => {
    return <p>Categoria</p>;
  };

  const getProductsByType = async(t) =>{
    setPending(true);
    await axios
      .get(`/productget/filtered?type=${t}&deleted=${papelera}`)
      .then((r) => {
        setProduct(r.data);
      })
      .then(() => setPending(false));
  }

  const handleFilterByType = (e) =>{
    e.preventDefault()
    const products =  getProductsByType(e.target.value)
    console.log(e.target.value)
  }

  const columns = [
    /* {
      button: true,
      cell: () => <EditButton>Download Poster</EditButton>,
    }, */

    !papelera && {
      cell: (row) => (
        <button
          onClick={
            () => {
              Swal.fire({
                title: `Editar producto`,
                html: `
            <p><b>Nombre:</b><input type="text" id="name1" class="swal2-input" placeholder=${row.name}></p>
            <p><b>Codigo:</b><input type="text" id="code" class="swal2-input" placeholder=${row.code}></p>
            <p><b>Precio:</b><input type="number" id="price" class="swal2-input" placeholder=${row.price}></p>
            <p><b>Costo:</b><input type="number" id="cost" class="swal2-input" placeholder=${row.cost}></p>
            <p><b>Descripcion:</b><input type="text" id="description" class="swal2-input" placeholder=${row.description}></p>
            <p><b>Categoria:</b><input type="text" id="type" class="swal2-input" placeholder=${row.type}></p>
            <p><b>Imagen:</b><input
            type="hidden"
            id="image"
            role="uploadcare-uploader"
            data-public-key="demopublickey"
            data-tabs="file camera url facebook gdrive gphotos"
            /></p>`,
                confirmButtonText: "Editar",
                focusConfirm: false,
                showCancelButton: true,
                cancelButtonText: "Cancelar",
                cancelButtonColor: "#d33",
                preConfirm: () => {
                  const name1 = Swal.getPopup().querySelector("#name1").value;
                  const code = Swal.getPopup().querySelector("#code").value;
                  const price = Swal.getPopup().querySelector("#price").value;
                  const cost = Swal.getPopup().querySelector("#cost").value;
                  const description =
                    Swal.getPopup().querySelector("#description").value;
                  const image = Swal.getPopup().querySelector("#image").value;
                  const type = Swal.getPopup().querySelector("#type").value;
                  /*  if (
                !name1 ||
                !code ||
                !price ||
                !cost ||
                !description ||
                !type
              ) {
                Swal.showValidationMessage(
                  `nombre, codigo, precio, costo, descripcion y categoria son requeridos`
                );
              } */
                  /* if (password1 !== password2) {
                Swal.showValidationMessage(`Las contraseñas no coinciden`);
              }
              if (!password1.length || !password2.length) {
                Swal.showValidationMessage(`Debes completar los campos`);
              } */
                },
              }).then((result) => {
                //console.log('password1',  password1.value)
                if (result.isConfirmed) {
                  const productEdited = {
                    name: name1.value.toLowerCase() || row.name,
                    price: price.value || row.price,
                    cost: cost.value || row.cost,
                    code: code.value.toLowerCase() || row.code,
                    description:
                      description.value.toLowerCase() ||
                      row.description.toLowerCase(),
                    type: type.value.toLowerCase() || row.type.toLowerCase(),
                    image: image.value || row.image,
                    id: row.id,
                  };
                  /* console.log("productCreated", productEdited); */
                  axios
                    .put(`productput/updateproduct`, productEdited)
                    .then(
                      Swal.fire(
                        "Excelente",
                        "Tu producto ha sido editado correctamente",
                        "success"
                      ).then(async () => await getProductsFromDb())
                    )
                    .catch((e) => {
                      /* console.log(e.data); */
                      Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Algo salio mal",
                      });
                    });
                }
              });
            } /* clickHandler */
          }
          id={row.id}
        >
          Editar
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    /*  {
          cell: (row) => (
            <button
              onClick={() => {
               ;
              }}
            >
              Eliminar
            </button>
          ),
        }, */
    /*  {
      name: "ID",
      selector: (row) => row.id,
      sortable: false,
      wrap: true,
      // format: (row) => `${row.id.slice(0, 500)}`,
    }, */
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
        <>
          <img
            onClick={() => {
              Swal.fire({
                title: `${row.name}`,
                html: `<img src=${row.image} alt=${row.name} height='200px' width='200px'/>`,
              });
            }}
            alt={row.name}
            src={row.image}
            style={{
              height: "84px",
              width: "56px",
              padding: "2px",
              backgroundColor: "black",
              borderRadius: "10px",
            }}
          />
          {/* <button
            onClick={() => {
              Swal.fire({
                title: `${row.name}`,
                html: `<img src=${row.image} alt=${row.name} height='200px' width='200px'/>`,
              });
            }}
          >
            ver
          </button> */}
        </>
      ),
      sortable: false,
    },
    {
      name: (
        <select  onChange={(e) => handleFilterByType(e)}>
          <option value="default">Todas categorias</option>
          {types?.map((t, i) => {
            return (
              <option value={t} key={i}>
                {t[0].toUpperCase() + t.slice(1)}
              </option>
            );
          })}
        </select>
      ),
      selector: (row) => row.type /* (row, index)=>{'type'} */,
      sortable: true,
    },
    /*  {
      button: true,
      cell: () => <DeleteButton>Download Poster</DeleteButton>,
    }, */
  ];

  const getProductsFromDb = async () => {
    setPending(true);
    setSearch("");
    await axios
      .get(`/productget?deleted=${papelera}`)
      .then((r) => setProduct(r.data))
      .then(() => setPending(false));
    /* .catch((e) => console.log(e.data)); */
  };

  const getProductsFromDbByNameOrCode = async (name) => {
    setPending(true);
    await axios
      .get(`/productget?name=${name.toLowerCase()}&deleted=${papelera}`)
      .then((r) => {
        setProduct(r.data);
      })
      .then(() => setPending(false));
    /* .catch((e) => console.log(e.data)); */
  };

  const getTypesFromDb = async () => {
    await axios.get(`/productget/types?deleted=${papelera}`).then((r) => {
      setTypes(r.data);
    });
  };

  useEffect(() => {
    getProductsFromDb();
    getTypesFromDb();
  }, [papelera]);

  useEffect(() => {
    getProductsFromDbByNameOrCode(search.toLowerCase());
  }, [search]);

  const handleChange = ({ selectedRows }) => {
    // You can set state or dispatch with something like Redux so we can use the retrieved data
    setSelectedProducts(selectedRows);
    /*  console.log("Selected Rows: ", selectedRows); */
  };

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const deletedProducts = async (id) => {
    /*  console.log("Entre a deletedProducts con id:", id); */
    await axios
      .put(
        `productput/logicdelete?action=${papelera ? "undelete" : "delete"}`,
        { id }
      )
      .then((r) => {
        /*      console.log(r.data); */
      })

      .then(() =>
        Swal.fire(
          "Excelente!",
          id.length === 1
            ? `El producto fue ${
                papelera ? "restablecido" : "borrado"
              } correctamente.`
            : `Los productos fueron ${
                papelera ? "restablecidos" : "borrados"
              } correctamente.`,
          "success"
        )
      )
      .then(async () => await getProductsFromDb())
      .catch((e) => {
        /*     console.log(e); */
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Algo salio mal",
        });
      });
  };

  const deletedProductsForGood = async (id) => {
    /*  console.log("Entre a deletedProductsForGood con id:", id); */
    const url = "/productdelete";
    const config = {
      url,
      method: "DELETE",
      data: {
        id: id,
      },
    };
    /* console.log("id.length",id.length) */
    const res = await axios(config)
      .then(
        Swal.fire(
          "Excelente",
          id.length === 1
            ? "El produto ha sido eliminado definitivamente"
            : "Los produtos han sido eliminados definitivamente",
          "success"
        )
      )
      .then(async () => await getProductsFromDb())

      .catch((e) => {
        /*   console.log("catch response:", e); */
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Algo salio mal",
        });
      });
  };

  const contextActions = React.useMemo(() => {
    const handleDelete = (action) => {
      Swal.fire({
        title: `Seguro que quiere ${
          action === "borrar"
            ? "borrar"
            : action === "restablecer"
            ? "restablecer"
            : action === "eliminar" && "eliminar definitivamente"
        }:\r ${selectedRows.map((r) => r.name)}?`,
        text: `${
          action === "borrar"
            ? `Si quiere restablecer ${
                selectedRows.map((r) => r.name).length === 1
                  ? "el producto"
                  : "los productos"
              } vaya a la papelera`
            : ""
        }`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: `${
          action === "borrar"
            ? "Borrar"
            : action === "restablecer"
            ? "Restablecer"
            : action === "eliminar" && "Eliminar"
        }`,
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        /*  console.log("result:", result);
        console.log("action:", action); */
        if (result.isConfirmed) {
          setToggleCleared(!toggleCleared);
          const arrId = selectedRows.map((r) => r.id);
          if (action === "borrar" || action === "restablecer") {
            await deletedProducts(arrId);
          }
          if (action === "eliminar") {
            await deletedProductsForGood(arrId);
          }
        }
      });
    };

    return (
      <>
        {!papelera ? (
          <button
            key="delete"
            onClick={() => handleDelete("borrar")}
            style={{ backgroundColor: "red" }}
            icon
          >
            Borrar
          </button>
        ) : (
          <>
            <button
              key="delete"
              onClick={() => handleDelete("restablecer")}
              style={{ backgroundColor: "green" }}
              icon
            >
              Restablecer
            </button>
            <button
              key="eliminar"
              onClick={() => handleDelete("eliminar")}
              style={{ backgroundColor: "red", marginLeft: "5px" }}
              icon
            >
              Eliminar
            </button>
          </>
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
      {/* {console.log(products)} */}
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
          title={!papelera ? "Productos - Inventario" : "Productos - Papelera"}
          columns={columns}
          data={filteredItems}
          noDataComponent={
            !papelera && search.length === 0
              ? "El inventario esta vacio"
              : !papelera && search.length > 0
              ? "No hay productos con ese nombre o codigo"
              : papelera && search.length === 0
              ? "La papelera esta vacia"
              : papelera &&
                search.length > 0 &&
                "No hay productos con ese nombre o codigo"
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
          // expandableRows
          expandableRowsComponent={ExpandedComponent}
          pagination
          paginationComponentOptions={paginationOptions}
          fixedHeader
          fixedHeaderScrollHeight="71.5vh" /* calc(100vh - 164px) */
          /* dense */
          highlightOnHover
          pointerOnHover
          /* actions={actionsMemo} */
          //SEARCH BAR
          paginationResetDefaultPage={resetPaginationToggle}
          subHeader
          subHeaderComponent={
            /* subHeaderComponentMemo */
            <div
              style={{
                display: "flex",
                justifyContent: "space",
                alignItems: "center",
              }}
            >
              {!papelera && (
                <button
                  style={{ fontSize: "initial", marginRight: "10px" }}
                  onClick={() => {
                    Swal.fire({
                      title: `Agregar nuevo producto`,
                      html: `
                    <p><b>Nombre:</b><input type="text" id="name1" class="swal2-input" placeholder="Nombre"></p>
                    <p><b>Codigo:</b><input type="text" id="code" class="swal2-input" placeholder="Codigo"></p>
                    <p><b>Precio:</b><input type="number" id="price" class="swal2-input" placeholder="Precio"></p>
                    <p><b>Costo:</b><input type="number" id="cost" class="swal2-input" placeholder="Costo"></p>
                    <p><b>Descripcion:</b><input type="text" id="description" class="swal2-input" placeholder="Descripcion"></p>
                    <p><b>Categoria:</b><input type="text" id="type" class="swal2-input" placeholder="Categoria"></p>
                    <p><b>Imagen:</b>
                    <input
                    type="hidden"
                    id="image"
                    role="uploadcare-uploader"
                    data-public-key="demopublickey"
                    data-images-only="true"
                    data-tabs="file camera url gdrive gphotos"
                    /></p>`,
                      confirmButtonText: "Agregar",
                      focusConfirm: false,
                      showCancelButton: true,
                      cancelButtonText: "Cancelar",
                      cancelButtonColor: "#d33",
                      preConfirm: () => {
                        const name1 =
                          Swal.getPopup().querySelector("#name1").value;
                        const code =
                          Swal.getPopup().querySelector("#code").value;
                        const price =
                          Swal.getPopup().querySelector("#price").value;
                        const cost =
                          Swal.getPopup().querySelector("#cost").value;
                        const description =
                          Swal.getPopup().querySelector("#description").value;
                        const image =
                          Swal.getPopup().querySelector("#image").value;
                        const type =
                          Swal.getPopup().querySelector("#type").value;
                        if (
                          !name1 ||
                          !code ||
                          !price ||
                          !cost ||
                          !description ||
                          !type
                        ) {
                          Swal.showValidationMessage(
                            `nombre, codigo, precio, costo, descripcion y categoria son requeridos`
                          );
                        }
                        /* if (password1 !== password2) {
                        Swal.showValidationMessage(`Las contraseñas no coinciden`);
                      }
                      if (!password1.length || !password2.length) {
                        Swal.showValidationMessage(`Debes completar los campos`);
                      } */
                      },
                    }).then((result) => {
                      //console.log('password1',  password1.value)
                      if (result.isConfirmed) {
                        const productCreated = {
                          name: name1.value.toLowerCase(),
                          price: price.value,
                          cost: cost.value,
                          code: code.value.toLowerCase(),
                          description: description.value.toLowerCase(),
                          type: type.value.toLowerCase(),
                          image: image.value,
                        };
                        /*   console.log("productCreated", productCreated); */
                        axios
                          .post(`/productpost`, productCreated)
                          .then(
                            Swal.fire(
                              "Excelente",
                              "Tu producto ha sido creado correctamente",
                              "success"
                            ).then(async () => await getProductsFromDb())
                          )
                          .catch((e) => {
                            /*    console.log(e.data); */
                            Swal.fire({
                              icon: "error",
                              title: "Oops...",
                              text: "Algo salio mal",
                            });
                          });
                      }
                    });
                  }}
                >
                  Agregar producto
                </button>
              )}
              <button
                style={{ fontSize: "initial" }}
                onClick={() => {
                  setToggleCleared(!toggleCleared);
                  setPapelera(!papelera);
                  setSearch("");
                }}
              >
                {papelera ? "Ir a Inventario" : "Ir a Papelera"}
              </button>
              {/* {console.log("papelera", papelera)} */}
              <input
                style={{
                  marginLeft: "10px",
                  fontFamily: "none",
                  fontSize: "initial",
                  lineHeight: "inherit",
                }}
                type="text"
                placeholder="buscar por nombre o codigo"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                style={{
                  fontSize: "initial",
                  padding: "5px 5px",
                  marginLeft: "4px",
                }}
                onClick={() => setSearch("")}
              >
                x
              </button>
            </div>
          }
          persistTableHead
          theme="default" // 'dark'
        />
      </ProductBody>
    </ProductContainer>
  );
}
