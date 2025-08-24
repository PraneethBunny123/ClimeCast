import LoadingSkeleton from "@/components/LoadingSkeleton";
import { Button } from "@/components/ui/button";
import { useGeoLocation } from "@/hooks/useGeoLocation";
import { RefreshCcw } from "lucide-react";

export default function Dashboard() {
    const {coordinates, error: locationError, isLoading: locationLoading, getLocation} = useGeoLocation()

    console.log(coordinates);

    function handleRefreshButton() {
        getLocation()
    }

    if(locationLoading) {
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
                >
                    <RefreshCcw className="h-4 w-2"/>
                </Button>
            </div>
        </div>
    )
}