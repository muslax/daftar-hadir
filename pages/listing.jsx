import { useRouter } from "next/router"
import AllSheets from "../components/AllSheets"
import DHSheet from "../components/DHSheet"

const Listing = () => {
  const router = useRouter()
  const { pid } = router.query

  if (!pid || pid.length == 0) return <AllSheets />

  return <>
    <DHSheet pid={pid} />
  </>
}

export default Listing