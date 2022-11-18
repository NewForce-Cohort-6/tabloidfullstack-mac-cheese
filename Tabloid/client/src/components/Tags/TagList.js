import React, {useState, useEffect} from "react";
import { getAllTags } from "./TagManagement";
import Tag from "./Tag";
import { useNavigate } from "react-router-dom";


const TagList = () => {
    const [tags, setTags] = useState([])
    const navigate = useNavigate();
    
    const getTags = () => {
        getAllTags().then(all => setTags(all))
    };

    useEffect(()=>{
        getTags();
    },[]);



return (
    <>
    
    <div className="container">
      <div className="row justify-content-center" style={{display: 'flex', flexDirection: 'column'}}>
      <h4 style={{marginTop: '20px', marginBottom: '15px'}}>Tags</h4>
          <button onClick={(e) => {
            navigate('/createTag')
          }} style={{width: '120px', marginBottom: '25px'}}
          >Create New Tag</button>
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