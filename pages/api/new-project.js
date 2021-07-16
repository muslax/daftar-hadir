import { ObjectId } from "mongodb";
import { DB_PROJECT } from "../../libs/constants";
import { connect } from "../../libs/database";

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { db } = await connect();
    const { title, slug, date, message, colors } = req.body;
    const rs = await db.collection(DB_PROJECT).insertOne({
      _id: ObjectId().toString(),
      Title: title,
      Slug: slug,
      Date: date,
      Message: message,
      Colors: colors.split(" "),
      Created: new Date().toISOString(),
    })

    console.log("RS", rs);
    return res.json({ message: 'OK' });
  } catch (error) {
    return res.status(error.status || 500).end(error.message)
  }
}
