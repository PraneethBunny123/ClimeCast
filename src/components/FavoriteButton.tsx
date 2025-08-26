import type { WeatherData } from "@/api/types"

interface FavoriteButtonProps {
    data: WeatherData
}

export default function FavoriteButton({data}: FavoriteButtonProps) {
    // console.log(data)

    return (
        <div>Fav button</div>
    )
}