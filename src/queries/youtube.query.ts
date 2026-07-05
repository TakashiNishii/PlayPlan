import { queryOptions, useQuery } from "@tanstack/react-query"

const resolveApiBaseUrl = () => {
  const apiBase = process.env.NEXT_PUBLIC_API_LINK || process.env.API_LINK || "http://localhost:3001"
  return apiBase.replace(/\/$/, "")
}

export const searchVideosQueryOptions = (query: string[]) => {
  const apiBaseUrl = resolveApiBaseUrl()

  return queryOptions({
    queryKey: ["search-videos", query],
    queryFn: () =>
      fetch(`${apiBaseUrl}/youtube/list?query=${query.join(",")}`).then((res) =>
        res.json(),
      ),
    staleTime: 1000 * 60 * 5,
  })
}

export const useSearchVideos = (query: string[], enabled = query.length > 0) => {
  return useQuery({
    ...searchVideosQueryOptions(query),
    enabled,
  })
}