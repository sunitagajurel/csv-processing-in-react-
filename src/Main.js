import React,{Component} from 'react'
import Inputs from './InputComponent';


class Main extends Component { 
    
    constructor(){
        super();
        this.state = {
            records:0,
            data:"",
            loading:true
        }
    }

    componentDidMount(){
        this.getData();
    }

    getData = async()=>{
        const response = await fetch('./data.csv');
        let data = await response.text();
        let lines = data.split('\n');
        const headers = lines.shift().split(',').map((x)=>x.trim());
        let records = lines.map((text)=>{
            let temp = text.split('",');
            let record = [];
             console.log(temp.length)
            if(temp.length!==1){
                record.push(temp[0].slice(1));
                text = temp[1]
            }
            record = record.concat(text.split(','));
            let obj = {};
            for(var i =0;i<record.length;i++){
                obj[headers[i]] = record[i];
            }
            return obj
            
        });

        
        this.setState({
            records,
            loading:false,
            
        });
    }
    
    render(){

        return(
            <>
            {  
                (this.state.loading)? "Loading..":
                <Inputs data= {this.state.records}/>
            }
            </>
        );
    }
};

export default Main;