import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editTag, getById } from "./TagManagement";

const TagEdit = () => {
    const [chosenTag, setChosenTag] = useState({});

    const navigate = useNavigate();
    const {id} = useParams();


    useEffect(
    () => {
        getById(id).then((t) => {setChosenTag(t)})
        
    },
    []
    )

    console.log(chosenTag);

    const saveEdit = () => {
        const newTag = {
            name: chosenTag.name,
            id: chosenTag.id
        }
        console.log(newTag)
        editTag(newTag).then((e) => {
            navigate('/tags')
        })
    }
    const handleCancel = () => {
        navigate('/tags')
    }

    return (
        <div style={{display:'flex', flexDirection: 'column', letterSpacing: '.5px', alignItems: 'center', margin: '45px', height: '30px', width: '500px', justifyContent: 'space-between'}}>
            <h5 style={{marginBottom: '45px'}}>Edit Tag</h5>
            <div style={{display: 'flex'}}>
            <fieldset>
            <input
             style={{marginRight: '10px'}}
              type="text"
              placeholder={chosenTag.name}
              onChange={(e) => {
                const copy = {...chosenTag}
                copy.name = e.target.value
                setChosenTag(copy);}
              }
            />
          </fieldset>
            <button style={{marginRight: '10px'}} onClick={(e) => {
                saveEdit()
            }}>Save</button>
            <button onClick={(e) => {
                handleCancel()
            }}>Cancel</button>
            </div>
        </div>
    )
}
export default TagEdit;