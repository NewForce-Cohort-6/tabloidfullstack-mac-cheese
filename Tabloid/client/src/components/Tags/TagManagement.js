export const getAllTags = () => {
    return fetch(`https://localhost:5001/api/Tag`)
    .then((res)=> res.json())
};