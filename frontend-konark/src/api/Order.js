import API from "../backend";

export const createOrder = async (userid, token, order) => {
  return fetch(`${API}/order/create/${userid}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(order),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {});
};

export const getUserOrders = async (userid, token) => {
  return fetch(`${API}/orders/${userid}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {});
};

export const payment = async (amount, id, token) => {
  console.log(typeof amount);
  return fetch(`${API}/payment/${id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ amount: amount }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {});
};

export const successpayment = async (data, id) => {
  return fetch(`${API}/payment/success/${id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {});
};
