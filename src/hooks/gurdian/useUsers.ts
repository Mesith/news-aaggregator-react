import { useInfiniteQuery } from "@tanstack/react-query";
import ky from "ky";
interface Users {
  id: number;
  name: string;
}

interface UserQuery {
  pageSize: number;
}

const useUsers = (query: UserQuery) =>
  useInfiniteQuery<Users[], Error>({
    queryKey: ["users", query],
    queryFn: () =>
      ky
        .get("https://jsonplaceholder.typicode.com/users", {
          params: {
            _page: 2,
            _limit: query.pageSize,
          },
        })
        .then((res) => res.data),
    getNextPageParam(lastPage, allPages) {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
  });

export default useUsers;
