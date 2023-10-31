import { ActionFunctionArgs, redirect } from "react-router-dom";
import { NewSnapshotWithBranch } from "../../generated-sources/ProjectsApi";
import { getApi } from "../../services/backend";

export default async function todosAction({ request, params }: ActionFunctionArgs) {
  const formData = Object.fromEntries(await request.formData())
  const { projectId } = params

  const newSnapshotWithBranch = {
    projectId: projectId,
    branchName: formData.branchName,
    data: formData.data,
    comment: formData.comment
  } as NewSnapshotWithBranch

  const response = await getApi().createSnapshotWithBranch(newSnapshotWithBranch)
  const snapshot = response.data

  return redirect(`/projects/${projectId}/branches/${snapshot.branch.id}`)
}