
export const getAllCategories = () => {
    return fetch(`https://localhost:5001/api/Category`)
    .then((res) => res.json())
};

export const addCategory = (category) => {
    return fetch(`https://localhost:5001/api/Category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      })
}