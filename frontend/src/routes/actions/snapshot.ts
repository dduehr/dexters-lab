import { ActionFunctionArgs, redirect } from "react-router-dom";
import { getApi } from "../../services/backend";
import { NewSnapshot } from "../../generated-sources/ProjectsApi";

export default async function todosAction({ request, params }: ActionFunctionArgs) {
  const formData = Object.fromEntries(await request.formData())
  const { projectId, branchId } = params

  const newSnapshot = {
    branchId: branchId,
    data: formData.data,
    comment: formData.comment
  } as NewSnapshot

  await getApi().createSnapshot(newSnapshot)

  return redirect(`/projects/${projectId}/branches/${branchId}`)
}