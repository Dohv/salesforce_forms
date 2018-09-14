import React from 'react';
import { Link } from "react-router-dom";
import {Input, Table} from 'react-materialize';
import $ from "jquery";

const handleClientChange = (accountName, accountId, clientProducts) => {
  console.log(clientProducts);
  localStorage.setItem('sfAccountId', accountId);
  localStorage.setItem('sfAccountName', accountName);
  localStorage.setItem("sfAccountProducts", JSON.stringify(clientProducts));
}


const ClientList = ({clients, search}) => {
  const renderList = clients.map((client, i) => {
    //console.log(client);
    return (
      <tr key={i} className='clientInfo'>
          <td>
            <Link className='clientButton' onClick={() => {handleClientChange(client.Name, client.Id, client.Products__c.split(';'))}} to={'/forms'}>{client.Name}</Link>
          </td>
          <td>
            <Link className='clientButton' to={'/forms'}>{client.Id}</Link>
          </td>
          <td>
            <Link className='clientButton' to={'/forms'} >{client.Products__c}</Link>
          </td>
        </tr>
        )
  })

  $(document).ready(function(){
    $("#myInput").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#myContainer .clientInfo").filter(function() {
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
          <th data-field='account_products'>Account Products</th>
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

