import React from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


const Category = ({category}) => {
    const {id} = useParams();
    const navigate = useNavigate();


    return (
        <div style={{display:'flex', letterSpacing: '.5px', alignItems: 'center', margin: '15px', borderBottom: '1px solid gray', height: '30px', width: '500px', justifyContent: 'space-between'}}>
            <h5 style={{ marginRight: '15px' }}>{category.name}</h5>
        </div>
    )
}


export default Category;