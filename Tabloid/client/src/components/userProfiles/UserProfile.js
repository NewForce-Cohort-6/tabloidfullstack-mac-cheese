import React from "react";
import { Link } from "react-router-dom";

const UserProfile = ({user}) => {

    if (user.isActive = 0){
    return (
        <div style={{ width: '20%', borderBottom: 'solid 1px gray'}}>
            <Link to={`/users/${user.id}`}>
    <strong>{user.displayName}</strong></Link>
            <h6>User Name: {user.firstName} {user.lastName}</h6>
            <h6>UserType: {user.userType.name}</h6>
            <button style={{marginBottom: '15px', marginTop: '15px'}}>ACTIVATE</button>
        </div>
    )} else if (user.isActive = 1){
        return (
            <div style={{ width: '20%', borderBottom: 'solid 1px gray'}}>
            <Link to={`/users/${user.id}`}>
    <strong>{user.displayName}</strong></Link>
            <h6>User Name: {user.firstName} {user.lastName}</h6>
            <h6>UserType: {user.userType.name}</h6>
            <button style={{marginBottom: '15px', marginTop: '15px'}}>DEACTIVATE</button>
        </div>
        )
    }
}

export default UserProfile;