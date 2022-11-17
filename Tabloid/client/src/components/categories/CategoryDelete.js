import React from "react";
import { deleteCategory } from "./CategoryManager";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getById } from "./CategoryManager";

const CategoryDelete = () => {
    const [chosenCat, setChosenCat] = useState();

    const navigate = useNavigate();
    const {id} = useParams();


    useEffect(
    () => {
        getById(id).then((c) => {setChosenCat(c)}).then(console.log(chosenCat))
        
    },
    []
    )

    const handleDelete = () => {
        deleteCategory(chosenCat.id).then((e) => {
            navigate('/categories')
        })
    }
    const handleCancel = () => {
        navigate('/categories')
    }

    return (
        <div style={{display:'flex', letterSpacing: '.5px', alignItems: 'center', margin: '45px', borderBottom: '1px solid gray', height: '30px', width: '500px', justifyContent: 'space-between'}}>
            <h5 style={{ marginRight: '15px' }}>{chosenCat.name}</h5>
            <h6>Are you sure you wish to delete the category?</h6>
            <button onClick={(e) => {
                handleDelete()
            }}>Yes</button>
            <button onClick={(e) => {
                handleCancel()
            }}>Cancel</button>
        </div>
    )
}

export default CategoryDelete;