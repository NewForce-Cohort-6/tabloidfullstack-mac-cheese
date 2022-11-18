import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import { addTag } from "./TagManagement";



const TagForm =() => {
    const [name, setName] =useState({
        name: ""
    })
    const navigate = useNavigate();
    
    const saveTag = () => {
        const newTag = {
            name: name
        }
        addTag(newTag).then((p) => {
            navigate("/tags");
        })
    }
    return (
        <div style={{margin: '50px'}}>
        <h1 style={{marginBottom: '25px'}}>Create Tag</h1>
        
        <fieldset>
            <input
             style={{marginBottom: '10px'}}
              type="text"
              placeholder="Name"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </fieldset>
          
          <button onClick={saveTag}>Save</button>
    
        </div>)
    

}
export default TagForm;