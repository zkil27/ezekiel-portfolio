import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Outlet } from "react-router-dom";

export function Layout(){
    return (
        <>
            <div className="nav-trigger"></div>
            <Navbar />
                <main>
                    <Outlet />
                </main>
            <Footer />
        </>
    );
}
