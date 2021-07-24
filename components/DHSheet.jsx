import useSheet from "../hooks/useSheet"

// "Slug": "workshop-ekologi-fatalis",
// "Date": "2021-07-30"
// ?date=2021-07-30&slug=workshop-ekologi-fatalis
const DHSheet = ({ pid }) => {
  const { data, isError, isLoading } = useSheet(pid)

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>NOT FOUND</p>

  return <>
    <div className="max-w-5xl p-5">
      <p className="text-sm">DAFTAR HADIR</p>
      <h1 className="text-lg font-medium pb-1 border--b border-gray-800">
        {data.Title}
      </h1>
      <p className="text-sm text-gray-500 italic mb-2">
        Nomor, nama, jenis kelamin, lembaga, email, telepon
      </p>
      <table className="w-full text-sm border-t border-gray-400">
        <tbody>
          {data.attendees.map((a, index) => (
            <tr key={a._id} className="border-b border-gray-400">
              <td className="w-10 p-1">{index + 1}</td>
              <td className="p-1">{a.Fullname}</td>
              <td className="p-1">{a.Gender.includes("L") ? "L" : "P"}</td>
              <td className="p-1">{a.Organization}</td>
              <td className="p-1">{a.Email}</td>
              <td className="p-1">
                <div className="flex items-center">
                  {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg> */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 " fill="#cccccc" viewBox="0 0 50 50"><path d="M 33 5 L 17 5 L 17 1 C 17 0.449219 16.550781 0 16 0 L 13 0 C 12.449219 0 12 0.449219 12 1 L 12 40 C 12 43.71875 15.496094 46 18 46 L 33 46 C 35.757813 46 38 43.757813 38 41 L 38 10 C 38 7.242188 35.757813 5 33 5 Z M 19 42 C 17.894531 42 17 41.105469 17 40 C 17 38.894531 17.894531 38 19 38 C 20.105469 38 21 38.894531 21 40 C 21 41.105469 20.105469 42 19 42 Z M 19 36 C 17.894531 36 17 35.105469 17 34 C 17 32.894531 17.894531 32 19 32 C 20.105469 32 21 32.894531 21 34 C 21 35.105469 20.105469 36 19 36 Z M 19 30 C 17.894531 30 17 29.105469 17 28 C 17 26.894531 17.894531 26 19 26 C 20.105469 26 21 26.894531 21 28 C 21 29.105469 20.105469 30 19 30 Z M 25 42 C 23.894531 42 23 41.105469 23 40 C 23 38.894531 23.894531 38 25 38 C 26.105469 38 27 38.894531 27 40 C 27 41.105469 26.105469 42 25 42 Z M 25 36 C 23.894531 36 23 35.105469 23 34 C 23 32.894531 23.894531 32 25 32 C 26.105469 32 27 32.894531 27 34 C 27 35.105469 26.105469 36 25 36 Z M 25 30 C 23.894531 30 23 29.105469 23 28 C 23 26.894531 23.894531 26 25 26 C 26.105469 26 27 26.894531 27 28 C 27 29.105469 26.105469 30 25 30 Z M 31 42 C 29.894531 42 29 41.105469 29 40 C 29 38.894531 29.894531 38 31 38 C 32.105469 38 33 38.894531 33 40 C 33 41.105469 32.105469 42 31 42 Z M 31 36 C 29.894531 36 29 35.105469 29 34 C 29 32.894531 29.894531 32 31 32 C 32.105469 32 33 32.894531 33 34 C 33 35.105469 32.105469 36 31 36 Z M 31 30 C 29.894531 30 29 29.105469 29 28 C 29 26.894531 29.894531 26 31 26 C 32.105469 26 33 26.894531 33 28 C 33 29.105469 32.105469 30 31 30 Z M 33 21 C 33 22.101563 32.101563 23 31 23 L 19 23 C 17.898438 23 17 22.101563 17 21 L 17 13 C 17 11.898438 17.898438 11 19 11 L 31 11 C 32.101563 11 33 11.898438 33 13 Z"></path></svg>
                  {a.Phone}
                </div>
              </td>
              {/* <td className="p-1">{new Date(a.Created).toTimeString().substr(0, 8)}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
  </>
}

export default DHSheet
