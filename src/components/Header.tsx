import { Link } from "react-router-dom";
import { ModeToggle } from "./toggleMode";
import CitySearch from "./CitySearch";
import UnitsToggle from "./UnitsToggle";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2 supports-[backdrop-filter]:bg-background/60">

            {/* Link to home page */}
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link to="/">ClimeCast</Link>
                <div className="flex gap-4">
                    {/* Search */}
                    <CitySearch />
                    
                    {/* theme toggle */}
                    <ModeToggle />

                    {/* units toggle */}
                    <UnitsToggle />
                </div>

            </div>
            
        </header>
    )
    }
