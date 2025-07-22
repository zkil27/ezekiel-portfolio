import { NavBar } from "./navBar";
import { Footer } from "./Footer";
import { Outlet } from "react-router-dom";

export function Layout(){
    return (
        <>
            <div className="nav-trigger"></div>
            <NavBar />
                <main>
                    <Outlet />
                </main>
            <Footer />
        </>
    );
}