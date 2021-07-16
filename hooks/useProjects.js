import fetchJson from "../libs/fetchJson"
import useSWR from "swr"

export default function useProjects() {
  const url = "/api/get"
  const { data, error, mutate } = useSWR(url, fetchJson)

  return {
    projects: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}