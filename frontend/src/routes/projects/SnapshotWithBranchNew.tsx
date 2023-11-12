import classNames from "classnames";
import { useState } from "react";
import { Form, useActionData, useNavigate } from "react-router-dom";
import { Problem } from "../../generated/openapi/projects";
import { dispatch } from "../../utils/state";

export default function SnapshotWithBranchNew() {
    const problem = useActionData() as Problem
    const navigate = useNavigate()

    const [branchName, setBranchName] = useState()
    const [data, setData] = useState()

    const isFormComplete = () => !!branchName && !!data

    return (
        <>
            <Form method="post">
                {problem?.details?.projectId && <div className="invalid-feedback d-block mb-3">{problem?.details?.projectId}</div>}
                <div className="form-group mb-3">
                    <label htmlFor="branchName" className="form-label">Branch Name<sup>*</sup></label>
                    <input type="input" className="form-control" name="branchName" onChange={dispatch(setBranchName)} />
                    <div className="form-text">This will be the default branch</div>
                    {problem?.details?.branchName && <div className="invalid-feedback d-block">{problem?.details?.branchName}</div>}
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="data" className="form-label">Initial Data<sup>*</sup></label>
                    <textarea className="form-control" name="data" rows={3} onChange={dispatch(setData)}></textarea>
                    {problem?.details?.data && <div className="invalid-feedback d-block">{problem?.details?.data}</div>}
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
                    <button className="btn btn-secondary" onClick={(e) => { e.preventDefault(); navigate('/projects') }}>Cancel</button>
                </nav>
            </Form>
        </>
    );
}