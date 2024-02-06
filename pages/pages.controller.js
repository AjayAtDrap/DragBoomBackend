import pageModel from "./pages.model.js";
import { v4 as uuid } from "uuid";

export const addPage = async (req, res) => {
  const { name, data } = req.body;
  const pageData = new pageModel({ name, data, uid: uuid() });
  pageData.save();
  console.log(pageData);
};
