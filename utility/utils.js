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
