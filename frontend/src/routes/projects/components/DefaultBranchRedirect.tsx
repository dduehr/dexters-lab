import { useNavigate, useRouteLoaderData } from "react-router-dom";
import { Project } from "../../../generated/openapi/projects";
import { useEffect } from "react";

export default function DefaultBranchRedirect() {
    const project = useRouteLoaderData("project") as Project | undefined
    const navigate = useNavigate()

    

    useEffect(() => {
        if (project) {
            navigate(project.defaultBranch ?
                `/projects/${project.id}/branches/${project.defaultBranch.id}/snapshots` :
                `/projects/${project.id}/branches/new`
            );

        } else {
            navigate('/projects')
        }
    }, [navigate, project]);

    return null;
}