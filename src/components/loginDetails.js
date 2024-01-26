export const userDetails = JSON.parse(localStorage.getItem("userDetails"));

console.log(userDetails);
export const loginDetails = {
  login: userDetails ? userDetails.login : false,
};

