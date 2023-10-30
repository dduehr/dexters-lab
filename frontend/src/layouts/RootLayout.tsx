import { Outlet } from "react-router-dom";
import TopMenuBar from "../components/TopMenuBar";
import TopNavigationBar from "../components/TopNavigationBar";

export default function RootLayout() {
    return (
        <>
        <TopNavigationBar/>
        <TopMenuBar />
        <Outlet />
        </>
    );
}