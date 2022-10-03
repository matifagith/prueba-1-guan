import React,{useEffect} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";
import Creatable from "react-select/creatable";

// A super simple expandable component.
const ExpandedComponent = ({ data }) => (
  <pre>{JSON.stringify(data, null, 2)}</pre>
);

const selectValues=[
  {value:'golosina', label:'golosina'},
  {value:'herramientas', label:'herramientas'},
  {value:'ferreteria', label:'ferreteria'},
  {value:'cigarrillos', label:'cigarrillos'},
  {value:'limpieza', label:'limpieza'},
  {value:'bebidas', label:'bebidas'},
]

const categorias = [
  "golosina","herramientas","ferreteria","cigarrillos","limpieza","bebidas"
]

const abrirSwal = ()=>{
  Swal.fire({
    title: `Agregar nuevo producto`,
   /*  html: `
  <p><b>Nombre:</b><input type="text" id="name1" class="swal2-input" placeholder="Nombre"></p>
  <p><b>Codigo:</b><input type="text" id="code" class="swal2-input" placeholder="Codigo"></p>
  <p><b>Precio:</b><input type="number" id="price" class="swal2-input" placeholder="Precio"></p>
  <p><b>Costo:</b><input type="number" id="cost" class="swal2-input" placeholder="Costo"></p>
  <p><b>Descripcion:</b><input type="text" id="description" class="swal2-input" placeholder="Descripcion"></p>`, */
 /*  input: < Creatable
  isClearable
  defaultValue={{ label: "Elige una categoria" }}
  options={selectValues}
  onChange={(val)=>{console.log(field.name, val)}}
  />  */
  input: 'select',
  inputOptions:{
    categorias
  },
  inputPlaceholder: 'Categoria',  
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
    },
  })
}

const FilterComponent = () => {
  const [value, setValue] = React.useState("");

  return (
    <div>
      <input />
      <button onClick={() => console.log("borrando input value")}>x</button>
      <button onClick={()=>abrirSwal()}>Agregar</button>
    </div>
  );
};

const columns = [
  {
    name: "Title",
    selector: (row) => row.title,
  },
  {
    name: "Year",
    selector: (row) => row.year,
  },
];

const data = [];

export default function MyComponent() {
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const filteredItems = data.filter(
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
      <div>
        <FilterComponent
          onFilter={(e) => setFilterText(e.target.value)}
          onClear={handleClear}
          filterText={filterText}
        />
      </div>
    );
  }, [filterText, resetPaginationToggle]);



  const options = {
    method: 'GET',
    url: 'https://supermarketpurchasesapi.p.rapidapi.com/supermarketPurchases/getProductByName/glass',
    headers: {
      'X-RapidAPI-Key': '6daa9e02damshff8ddd73d1f7b26p1e573ajsn0120ef493152',
      'X-RapidAPI-Host': 'supermarketpurchasesapi.p.rapidapi.com'
    }
  };

  useEffect(()=>{
    axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
  })

  return (
    <DataTable
      title="Prueba"
      columns={columns}
      data={data}
      expandableRows
      expandableRowsComponent={ExpandedComponent}
      pagination
      paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
      subHeader
      subHeaderComponent={subHeaderComponentMemo}
      selectableRows
      persistTableHead
    />
  );
}
