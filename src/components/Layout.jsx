import { NavBar } from "./navBar";
import { Outlet } from "react-router-dom";

export function Layout(){
    return (
        <>
            <div className="nav-trigger"></div>
            <NavBar />
                <main>
                    <Outlet />
                </main>
            
        </>
    );
}