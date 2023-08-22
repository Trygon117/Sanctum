import { useSelector } from "react-redux";
import "./searchBar.css";
import { SearchIcon } from "../../constants/icons";
import { useState } from "react";

const PageHeader = (props) => {
    const [active, setActive] = useState(false);

    return (
        <div className={active ? "search-bar active" : "search-bar"} onFocus={() => setActive(true)} onBlur={() => setActive(false)}>
            {active ?
                <div className="search-icon">
                    <SearchIcon />
                </div>
                : null
            }
            <input className="search-input" placeholder="Search" />

            <div className="search-button">
                Search
            </div>
        </div>
    );
}

export default PageHeader;