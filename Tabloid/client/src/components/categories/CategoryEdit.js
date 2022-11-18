import React from "react";
import { editCategory } from "./CategoryManager";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getById } from "./CategoryManager";

const CategoryEdit = () => {
    const [chosenCat, setChosenCat] = useState({});

    const navigate = useNavigate();
    const {id} = useParams();


    useEffect(
    () => {
        getById(id).then((c) => {setChosenCat(c)})        
    },
    []
    )

    console.log(chosenCat);

    const saveEdit = () => {
        const newCat = {
            name: chosenCat.name,
            id: chosenCat.id
        }
        console.log(newCat)
        editCategory(newCat).then((e) => {
            navigate('/categories')
        })
    }

    const handleCancel = () => {
        navigate('/categories')
    }

    return (
        <div style={{display:'flex', flexDirection: 'column', letterSpacing: '.5px', alignItems: 'center', margin: '45px', height: '30px', width: '500px', justifyContent: 'space-between'}}>
            <h5 style={{marginBottom: '45px'}}>Edit Category</h5>
            <div style={{display: 'flex'}}>
            <fieldset>
            <input
             style={{marginRight: '10px'}}
              type="text"
              placeholder={chosenCat.name}
              onChange={(e) => {
                const copy = {...chosenCat}
                copy.name = e.target.value
                setChosenCat(copy);}
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

export default CategoryEdit;