import React from "react";

const Tag = ({tag}) => {
    return(<div style={{display:'flex', letterSpacing: '.5px', alignItems: 'center', margin: '45px', borderBottom: '1px solid gray', height: '30px', width: '500px', justifyContent: 'space-between'}}>
    <h5 style={{ marginRight: '15px' }}>{tag.name}</h5>
    <div style={{display: 'flex'}}>
        <button style={{margin: '5px'}}>Edit</button>
        
    </div>
</div>
)
}
export default Tag;