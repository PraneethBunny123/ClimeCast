import LoadingSkeleton from "@/components/LoadingSkeleton";
import { Button } from "@/components/ui/button";
import { useGeoLocation } from "@/hooks/useGeoLocation";
import { AlertTriangle, MapPin, RefreshCcw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useReverseGeocodeQuery } from "@/hooks/useWeather";
import { data } from "react-router-dom";

export default function Dashboard() {
    const {coordinates, error: locationError, isLoading: locationLoading, getLocation} = useGeoLocation()

    console.log(coordinates);

    const locationQuery = useReverseGeocodeQuery(coordinates)
    console.log(JSON.parse(JSON.stringify(locationQuery)))


    function handleRefreshButton() {
        getLocation()
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
                    <Button onClick={getLocation} variant="outline" className="w-fit">
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
                    <Button onClick={getLocation} variant="outline" className="w-fit">
                        <MapPin className="mr-2 h-4 w-4" />
                        Enable Location
                    </Button>
                </AlertDescription>
            </Alert>
        )
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
                >
                    <RefreshCcw className="h-4 w-2"/>
                </Button>
            </div>
        </div>
    )
}