import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import * as query from "../../../functions/query";
import { setShowModal } from "../../../store/page/pageSlice";
import { setUserProjects } from "../../../store/project/projectSlice";

const CreateProjectModal = (props) => {
    const lightMode = useSelector((state: any) => state.page.lightMode);
    const userProjects = useSelector((state: any) => state.project.userProjects);
    const dispatch = useDispatch();

    const submit = (e) => {
        e.preventDefault();

        const name = e.target.querySelector('#name') ? e.target.querySelector('#name').value : null;
        const synopsis = e.target.querySelector('#synopsis') ? e.target.querySelector('#synopsis').value : null;

        console.log(e.target.action, name, synopsis);

        if (name && synopsis) {
            const data = { name, synopsis };

            query.POST(e.target.action, data)
                .then((data) => {
                    console.log(data);
                    dispatch(setUserProjects([...userProjects, data.project]));
                    dispatch(setShowModal(false))
                });

        } else {
            console.log("Missing Fields");
        }
    }

    return (
        <form id="CreateProjectForm" className={lightMode ? "form" : "form dark"} name="createProjectForm" onSubmit={submit} action="/createProject">
            <span className="form-title">Create Project</span>

            <span className="form-field">
                <label className="form-label" htmlFor="name">Project Name</label>
                <input className="form-input" id="name" type="text" name="name" defaultValue={""}
                    onChange={(e) => {
                        if (e.target.parentElement) {
                            e.target.value.length > 0 ?
                                e.target.parentElement.classList.add('has-content')
                                :
                                e.target.parentElement.classList.remove('has-content');
                        }
                    }} />
            </span>

            <span className="form-field">
                <label className="form-label" htmlFor="synopsis">Project Synopsis</label>
                <textarea className="form-textarea" id="synopsis" name="synopsis" defaultValue={""} rows={6}
                    onChange={(e) => {
                        if (e.target.parentElement) {
                            e.target.value.length > 0 ?
                                e.target.parentElement.classList.add('has-content')
                                :
                                e.target.parentElement.classList.remove('has-content');
                        }
                    }} />
            </span>

            <span className="form-footer">
                <input className="form-submit" type="submit" value='Create' />
            </span>
        </form>
    );
}

export default CreateProjectModal;