import { Form, useActionData, useLoaderData, useNavigate } from "react-router-dom";
import { Problem, Snapshot } from "../../generated/openapi/projects";
import { dispatch } from "../../utils/state";
import classNames from "classnames";
import { useState } from "react";

export default function SnapshotNew() {
    const problem = useActionData() as Problem 
    const lastSnapshot = useLoaderData() as Snapshot
    const navigate = useNavigate();

    const [data, setData] = useState()

    const isFormComplete = () => !!data

    return (
        <>
            <Form method="post">
                <input type="hidden" name="lastData" value={lastSnapshot.data} />
                <div className="form-group mb-3">
                    <label htmlFor="data" className="form-label">Data<sup>*</sup></label>
                    <textarea className="form-control" name="data" rows={3} defaultValue={lastSnapshot.data} onChange={dispatch(setData)} />
                    {problem?.details?.data && <div className="invalid-feedback d-block">{problem?.details?.data}</div>}
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="comment" className="form-label">Comment</label>
                    <textarea className="form-control" name="comment" rows={3} defaultValue={lastSnapshot.comment}></textarea>
                </div>
                <div className="form-group mb-3">
                    <small>Fields marked with <sup>*</sup> are mandatory.</small>
                </div>
                <nav className="form-group navbar-collapse">
                    <button className={classNames('btn', 'btn-primary', 'me-2', { 'disabled': !isFormComplete() })} type="submit">Save</button>
                    <button className="btn btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
                </nav>
            </Form>
        </>
    );
}