import { Route, redirect } from 'react-router-dom';

import RootLayout from './routes/RootLayout';
import Home from './routes/Home';

import ProjectsLayout from './routes/projects/ProjectsLayout';
import Projects from './routes/projects/Projects';
import ProjectDetails from './routes/projects/ProjectDetails';
import ProjectNew from './routes/projects/ProjectNew';
import BranchDetails from './routes/projects/BranchDetails';
import DefaultBranchRedirect from './routes/projects/components/DefaultBranchRedirect';
import SnapshotDetails from './routes/projects/SnapshotDetails';
import SnapshotWithBranchNew from './routes/projects/SnapshotWithBranchNew';
import SnapshotNew from './routes/projects/SnapshotNew';

import findProjectsOrRedirectToProjectNew from './routes/projects/loader/findProjectsOrRedirectToProjectNew'
import findProjectById from './routes/projects/loader/findProjectById'
import findBranchById from './routes/projects/loader/findBranchById'
import findSnapshotById from './routes/projects/loader/findSnapshotById'
import findSnapshotsFirstLastByBranchId from './routes/projects/loader/findSnapshotsFirstLastByBranchId'

import createProject from './routes/projects/actions/createProject'
import createSnapshot from './routes/projects/actions/createSnapshot'
import createSnapshotWithBranch from './routes/projects/actions/createSnapshotWithBranch'

export default function App() {
  return (
    <Route path="/" element={<RootLayout />}>
      <Route index={true} element={<Home />} />
      <Route path="projects" element={<ProjectsLayout />}>
        <Route index={true} loader={() => redirect("pages/0")} />
        <Route path="new" action={createProject} element={<ProjectNew />} />
        <Route path="pages/:pageNr" loader={findProjectsOrRedirectToProjectNew} element={<Projects />} />
        <Route path=":projectId" loader={findProjectById} id="project">
          <Route index={true} loader={() => redirect("branches/default")} />
          <Route path="branches">
            <Route path="new" action={createSnapshotWithBranch} element={<SnapshotWithBranchNew />} />
            <Route path="default" element={<DefaultBranchRedirect />} />
            <Route path=":branchId" loader={findBranchById} id="branch">
              <Route index={true} loader={findSnapshotsFirstLastByBranchId} element={<BranchDetails />} />
              <Route path="snapshots">
                <Route index={true} loader={() => redirect("pages/0")} />
                <Route path="new" action={createSnapshot} element={<SnapshotNew />} />
                <Route path=":snapshotId" loader={findSnapshotById} element={<SnapshotDetails />} />
                <Route path="pages/:pageNr" element={<ProjectDetails />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
    </Route>
  );
}
