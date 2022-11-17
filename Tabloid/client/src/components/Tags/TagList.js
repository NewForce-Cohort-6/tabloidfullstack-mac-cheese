import React, {useState, useEffect} from "react";
import { getAllTags } from "./TagManagement";
import Tag from "./Tag";


const TagList = () => {
    const [tags, setTags] = useState([])
    
    const getTags = () => {
        getAllTags().then(all => setTags(all))
    };

    useEffect(()=>{
        getTags();
    },[]);



return (
    <>
    
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
          {tags.map((tag) => (
            <Tag key={tag.id} tag={tag} />
          ))}
        </div>
      </div>
    </div>
    </>
  );

}
export default TagList;