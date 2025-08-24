import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

export default function Dashboard() {
    return (
        <div className="space-y-4">
            {/* Favorite cities */}
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold tracking-tight">My Location</h1>
                <Button
                    variant="outline"
                    size={"icon"}
                >
                    <RefreshCcw className="h-4 w-2"/>
                </Button>
            </div>
        </div>
    )
}