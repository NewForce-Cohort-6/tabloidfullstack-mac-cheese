import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const UserProfile = ({user, get}) => {

    const navigate = useNavigate();


    //Perform a put to update isActive state when button is clicked
    const handleActive = () => {

        //object to be updated
        const updatedUser = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            displayName: user.displayName,
            email: user.email,
            createDateTime: user.createDateTime,
            imageLocation: user.imageLocation,
            isActive: false,
            userTypeId: user.userTypeId,
            userType: {
                id: user.userType.id,
                name: user.userType.name
            },
            fullName: user.fullName

        }


        return fetch(`https://localhost:5001/api/UserProfile/${user.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        })
          .then((response) => response.json())
          .then((users) =>
           get(users)
          );
      };

    const handleNotActive = () => {

        //object to be updated
        const updatedUser = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            displayName: user.displayName,
            email: user.email,
            createDateTime: user.createDateTime,
            imageLocation: user.imageLocation,
            isActive: true,
            userTypeId: user.userTypeId,
            userType: {
                id: user.userType.id,
                name: user.userType.name
            },
            fullName: user.fullName

        }


        return fetch(`https://localhost:5001/api/UserProfile/${user.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser), })
        .then((response) => response.json())
        .then((users) => {
            get(users)
        })
      }

    return (
        <div style={{ width: '20%', borderBottom: 'solid 1px gray'}}>
            <Link to={`/users/${user.id}`}>
    <strong>{user.displayName}</strong></Link>
            <h6>User Name: {user.firstName} {user.lastName}</h6>
            <h6>UserType: {user.userType.name}</h6>
            <button onClick={(e) => {navigate(`/editType/${user.id}`)}} style={{marginRight: "5px"}}>Edit</button>
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