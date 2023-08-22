import { useSelector } from "react-redux";
import "../pages.css";

const Library = (props) => {
    const lightMode = useSelector((state: any) => state.page.lightMode);

    return (
        <div className={lightMode ? "page light" : "page dark"}>
            Library
        </div>
    );
}

export default Library;