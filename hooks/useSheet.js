import fetchJson from "../libs/fetchJson"
import useSWR from "swr"

// /api/dh?date=2021-07-30&slug=menggunakan-pewarna-baru

export default function useSheet(pid) {
  const url = `/api/dh?pid=${pid}`
  const { data, error, mutate } = useSWR(url, fetchJson)

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}