import { useSelector } from "react-redux";
import { useEffect } from "react";
import "./pageNav.css";
import { HouseIcon, CreateIcon, GearIcon, LibraryIcon } from "../../constants/icons";

const PageNav = (props) => {
    const lightMode = useSelector((state: any) => state.page.lightMode);

    useEffect(() => {
        console.log(window.location.pathname);
    }, [])


    return (
        <div className={lightMode ? "page-nav" : "page-nav dark"} >

            <div className="top-nav">

                <div className="tab" onClick={() => window.location.pathname = '/home'}>
                    <HouseIcon color={window.location.pathname === '/home' || window.location.pathname === '/' ? "var(--PrimaryColor)" : "#FFFFFF"} />
                    home
                </div>

                <div className="tab" onClick={() => window.location.pathname = '/create'}>
                    <CreateIcon color={window.location.pathname === '/create' ? "var(--PrimaryColor)" : "#FFFFFF"} />
                    create
                </div>

                <div className="tab" onClick={() => window.location.pathname = '/library'}>
                    <LibraryIcon color={window.location.pathname === '/library' ? "var(--PrimaryColor)" : "#FFFFFF"} />
                    library
                </div>

            </div>

            <div className="bottom-nav">
                <div className="tab">
                    <GearIcon />
                    settings
                </div>
            </div>

        </div>
    );
}

export default PageNav;