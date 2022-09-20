import React,{useEffect} from "react";
import axios from "axios";

import DataTable from "react-data-table-component";

// A super simple expandable component.
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
