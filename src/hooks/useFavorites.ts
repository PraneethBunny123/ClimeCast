import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./useLocalStorage";

interface FavoriteItem {
    id: string;
    lat: number;
    lon: number;
    name: string;
    country: string;
    state?: string;
    AddedAt: number;

}

export function useFavorites() {
    const [favorites, setFavorites] = useLocalStorage<FavoriteItem[]>("favorites", [])

    const queryClient = useQueryClient()

    const favoritesQuery = useQuery({
        queryKey: ["favorites"],
        queryFn: () => favorites,
        initialData: favorites,
        staleTime: Infinity
    })

    const addToFavorites = useMutation({
        mutationFn: async (city: Omit<FavoriteItem, "id" | "AddedAt">) => {
            const newFavorite: FavoriteItem = {
                ...city,
                id: `${city.lat}-${city.lon}-${Date.now()}`,
                AddedAt: Date.now(),
            }

            const exists = favorites.some(fav => fav.id === newFavorite.id)

            if(exists) return favorites

            const newFavorites = [...favorites, newFavorite].slice(0, 10);

            setFavorites(newFavorites)
            return newFavorites;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["favorites"],
            })
        }
    })

    const removeFavorite = useMutation({
        mutationFn: async (cityId: string) => {
            const updatedFavorites = favorites.filter(city => city.id !== cityId)
            setFavorites(updatedFavorites)

            return updatedFavorites;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["favorites"],
            })
        }
    })

    return {
        history: favoritesQuery.data ?? [],
        addToFavorites,
        removeFavorite,
        isFavorite: (lat: number, lon: number) => favorites.some(city => city.lat === lat && city.lon === lon)
    }
}