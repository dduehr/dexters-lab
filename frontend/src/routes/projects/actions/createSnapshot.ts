import { ActionFunctionArgs, redirect } from "react-router-dom";
import { getApi } from "../../../services/backend";
import { NewSnapshot, Problem } from "../../../generated-sources/ProjectsApi";
import { AxiosError } from "axios";

export default async function todosAction({ request, params }: ActionFunctionArgs) {
  const formData = Object.fromEntries(await request.formData())
  const { projectId, branchId } = params

  const newSnapshot = {
    branchId: branchId,
    data: formData.data,
    comment: formData.comment
  } as NewSnapshot

  try {
    await getApi().createSnapshot(newSnapshot)
    return redirect(`/projects/${projectId}/branches/${branchId}`)
  } catch (error) {
    const problem = (<AxiosError>error).response!.data as Problem
    return problem
  }
}