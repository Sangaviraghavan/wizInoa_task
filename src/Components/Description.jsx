import React from 'react'

export default function Description() {
  return (
    <>
      <div className="desc">
        <h1>Description</h1>
        <ol>
          <li>
            <h3>Table Page:</h3>
            <dd> <span className='green'> &#10003; </span>I created a table using the free web API from JSONPlaceholder. </dd>
            <dd> <span className='green'> &#10003; </span>I implemented pagination to display 10 items per page. </dd>
            <dd> <span className='green'> &#10003; </span>The data is rendered in the table using Redux.</dd>
            <dd> <span className='green'> &#10003; </span>I also added a search functionality at the top of the table.</dd>
            <dd> <span className='green'> &#10003; </span>Additionally, I included a button named "Export Data." This button allows the data to be downloaded and saved in an Excel file named "registerdata.xlsx," which can be opened in an Excel spreadsheet.</dd>
          </li>
          <li>
            <h3>CRUD Page:</h3>
            <dd> <span className='green'> &#10003; </span>In this CRUD task, I created a duplicate array of objects for dummy data, including fields for name, image, and email address to perform create, read, update, and delete operations. </dd>
          </li>
        </ol>
      </div>
    </>

  )
}
