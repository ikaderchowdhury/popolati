const getUser = (req) => {
  const token = req.headers.authorization;
  if (!token) {
    return { created_by: 0 };
    //throw new InvalidTokenException();
  }
  if (token == "Bearer") {
    throw new InvalidTokenException();
  }
  const user = JSON.parse(atob(token.split(" ")[1].split(".")[1]));
  return user;
};
module.exports = { getUser };
