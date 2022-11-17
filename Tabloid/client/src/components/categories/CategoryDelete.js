import React from "react";
import { deleteCategory } from "./CategoryManager";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getById } from "./CategoryManager";

const CategoryDelete = () => {
    const [chosenCat, setChosenCat] = useState({});

    const navigate = useNavigate();
    const {id} = useParams();


    useEffect(
    () => {
        getById(id).then((c) => {setChosenCat(c)}).then(console.log(chosenCat))
        
    },
    []
    )

    console.log(chosenCat);

    const handleDelete = () => {
        deleteCategory(chosenCat.id).then((e) => {
            navigate('/categories')
        })
    }
    const handleCancel = () => {
        navigate('/categories')
    }

    return (
        <div style={{display:'flex', flexDirection: 'column', letterSpacing: '.5px', alignItems: 'center', margin: '45px', height: '30px', width: '500px', justifyContent: 'space-between'}}>
            <h5 style={{marginBottom: '45px'}}>Are you sure you wish to delete the category?</h5>
            <div style={{display: 'flex'}}>
            <h5 style={{ marginRight: '30px' }}>{chosenCat.name}</h5>
            <button style={{marginRight: '10px'}} onClick={(e) => {
                handleDelete()
            }}>Delete</button>
            <button onClick={(e) => {
                handleCancel()
            }}>Cancel</button>
            </div>
        </div>
    )
}

export default CategoryDelete;