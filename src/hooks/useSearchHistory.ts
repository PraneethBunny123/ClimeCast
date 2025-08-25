import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./useLocalStorage";

interface SearchHistoryItem {
    id: string;
    query: string;
    lat: number;
    lon: number;
    name: string;
    country: string;
    state?: string;
    searchedAt: number;

}

export function useSearchHistory() {
    const [storedValue, setStoredValue] = useLocalStorage<SearchHistoryItem[]>("search-history", [])

    const queryClient = useQueryClient()

    const historyQuery = useQuery({
        queryKey: ["search-history"],
        queryFn: () => storedValue,
        initialData: storedValue
    })

    const addToHistory = useMutation({
        mutationFn: async (search: Omit<SearchHistoryItem, "id" | "searchedAt">) => {
            const newSearch: SearchHistoryItem = {
                ...search,
                id: `${search.lat}-${search.lon}-${Date.now()}`,
                searchedAt: Date.now(),
            }

            const filteredStoredValue = storedValue.filter(item => !(item.lat === search.lat && item.lon === search.lon))

            const newStoredValue = [newSearch, ...filteredStoredValue].slice(0, 10);

            setStoredValue(newStoredValue)
            return newStoredValue;
        },
        onSuccess: (newStoredValue) => {
            queryClient.setQueryData(["search-history"], newStoredValue)
        }
    })

    const clearHistory = useMutation({
        mutationFn: async () => {
            setStoredValue([])
            return []
        },
        onSuccess: () => {
            queryClient.setQueryData(["search-history"], [])
        }
    })

    return {
        history: historyQuery.data ?? [],
        addToHistory,
        clearHistory,
    }
}