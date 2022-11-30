import React from "react";
import { getById } from "./UserProfileManager";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const UserProfileDetails = () => {
    const [user, setUser] = useState({})
    const {id} = useParams();
    const [file, setFile] = useState({
        selectedFile: null
    })

    const userObject = localStorage.getItem('userProfile');
    const loggedInUser = JSON.parse(userObject);
    console.log(loggedInUser)

    useEffect(
    () => {
        getById(id).then((u) => {setUser(u)})
    }, []);

    if (!user){
        return null;
    }

    const fileSelectedHandler = (e) => {
        setFile(e.target.files[0])
    }

    const fileUploadHandler = (e) => {
        //need to put image. how to do as a file?
        const fd = new FormData();
        fd.append('image', file, file.name)

        const updateImage = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            displayName: user.displayName,
            email: user.email,
            createDateTime: user.createDateTime,
            imageLocation: file.name,
            isActive: user.isActive,
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
          body: JSON.stringify(updateImage), })
        .then((response) => response.json())
    }

console.log(user)
    return (
        <div style={{width: '1190px', display: 'flex', justifyContent: 'center', marginTop: '50px', alignContent: 'center'}}>
            <div style={{borderBottom: '1px solid gray', width: '20%'}}>
            <h4 style={{marginBottom: '15px'}}>{user.displayName}</h4>
            {(loggedInUser.id === user.id) ?
            <div style={{display: 'flex', flexDirection: 'column'}} className="form-group">
                {(user.imageLocation === null) ? 
                <p>You have not uploaded an Image</p>
                :
                <img src={user.imageLocation} />
            }
                <input style={{marginTop: '5px'}} type="file" onChange={(e) => {
                    fileSelectedHandler(e)
                }}/>
                <button style={{marginTop: '5px', border: '.5px solid black'}} onClick={(e) => {
                    fileUploadHandler(e)
                }}>Upload</button>
            </div>
            :
            <div>
                <img src={user.imageLocation} />
            </div>
        }
            <h6 style={{marginTop: '15px'}}>Name: {user.firstName} {user.lastName}</h6>
            <p>UserType: {user?.userType?.name}
            <br></br>
            User Since: {user.createDateTime}</p>
        </div>
        </div>
    )
}

export default UserProfileDetails;