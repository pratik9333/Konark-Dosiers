import API from "../backend";

export const getPacks = async () => {
  return fetch(`${API}/showactivepack`, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const checkPackExpiry = (userid, token) => {
  return fetch(`${API}/checkexpiry/${userid}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      return err;
    });
};
