import React from 'react'
import RenderRow from './RenderRow'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default function TableComponent (props) {
 const {data,project} = props
 console.log(data)
 
 const getKeys =() => {
 return Object.keys(data[0]);
 }
 
 const getHeader = () =>{
 var keys = getKeys();
 return keys.map((key, index)=>{
  console.log(key)
 return <TableCell key ={index}>{key.toUpperCase()} </TableCell>
 })
 }
 
const getRowsData = () =>{
 var keys = getKeys();
 return data.map((row, index)=>{
 return <TableRow key ={index}><RenderRow key={index} data={row} keys={keys}/></TableRow>
 })
 }
 
 
  if(Object.entries(data).length === 0 ){
    return(
  <div> <h1> no datas available </h1> 
  <p> you might have forgot to choose the project or the date difference </p> </div>
  )}
else{
 return (
 <Paper >
    <Table  size="small" aria-label="a dense table">
      <TableHead>
        <TableRow>
          {getHeader()}
        </TableRow>
      </TableHead>
	    <TableBody>
	      {getRowsData()}
	    </TableBody>
    </Table>
</Paper>
 );
}
}

