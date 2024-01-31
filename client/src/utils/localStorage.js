export const getUserFromLocalStorage = () => {
  const userJson = localStorage.getItem("user");
  const user = JSON.parse(userJson) || null;
  return user;
};

export const setUserToLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
};
