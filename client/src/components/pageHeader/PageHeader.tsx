import { useSelector } from "react-redux";
import LightModeSwitch from "../lightModeSwitch/LightModeSwitch";
import SearchBar from "../searchBar/SearchBar";
import "./pageHeader.css";

const PageHeader = (props) => {
    const lightMode = useSelector((state: any) => state.page.lightMode);

    return (
        <div className={lightMode ? "page-header" : "page-header dark"}>
            <div className="left-header">
            </div>

            <SearchBar />

            <div className="right-header">
                <LightModeSwitch />
            </div>
        </div>
    );
}

export default PageHeader;