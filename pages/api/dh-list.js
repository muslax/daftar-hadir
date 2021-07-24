import { ObjectId } from "mongodb";
import { DB_ATTENDEE, DB_PROJECT } from "../../libs/constants";
import { connect } from "../../libs/database";

export default async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { db } = await connect();
    // const rs = await db.collection(DB_PROJECT).find(
    //   {}, 
    //   { projection: {
    //     Title: 1,
    //     Slug: 1,
    //     Date: 1,
    //   }}
    // ).sort({ Date: -1 }).toArray()
    const rs = await db.collection(DB_PROJECT).aggregate([
      {$lookup: {from:'attendee', as:'attendees', localField:'_id',foreignField:'eventId'}},
      {$project: {
        "Title": 1,
        "Slug": 1,
        "Date": 1,
        "attendees": { $size: "$attendees"},
      }}
    ]).sort({ Date: -1 }).toArray()
    return res.json(rs);
  } catch (error) {
    return res.status(error.status || 500).end(error.message)
  }
}