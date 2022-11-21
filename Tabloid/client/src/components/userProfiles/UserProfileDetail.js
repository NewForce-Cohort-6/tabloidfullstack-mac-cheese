import React from "react";
import { getById } from "./UserProfileManager";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const UserProfileDetails = () => {
    const [user, setUser] = useState({})
    const {id} = useParams();

    useEffect(
    () => {
        getById(id).then((u) => {setUser(u)})
    }, []);

    if (!user){
        return null;
    }
console.log(user)
    return (
        <div style={{width: '1190px', display: 'flex', justifyContent: 'center', marginTop: '50px', alignContent: 'center'}}>
            <div style={{borderBottom: '1px solid gray', width: '20%'}}>
            <h4>{user.displayName}</h4>
            <img src={user.imageLocation} />
            <h6 style={{marginTop: '15px'}}>Name: {user.firstName} {user.lastName}</h6>
            <p>UserType: {user?.userType?.name}
            <br></br>
            User Since: {user.createDateTime}</p>
        </div>
        </div>
    )
}

export default UserProfileDetails;