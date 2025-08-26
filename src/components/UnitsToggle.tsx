import { useState } from "react";
import { Button } from "./ui/button";

export default function UnitsToggle() {
    const [unit, setUnit] = useState<"metric" | "imperial">("imperial")

    function handleToggle() {
        setUnit(unit === "metric" ? "imperial" : "metric")
    }

    return (
        <Button variant="outline" size="icon" onClick={handleToggle}>
            {unit === "metric" ? "°C" : "°F"}
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}