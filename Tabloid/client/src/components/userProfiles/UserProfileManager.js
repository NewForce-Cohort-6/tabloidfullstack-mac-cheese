export const getAllUsers = () => {
    return fetch(`https://localhost:5001/api/UserProfile`).then((res) => res.json())
};

export const getById = (id) => {
    return fetch(`https://localhost:5001/api/UserProfile/${id}`).then((res) => res.json());
  }