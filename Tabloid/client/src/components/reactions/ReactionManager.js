const baseUrl = "https://localhost:5001";

export const getAllReactions = () => {
  return fetch(`${baseUrl}/api/Reaction`).then((res) => res.json());
};
