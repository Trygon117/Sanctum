import { useSelector } from "react-redux";
import "../pages.css";

const Community = (props) => {
    const lightMode = useSelector((state: any) => state.page.lightMode);

    return (
        <div className={lightMode ? "page light" : "page dark"}>
            Community
        </div>
    );
}

export default Community;