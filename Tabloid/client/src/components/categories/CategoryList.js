import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Category from "./Category";
import { getAllCategories } from "./CategoryManager";

const CategoryList = () => {
    const [categories, setCategories] = useState([]);

   
    const navigate = useNavigate();

    const getCategories = () => {
        getAllCategories().then( all => setCategories(all))
    };
    useEffect(() => {
        getCategories();
    }, []);

    
    return (
      <div className="container">
        <div className="row justify-content-center" style={{display: 'flex', flexDirection: 'column'}}>
          <h4 style={{marginTop: '20px'}}>Categories</h4>
          <button onClick={(e) => {
            navigate('/createCategory')
          }} style={{marginTop: '15px', width: '120px'}}
          >New Category</button>
            <div className="cards-column">
                {categories.map((c) => (
                    <Category key={c.id} category={c} />
                    ))}
        </div>
      </div>
    </div>
    )
}

export default CategoryList;