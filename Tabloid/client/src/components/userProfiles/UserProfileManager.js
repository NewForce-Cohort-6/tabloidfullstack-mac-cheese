export const getAllUsers = () => {
    return fetch(`https://localhost:5001/api/UserProfile`).then((res) => res.json())
};