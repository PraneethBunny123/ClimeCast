import type { WeatherData } from "@/api/types"
import { useFavorites } from "@/hooks/useFavorites"
import { Button } from "./ui/button"
import { Star } from "lucide-react"
import { toast } from "sonner"

interface FavoriteButtonProps {
    data: WeatherData
}

export default function FavoriteButton({data}: FavoriteButtonProps) {
    const {addToFavorites, isFavorite, removeFavorite} = useFavorites()

    const isCurrentlyFavorite = isFavorite(data.coord.lat, data.coord.lon)
    // console.log(data)

    function handleToggleFavorite() {
        if(isCurrentlyFavorite) {
            removeFavorite.mutate(`${data.coord.lat}-${data.coord.lon}`)
            toast.error(`Removed ${data.name} from Favorites`)
        } else {
            addToFavorites.mutate({
                name: data.name,
                lat: data.coord.lat,
                lon: data.coord.lon,
                country: data.sys.country
            })
            toast.success(`Added ${data.name} to Favorites`)
        }
    }

    return (
        <Button 
            variant={isCurrentlyFavorite ? "default" : "outline"}
            size={"icon"}
            onClick={handleToggleFavorite}
            className={isCurrentlyFavorite ? "bg-yellow-500 hover:bg-yellow-500" : ""}    
        >
            <Star className={`h-4 w-4 ${isCurrentlyFavorite ? "fill-current" : ""}`}/>
        </Button>
    )
}