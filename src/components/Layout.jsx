import { NavBar } from "./navBar";
import { Outlet } from "react-router-dom";

export function Layout(){
    return (
        <>
            <NavBar />
                <main>
                    <Outlet />
                </main>
        </>
    );
}