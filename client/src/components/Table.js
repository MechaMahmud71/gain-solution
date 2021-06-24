import React from 'react'

const Table = ({value}) => {

  const subjects=value.subjects.map(el=><span>{el.name}</span>)
  console.log(subjects)

  return (
    <>
      <tbody>
          <tr>
            <td>{value.name}</td>
            <td>{value.email}</td>
            <td>{value.phone}</td>
            <td>{value.dateOfBirth}</td>
            <td>{subjects}</td>
          </tr>
        </tbody>
    </>
  )
}

export default Table
