import { Form, useActionData, useNavigate } from "react-router-dom";
import { Problem } from "../../generated-sources/ProjectsApi";
import { useState } from "react";
import { dispatch } from "../../utils/state";
import classNames from "classnames";

export default function ProjectNew() {
    const problem = useActionData() as Problem
    const navigate = useNavigate()

    const [name, setName] = useState()

    const isFormComplete = () => !!name

    return (
        <>
            <Form method="post">
                <div className="form-group mb-3">
                    <label htmlFor="name" className="form-label">Name<sup>*</sup></label>
                    <input type="input" className="form-control" name="name" onChange={dispatch(setName)} />
                    {problem?.details?.name && <div className="invalid-feedback d-block">{problem?.details?.name}</div>}
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="comment" className="form-label">Comment</label>
                    <textarea className="form-control" name="comment" rows={3}></textarea>
                </div>
                <div className="form-group mb-3">
                    <small>Fields marked with <sup>*</sup> are mandatory.</small>
                </div>
                <nav className="navbar-collapse">
                    <button className={classNames('btn', 'btn-primary', 'me-2', { 'disabled': !isFormComplete() })} type="submit">Save</button>
                    <button className="btn btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
                </nav>
            </Form>
        </>
    );
}