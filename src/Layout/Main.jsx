import { Outlet } from "react-router-dom";
import Footer from "../Routes/Shared/Footer/Footer";
import NavBar from "../Routes/Shared/NavBar/NavBar";

const Main = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;