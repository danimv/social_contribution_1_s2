import React from 'react';

const DataTable = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
        {data.columnNames.map((columnName, index) => (
              <th key={index}>{columnName}</th>
            ))}
        </tr>
      </thead>
      <tbody>
        {data.map((record, index) => (
          <tr key={index}>
            <td>{record.field}</td>
            <td>{record.value}</td>
            <td>
              <img src={record.imageUrl} alt={`Image for ${record.field}`} style={{ maxWidth: '100px' }} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
