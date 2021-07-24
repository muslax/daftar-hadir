import useList from "../hooks/useList"

const AllSheets = () => {
  const { projects, isLoading, isError, mutate } = useList()

  if (isLoading) return null
  if (isError) return <p>ERROR</p>

  return <>
    <div className="max-w-5xl p-5">
      <h1 className="text-lg font-bold pb-2 border-b border-gray-800">
        Daftar Presensi
      </h1>
      {projects.map(({ _id, Title: title, Date: date, attendees }) => (
        <div key={_id} className="flex items-start space-x-4 py-2">
          <div className="flex-shrink-0">{date}</div>
          {/* <div className="w-9 flex-shrink-0 text--right font-semibold">{attendees}</div> */}
          <div className="text-gray-500">
            <a href={`/listing?pid=${_id}`}
              className="text-blue-500 hover:underline"
            >
              {title}
            </a>&nbsp;-&nbsp;({attendees})
          </div>
        </div>
      ))}
    </div>
    <pre className="text-xs">{JSON.stringify(projects, null, 2)}</pre>
  </>
}

export default AllSheets