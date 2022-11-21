import React from "react";
import { Link } from "react-router-dom";

const UserProfile = ({user}) => {
    return (
        <div style={{borderBottom: '1px solid gray', width: '20%'}}>
            <Link to={`/users/${user.id}`}>
    <strong>{user.displayName}</strong></Link>
            <h6>User Name: {user.firstName} {user.lastName}</h6>
            <h6>UserType: {user.userType.name}</h6>
        </div>
    )
}

export default UserProfile;