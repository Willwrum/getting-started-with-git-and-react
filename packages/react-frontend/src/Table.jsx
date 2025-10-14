// src/Table.jsx
import React from "react";
function TableHeader() {
  return (
    <thead>
      <tr>
	<th>Id</th>
        <th>Name</th>
        <th>Job</th>
      </tr>
    </thead>
  );
}

function TableBody(props) {
  const rows = props.characterData.map((row, index) => {
    return (
      <tr key={row._id}>
	<td>{row._id}</td>
        <td>{row.name}</td>
        <td>{row.job}</td>
        <td>
          <button onClick={() => props.deleteCharacter(row._id, index)}>
            Delete
          </button>
        </td>
      </tr>
    );
  }
  );
  return (
    <tbody>
      {rows}
    </tbody>
  );
}

function Table(props) {
  return (
    <table>
      <TableHeader />
      <TableBody
        characterData={props.characterData}
        deleteCharacter={props.deleteCharacter}
      />
    </table>
  );
}

export default Table;
