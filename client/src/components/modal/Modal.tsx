import { useSelector, useDispatch } from "react-redux";
import "./modal.css";
import { useState } from "react";
import * as query from "../../functions/query";
import { setAccount, setShowModal } from "../../store/page/pageSlice";
import CreateProjectModal from "./modalTypes/CreateProjectModal";

const Modal = (props) => {
    const lightMode = useSelector((state: any) => state.page.lightMode);
    const modalType = useSelector((state: any) => state.page.modalType);
    const dispatch = useDispatch();

    return (
        <div className="overlay" onClick={() => dispatch(setShowModal(false))}>
            <div className={lightMode ? "modal light" : "modal dark"} onClick={(e) => e.stopPropagation()}>
                {modalType === 'create-project' ?
                    <CreateProjectModal />
                    :
                    null}
            </div>
        </div>
    );
}

export default Modal;