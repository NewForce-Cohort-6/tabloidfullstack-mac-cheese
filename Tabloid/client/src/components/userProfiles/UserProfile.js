import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UserProfile = ({user}) => {
    const navigate = useNavigate();

    //Perform a patch to update isActive state when button is clicked
console.log(user.id)
    const handleActive = (e) => {
        fetch(`https://localhost:5001/api/UserProfile/${user.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ IsActive:false }),
        })
          .then((response) => response.json())
          .then(() =>
            navigate("/users")
          );
      };

    const handleNotActive = () => {
        return fetch(`https://localhost:5001/api/UserProfile/${user.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({isActive: true}), })
        .then((response) => response.json())
        .then(() => {
            navigate("/users")
        })
      }


    console.log(user)
    return (
        <div style={{ width: '20%', borderBottom: 'solid 1px gray'}}>
            <Link to={`/users/${user.id}`}>
    <strong>{user.displayName}</strong></Link>
            <h6>User Name: {user.firstName} {user.lastName}</h6>
            <h6>UserType: {user.userType.name}</h6>
            {user.isActive ?
            <button onClick={(e) => {
                handleActive()
            }} style={{marginBottom: '15px', marginTop: '15px'}}
            >DEACTIVATE</button>
            :
            <button onClick={(e) => {
                handleNotActive();
            }} style={{marginBottom: '15px', marginTop: '15px'}}>ACTIVATE</button>}
        </div>
)}

export default UserProfile;