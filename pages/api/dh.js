import { DB_ATTENDEE, DB_PROJECT } from "../../libs/constants";
import { connect } from "../../libs/database";

export default async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // /api/dh?date=2021-07-30&slug=menggunakan-pewarna-baru

  try {
    const { pid } = req.query
    const { db } = await connect()
    const rs = await db.collection(DB_PROJECT).aggregate([
      { $match: { _id: pid }},
      { $limit: 1 },
      { $lookup: {from:DB_ATTENDEE, as:'attendees', localField:'_id',foreignField:'eventId'}},
      { $project: {
        Title: 1,
        Date: 1,
        attendees: 1,
      }}
    ]).toArray()
    if (rs[0]) {
      res.json(rs[0])
    } else {
      return res.status(404).json({ message: "Not found" })
    }
  } catch (error) {
    return res.status(error.status || 500).end(error.message)
  }
}