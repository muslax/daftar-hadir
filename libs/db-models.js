const Event = {
  Title: "Seminar Asesor",
  Slug: "seminar-asesor",
  Date: "2021-07-28",
  Status: 1,  // 1 is open, -1 is closed
  Created: "2021-07-15T09:55:24.691Z",
  Updated: "2021-07-16T09:55:24.691Z",
}

const Attendee = {
  Fullname: "Nama Lengkap",
  Email: "nama@domain.com",
  Phone: "021-221",
  Organization: "",
  Created: 222,
}

const sampleEvents = [
  {
    "_id": "60f01278af0d1fd5f68efab7",
    "Title": "Seminar Asesor",
    "Slug": "seminar-asesor",
    "Date": "2021-07-28",
    "Status": 1,
    "Theme": null,
    "Message": "",
    "HeroImgUrl": "",
    "Created": "2021-07-15T09:55:24.691Z",
    "Updated": null,
  },
  {
    "_id": "60f0127aaf0d1fd5f68efab8",
    "Title": "Workshop Ekologi Fatalis",
    "Slug": "workshop-ekologi-fatalis",
    "Date": "2021-07-30",
    "Status": 1,
    "Theme": null,
    "Message": "",
    "HeroImgUrl": "",
    "Created": "2021-07-25T09:55:24.691Z",
    "Updated": null,
  }
];

const sampleAttendees = [
  {
    "_id": "60f0127baf0d1fd5f68efab9",
    "eventID": "60f01278af0d1fd5f68efab7",
    "Fullname": "Lidi Astuti",
    "Email": "lidias@domain.com",
    "Phone": "021-221",
    "Organization": "Biro Hukum DKUT",
    "Created": 222,
  }
]