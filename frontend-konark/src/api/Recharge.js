import API from "../backend";

export const getPacks = () => {
  return fetch(`${API}/showactivepack`, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
