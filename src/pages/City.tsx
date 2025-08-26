import CurrentWeather from "@/components/CurrentWeather"
import FavoriteButton from "@/components/FavoriteButton"
import HourlyTemperature from "@/components/HourlyTemperature"
import LoadingSkeleton from "@/components/LoadingSkeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import WeatherDetails from "@/components/WeatherDetails"
import WeatherForecast from "@/components/WeatherForecast"
import { useForecastQuery, useWeatherQuery } from "@/hooks/useWeather"
import { useParams, useSearchParams } from "react-router-dom"

export default function City() {
    const [searchParams] = useSearchParams()
    const params = useParams()

    const lat = parseFloat(searchParams.get("lat") || "0")
    const lon = parseFloat(searchParams.get("lon") || "0")

    const coordinates = {lat, lon}

    const weatherQuery = useWeatherQuery(coordinates)
    const forecastQuery = useForecastQuery(coordinates)

    if(weatherQuery.error || forecastQuery.error) {
        return (
            <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription className="flex flex-col gap-4">
                    Failed to load weather data. Please try again
                </AlertDescription>
            </Alert>
        )
    }

    if(!weatherQuery.data || !forecastQuery.data || !params.cityName) {
        return <LoadingSkeleton />
    }

    return (
        <div className="space-y-4">
            {/* Favorite cities */}
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">
                    {params.cityName}, {weatherQuery.data.sys.country}
                </h1>
                <div>
                    {/* favorite button */}
                    <FavoriteButton data={{...weatherQuery.data, name: params.cityName}}/>
                </div>
            </div>

            {/* weather */}
            <div className="grid gap-6">
                <div className="flex flex-col gap-4">
                    {/* current weather */}
                    <CurrentWeather data={weatherQuery.data}/>

                    {/* hourly temperature */}
                    <HourlyTemperature data={forecastQuery.data}/>
                </div>

                <div className="grid gap-4 md:grid-cols-2 items-start">
                    {/* details */}
                    <WeatherDetails data={weatherQuery.data} />
                    {/* forecast */}
                    <WeatherForecast data={forecastQuery.data}/>
                </div>
            </div>
        </div>
    )
}