import LoadingSkeleton from "@/components/LoadingSkeleton";
import { Button } from "@/components/ui/button";
import { useGeoLocation } from "@/hooks/useGeoLocation";
import { AlertTriangle, MapPin, RefreshCcw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from "@/hooks/useWeather";

export default function Dashboard() {
    const {coordinates, error: locationError, isLoading: locationLoading, getLocation} = useGeoLocation()

    // console.log(coordinates);

    const weatherQuery = useWeatherQuery(coordinates)
    const forecastQuery = useForecastQuery(coordinates)
    const locationQuery = useReverseGeocodeQuery(coordinates)
    // console.log(JSON.parse(JSON.stringify(locationQuery)))


    function handleRefreshButton() {
        getLocation();

        if(coordinates) {
            weatherQuery.refetch()
            forecastQuery.refetch()
            locationQuery.refetch()
        }
    }

    if(locationLoading) {
        return <LoadingSkeleton />
    }

    if(locationError) {
        return (
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4"/>
                <AlertTitle>Location Error</AlertTitle>
                <AlertDescription className="flex flex-col gap-4">
                    <p>{locationError}</p>
                    <Button onClick={handleRefreshButton} variant="outline" className="w-fit">
                        <MapPin className="mr-2 h-4 w-4" />
                        Enable Location
                    </Button>
                </AlertDescription>
            </Alert>
        )
    }

    if(!coordinates) {
        return (
            <Alert variant="destructive">
                <AlertTitle>Location Required</AlertTitle>
                <AlertDescription className="flex flex-col gap-4">
                    <p>Please enable location access to see your local weather.</p>
                    <Button onClick={handleRefreshButton} variant="outline" className="w-fit">
                        <MapPin className="mr-2 h-4 w-4" />
                        Enable Location
                    </Button>
                </AlertDescription>
            </Alert>
        )
    }

    const locationName = locationQuery.data?.[0]

    if(weatherQuery.error || forecastQuery.error) {
        return (
            <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription className="flex flex-col gap-4">
                    <p>Failed to fetch. Please try again</p>
                    <Button onClick={handleRefreshButton} variant="outline" className="w-fit">
                        <RefreshCcw className="mr-2 h-4 w-4" />
                        retry
                    </Button>
                </AlertDescription>
            </Alert>
        )
    }

    if(!weatherQuery.data || !forecastQuery.data) {
        return <LoadingSkeleton />
    }
    

    return (
        <div className="space-y-4">
            {/* Favorite cities */}
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold tracking-tight">My Location</h1>
                <Button
                    variant="outline"
                    size={"icon"}
                    onClick={handleRefreshButton}
                    disabled={weatherQuery.isFetching || forecastQuery.isFetching}
                >
                    <RefreshCcw className={`h-4 w-2 ${weatherQuery.isFetching ? "animate-spin" : ""}`}/>
                </Button>
            </div>

            {/* Current weather */}
        </div>
    )
}