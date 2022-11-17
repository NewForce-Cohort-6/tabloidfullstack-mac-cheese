import React, {useState, useEffect} from "react";
import Category from "./Category";
import { getAllCategories } from "./CategoryManager";

const CategoryList = () => {
    const [categories, setCategories] = useState([]);

    const getCategories = () => {
        getAllCategories().then( all => setCategories(all))
    };
    useEffect(() => {
        getCategories();
    }, []);
    
    return (
        <div className="container">
        <div className="row justify-content-center">
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