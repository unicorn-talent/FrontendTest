import jwt from "jsonwebtoken";

const Authentication = (): boolean => {
  const authHeader = localStorage.getItem("token");
  const bearer = "Bearer ";
  if (!authHeader) {
    return false;
  }
  const token = authHeader.replace(bearer, "");
  try {
    const decoded = jwt.verify(
      token,
      process.env.REACT_APP_JWT_SECRET as string
    );
    return true;
  } catch (e) {
    return false;
  }
};

export default Authentication;
