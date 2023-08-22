import { useSelector, useDispatch } from "react-redux";
import "./lightModeSwitch.css";
import { toggleLightMode } from "../../store/page/pageSlice";

const LightModeSwitch = (props) => {
    const lightMode = useSelector((state: any) => state.page.lightMode);
    const dispatch = useDispatch();

    const toggle = () => {
        dispatch(toggleLightMode(!lightMode));
    }

    return (
        <div className="mode-switch noselect" onClick={toggle}>
            <div className={lightMode ? "toggle-switch" : "toggle-switch dark"}></div>
        </div>
    );
}

export default LightModeSwitch;