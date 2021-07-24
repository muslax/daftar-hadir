import fetchJson from "../libs/fetchJson"
import useSWR from "swr"

// http://localhost:3000/api/dh-list

export default function useList() {
  const url = `/api/dh-list`
  const { data, error, mutate } = useSWR(url, fetchJson)

  return {
    projects: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}