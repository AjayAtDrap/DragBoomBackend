// import jwt from "jsonwebtoken";
// export function verifyToken(req, res, next) {
//   const token = req.header("Authorization").split(" ");
//   console.log("line 04", req.params);
//   const { userId } = req.params;
//   // console.log("userID", userI);
//   console.log("frommiddle", token);
//   if (!token) return res.status(401).json({ error: "Access denied" });
//   try {
//     const decoded = jwt.verify(token[1], process.env.SECRET_KEY);
//     if (!decoded) {
//       res.status(402).send("token not verified");
//     }
//   console.log(userID);
//   } catch (error) {
//     res.status(401).json({ error: "Invalid token" });
//   }
// }
import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");
  console.log(token);

  if (!token) {
    return res.status(401).json({ error: "Unauthorized - No token provided" });
  }

  jwt.verify(
    token.replace("Bearer ", ""),
    process.env.SECRET_KEY,
    (err, user) => {
      if (err) {
        return res.status(403).json({ error: "Forbidden - Invalid token" });
      }
      console.log("auth", user);
      req.user = user;
      next();
    }
  );
};
