import { ActionFunctionArgs, redirect } from "react-router-dom";
import { getApi } from "../../../services/backend";
import { NewProject, Problem, Project } from "../../../generated-sources/ProjectsApi";
import { AxiosError } from "axios";

export default async function todosAction({ request }: ActionFunctionArgs) {
  const formData = Object.fromEntries(await request.formData())

  const newProject = {
    name: formData.name,
    comment: formData.comment
  } as NewProject

  try {
    const response = await getApi().createProject(newProject)
    const project = response.data as Project
    return redirect(`/projects/${project.id}`)
  } catch (error) {
    const problem = (<AxiosError>error).response!.data as Problem
    return problem
  }
}