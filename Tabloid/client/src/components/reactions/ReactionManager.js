const baseUrl = "https://localhost:5001";

export const getAllReactions = () => {
  return fetch(`${baseUrl}/api/Reaction`).then((res) => res.json());
};

export const addReaction = (singleReaction) => {
  return fetch(`${baseUrl}/api/Reaction`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(singleReaction),
  });
};
