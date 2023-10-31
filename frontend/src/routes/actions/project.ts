import { ActionFunctionArgs, redirect } from "react-router-dom";
import { getApi } from "../../services/backend";
import { NewProject } from "../../generated-sources/ProjectsApi";

export default async function todosAction({ request }: ActionFunctionArgs): Promise<Response> {
  const formData = Object.fromEntries(await request.formData())

  const newProject = {
    name: formData.name,
    comment: formData.comment
  } as NewProject

  const response = await getApi().createProject(newProject)
  const project = response.data

  return redirect(`/projects/${project.id}`)
}