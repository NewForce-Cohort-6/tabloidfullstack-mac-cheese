import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteTag, getById } from "./TagManagement";
import React from "react";


const TagDelete = () => {
    const [chosenTag, setChosenTag] = useState({});

    const navigate = useNavigate();
    const {id} = useParams();


    useEffect(
    () => {
        getById(id).then((t) => {setChosenTag(t)}).then(console.log(chosenTag))
        
    },
    []
    )

    console.log(chosenTag);

    const handleDelete = () => {
        deleteTag(chosenTag.id).then((e) => {
            navigate('/tags')
        })
    }
    const handleCancel = () => {
        navigate('/tags')
    }

    return (
        <>
        <div style={{display:'flex', flexDirection: 'column', letterSpacing: '.5px', alignItems: 'center', margin: '45px', height: '30px', width: '500px', justifyContent: 'space-between'}}>
            <h5 style={{marginBottom: '45px'}}>Are you sure you wish to delete the tag?</h5>
            <div style={{display: 'flex'}}>
            <h5 style={{ marginRight: '30px' }}>{chosenTag.name}</h5>
            <button style={{marginRight: '10px'}} onClick={(e) => {
                handleDelete()
            }}>Delete</button>
            <button onClick={(e) => {
                handleCancel()
            }}>Cancel</button>
            </div>
        </div>
        </>
    )
}
export default TagDelete