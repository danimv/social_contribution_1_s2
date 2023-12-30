import React from 'react';

const DataTable = ({ data }) => {
  console.log(data);
  return (
    <table>
      <tbody>
      {data && data.map((value, index) => (
        <tr key={index}>
          <td>{value}</td>
        </tr>
      ))}
      </tbody>
    </table>
  );
};

export default DataTable;
