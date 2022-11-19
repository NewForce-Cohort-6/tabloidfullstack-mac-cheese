import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import UserProfile from "./UserProfile";
import { getAllUsers } from "./UserProfileManager";

const UserProfileList = () => {
    const [users, setUsers] = useState([]);

    const getUsers = () => {
        getAllUsers().then(all => setUsers(all))
    };

    useEffect (
    () => {
        getUsers();
    }, []);
    console.log(users)

    return (<div>
        <h3 style={{margin: '15px'}}>User Profiles</h3>
        <div style={{display: 'flex', flexDirection: 'column',margin: '15px'}}>
            {users.map((u) => (
                <div style={{margin: '20px'}}>
                    <UserProfile key={u.id} user={u} get={getUsers}/>
                </div>
            ))}
        </div>
    </div>)
}

export default UserProfileList;