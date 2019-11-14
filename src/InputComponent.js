import React, { useState,useEffect } from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from "@material-ui/core/InputAdornment";
import TableComponent from './Table'


const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120,
    maxWidth: 300,
    
  },
}));


export default function Inputs(props) {

  const data = props.data
  const [project,setProject] = useState(['SURVEY MONKEY']);
  const [projects,setProjects] = useState([]);
  const [frequency,setFrequency] = useState([]);
  const [filtered,setFiltered] = useState({});
  const [inputDateDiff,setInputDateDifference] = useState([]);
  const [startDate,setStartDate] = useState(new Date());
  const [endDate,setEndDate] = useState(new Date());
  const[filter,setFilter] = useState(false);
  const classes = useStyles();
  const handleChange = event => {
    setFrequency(event.target.value);
  };
  

  const handleDateChange = date => {
    setStartDate(date);
  }; 

  const handleEndDateChange = date => {
    setEndDate(date);
  }; 

    const handleChangeMultiple = event => {
    setProject(event.target.value);
  };

  useEffect(() => {
   var obj={}
    for (var i in data){
    var item =data[i]
      if(obj[item.project] === undefined){
        obj[item.project] =0
      }
    }
  
    var result= [];
    for (i in obj){
      result.push(i)
    }
    result.pop([result[result.length]])
    setProjects(result)
    const diffindays=date_diff_indays(startDate,endDate);
    setInputDateDifference(diffindays)
  },[data, startDate,endDate] )

  const projectss = [...projects]

  var date_diff_indays =  (dt1, dt2)=> {
    console.log(dt1)
    console.log(JSON.stringify(dt2))
    return (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /( 1000);

  }  
  

const filterData = ()=>{
    let init = data;
    let fil = [...init];
    if(project){
        fil= fil.filter((x)=>project.includes(x.project));
    }
    var diff =0 
    var result = [];
    var newObj = {};
    for (let p in project){
      for(let i in fil){
        var item = fil[i];
        if(item.project === project[p]){
          if(newObj[item.workers] === undefined){
            newObj[item.workers] = 0;
          }
          diff  =  parseInt(item.duration_seconds) + diff
        
          if(diff <= inputDateDiff){
            newObj[item.workers] += parseInt(item.duration_seconds);
          }
        }
      } 
      for( let i in newObj){
        result.push({'worker':i,'duration (hrs)':Math.floor(newObj[i]),'project':project[p]});
        
      }

      newObj[item.workers] = undefined
      diff = 0 
    }
    setFiltered(result);
    setFilter(true);
  }

  return (
    <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker className={classes.formControl}
          margin="normal"
          id="date-picker-dialog"
          label="start date"
          format="MM/dd/yyyy"
          value={startDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />

        <KeyboardDatePicker className={classes.formControl}
          margin="normal"
          id="date-picker-dialog"
          label="end date"
          format="MM/dd/yyyy"
          value={endDate}
          onChange={handleEndDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />

      </MuiPickersUtilsProvider >
        <TextField
          id="standard-basic"
          label="Standard"
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <SearchIcon />
             </InputAdornment>
            )
          }}
        />
      <br/>

      <FormControl  >
        <InputLabel id="demo-mutiple-name-label">select projects</InputLabel>
        <Select className={classes.formControl}
          labelId="demo-mutiple-name-label"
          id="demo-mutiple-name"
          multiple
          value={project}
          input={<Input />}
          onChange={handleChangeMultiple}
        > 
          {projectss.map((name,index) => (
            <MenuItem key={index} value={name} >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl >
        <InputLabel id="demo-mutiple-name-label">project frequency</InputLabel>
        <Select className = {classes.formControl}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={frequency}
          onChange={handleChange}
        >
          <MenuItem key = {1} value=''>Weekly</MenuItem>
          <MenuItem  key = {2} value={14}>Bi-Weekly</MenuItem>
          <MenuItem  key = {3} value={21}>monthly</MenuItem>
        </Select>
      </FormControl>
     
    
      <div style={{flex:1}}>
        <button style={{margin:20,width : 50}} onClick={()=>filterData()}> filter </button>
        <h3> Projects </h3> {project.map((project,index) => <div key ={index}style ={{display:'inline-block',border:'1px',padding:'5px'}}>  <h3> {project} </h3> </div> )}
      </div>    
      {filter?<TableComponent data ={filtered} projects={project} />:<TableComponent  data ={data} projects={project} />}
    </div>
  );
}