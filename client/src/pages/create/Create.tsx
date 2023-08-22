import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import * as query from "../../functions/query";
import "../pages.css";
import "./create.css";
import { setUserProjects } from "../../store/project/projectSlice";
import { setShowModal, setModalType } from "../../store/page/pageSlice";

const Create = (props) => {
    const lightMode = useSelector((state: any) => state.page.lightMode);
    const userProjects = useSelector((state: any) => state.project.userProjects);
    const dispatch = useDispatch();

    useEffect(() => {
        query.GET('/getUserProjects')
            .then((data) => {
                console.log(data);
                if (!data.error) {
                    dispatch(setUserProjects(data.projects));
                }
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={lightMode ? "page light" : "page dark"}>

            <div className="projects">

                <div className="header">
                    <div className="title">My Projects</div>
                    <div className="new-button" onClick={() => {
                        dispatch(setShowModal(true));
                        dispatch(setModalType('create-project'));
                    }}>New Project</div>
                </div>

                <div className="list">
                    {userProjects ?
                        userProjects.length > 0 ?
                            userProjects.map((project) => (
                                <div className="project-item">
                                    {project.name}
                                </div>
                            ))
                            :
                            <div className="no-projects">No Projects...</div>
                        :
                        null
                    }
                </div>

            </div>

        </div>
    );
}

export default Create;