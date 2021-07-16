import { ObjectId } from "mongodb";
import { DB_ATTENDEE } from "../../libs/constants";
import { connect } from "../../libs/database";

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  console.log(req.body);
  try {
    const { db } = await connect();
    const { id, fullname, gender, organization, email, phone } = req.body;
    const rs = await db.collection(DB_ATTENDEE).insertOne({
      _id: ObjectId().toString(),
      eventId: id,
      Fullname: fullname,
      Gender: gender,
      Organization: organization,
      Email: email,
      Phone: phone,
      Created: new Date().toISOString(),
    })

    console.log("RS", rs);
    return res.json({ message: 'OK' });
  } catch (error) {
    return res.status(error.status || 500).end(error.message)
  }
}
