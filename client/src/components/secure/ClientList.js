import React from 'react';
import { Link } from "react-router-dom";
import {Input, Table} from 'react-materialize';
import $ from "jquery";


const ClientList = ({clients, search}) => {
  // const alphabeticalClientList = clients.sort();
  const renderList = clients.map((client, i) => {
    return (
      <tr key={i}>
          <td>
            <Link className='clientButton' to={'/forms'} >{client.Name}</Link>
          </td>
          <td>
            <Link className='clientButton' to={'/forms'} >{client.Id}</Link>
          </td>
        </tr>
        )
  })

  $(document).ready(function(){
    $("#myInput").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#myContainer tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });


   return (
    <div>
      
    <h2 className='form-title'>Client List</h2>
    <Input id='myInput' placeholder='Search...' onChange={search}/>
      <div id='myContainer' className='clientContainer'>
      <Table>
    <thead>
        <tr>
          <th data-field='account_name'>Account Name</th>
          <th data-field='account_id'>Account Id</th>
        </tr>
      </thead>
      <tbody>
          {renderList}
      </tbody>
    </Table>
      </div>
    </div>
  );
}

export default ClientList;

