import React from 'react'
import TableCell from '@material-ui/core/TableCell';
export default   function  RenderRow  (props){
 return props.keys.map((key, index)=>{
 return <TableCell key ={index}> {props.data[key]}  </TableCell>
 })
}