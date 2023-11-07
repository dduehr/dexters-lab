import { Route, redirect } from 'react-router-dom';
import { Branch, Project, Snapshot } from './generated/openapi/projects';

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

import findProjects from './routes/projects/loader/findProjects'
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
      <Route path="projects" handle={{ crumb: () => 'Projects' }} element={<ProjectsLayout />}>
        <Route index={true} loader={() => redirect("pages/0")} />
        <Route path="new" handle={{ crumb: () => 'New Project' }} action={createProject} element={<ProjectNew />} />
        <Route path="pages/:pageNr" loader={findProjects} element={<Projects />} />
        <Route path=":projectId" handle={{ crumb: (data: Project) => data.name, active: (data: Project) => data.defaultBranch }} loader={findProjectById} id="project">
          <Route index={true} loader={() => redirect("branches/default")} />
          <Route path="branches">
            <Route path="new" handle={{ crumb: () => 'New Branch' }} action={createSnapshotWithBranch} element={<SnapshotWithBranchNew />} />
            <Route path="default" element={<DefaultBranchRedirect />} />
            <Route path=":branchId" handle={{ crumb: (data: Branch) => data.name, subPath: () => 'snapshots' }} loader={findBranchById} id="branch">
              <Route index={true} handle={{ crumb: () => 'Branch Details' }} loader={findSnapshotsFirstLastByBranchId} element={<BranchDetails />} />
              <Route path="snapshots">
                <Route index={true} loader={() => redirect("pages/0")} />
                <Route path="new" handle={{ crumb: () => 'New Snapshot' }} action={createSnapshot} element={<SnapshotNew />} />
                <Route path=":snapshotId" handle={{ crumb: (data: Snapshot) => data.createdAt }} loader={findSnapshotById} element={<SnapshotDetails />} />
                <Route path="pages/:pageNr" element={<ProjectDetails />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
    </Route>
  );
}
