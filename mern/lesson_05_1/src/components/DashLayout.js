import { Outlet } from "react-router-dom";
import DashHeader from "./DashHeader";

const DashLayout = () => {
    return (
        <>
            <div className="dash-container">
				<DashHeader />
                <Outlet />
            </div>
        </>
    );
};

export default DashLayout;
