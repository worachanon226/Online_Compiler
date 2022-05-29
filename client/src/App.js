import './App.css';
import axios from 'axios'
import React, {useState} from 'react'

function App() {

  const [code,SetCode] = useState('');
  const [langugue,setLangugue] = useState("cpp");
  const [output,SetOutput] = useState('');

  const handleSubmit = async () =>{
    const payload = {
      langugue,
      code
    };

    try{
      const {data} = await axios.post("http://localhost:5000/run", payload);
      SetOutput(data.output);
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
            setLangugue(e.target.value);
            console.log(e.target.value);
          }
        }>
          <option value="cpp">C++</option>
          <option value="py">Python</option>
        </select>
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
      <p>{output}</p>
    </div>
  );
}

export default App;
