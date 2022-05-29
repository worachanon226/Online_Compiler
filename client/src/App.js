import './App.css';
import axios from 'axios'
import React, {useState, useEffect} from 'react'
import stubs from './defaultStubs';
import moment from 'moment';

function App() {

  const [code,SetCode] = useState('');
  const [langugue,setLangugue] = useState("cpp");
  const [output,SetOutput] = useState('');
  const [jobDetails,setJobDetails] = useState(null);


  useEffect(()=>{
    const defaultLang = localStorage.getItem("default-langugue") || "cpp";
    setLangugue(defaultLang);
  },[])

  useEffect(()=>{
    SetCode(stubs[langugue]);
  },[langugue])

  const setDefaultLangugue = ()=>{
    localStorage.setItem("default-langugue",langugue);
    console.log(`${langugue} set as default langugue.`);
  }

  const renderTimeDetails = ()=>{
    if(!jobDetails){
      return ""; 
    }
    let result = '';
    let{submittedAt, completedAt, startedAt} = jobDetails;
    submittedAt = moment(submittedAt).toString();
    result += `Submitted At: ${submittedAt}`;
    
    if(!completedAt || !startedAt){
      return result;
    }
    
    const start = moment(startedAt);
    const end = moment(completedAt);
    const executionTime = end.diff(start, 'seconds' ,true);

    result += `Execution Time: ${executionTime}s`
    return result;
  }

  const handleSubmit = async () =>{
    const payload = {
      langugue,
      code
    };

    try{
      const {data} = await axios.post("http://localhost:5000/run", payload);
      SetOutput(data.output);
      setJobDetails(data);
    }catch({response}){
      if(response){
        const errMeg = response.data.err.stderr;
        console.log(errMeg);
      }
      else{
        window.alert("Error connecting to server!");
      }
      
    }
  }

  return (
    <div className = "App">
      <h1>Online Code Compiler</h1>
      <div>
        <label>Langugue: </label>
        <select
        value={langugue}
        onChange={(e)=>{
          let response = window.confirm("WARNING: Switching the langugue, will remove your code");
          if(response){
            setLangugue(e.target.value);
          }
          }
        }>
          <option value="cpp">C++</option>
          <option value="py">Python</option>
        </select>
      </div>
      <br/>
      <div>
        <button onClick={setDefaultLangugue}>Set Default</button>
      </div>
      <br/>
      <textarea 
        rows="20" 
        cols="75" 
        value={code} 
        onChange={(e)=>{
        SetCode(e.target.value);
      }}></textarea>
      <br/>
      <button onClick={handleSubmit}>Submit</button>
      <p>{renderTimeDetails()}</p>
      <p>{output}</p>
    </div>
  );
}

export default App;
