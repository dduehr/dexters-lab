import { Route, redirect } from 'react-router-dom';

import RootLayout from './layouts/RootLayout';

import Home from './routes/Home';
import Projects from './routes/Projects';
import ProjectDetails from './routes/ProjectDetails';
import ProjectDetailsBranches from './routes/ProjectDetailsBranches';
import ProjectDetailsSnapshots from './routes/ProjectDetailsSnapshots';
import ProjectNew from './routes/ProjectNew';
import BranchDetails from './routes/BranchDetails';
import SnapshotDetails from './routes/SnapshotDetails';
import SnapshotWithBranchNew from './routes/SnapshotWithBranchNew';
import SnapshotNew from './routes/SnapshotNew';

import projectAction from './routes/actions/project'
import snapshotAction from './routes/actions/snapshot'
import snapshotWithNewBranchAction from './routes/actions/snapshotWithNewBranch'

import projectsLoader from './routes/loader/projects'
import projectLoader, { redirectToDefaultBranch } from './routes/loader/project'
import branchesLoader from './routes/loader/branches'
import snapshotsLoader from './routes/loader/snapshots'

export default function App() {
  return (
    <Route path="/" element={<RootLayout />}>
      <Route index={true} element={<Home />} />
      <Route path="projects">
        <Route index={true} loader={() => redirect("pages/0")} />
        <Route path="pages/:pageNr" loader={projectsLoader} element={<Projects />} />
      </Route>
      <Route path="projects/new" action={projectAction} element={<ProjectNew />} />
      <Route path="projects/:projectId/branches/new" action={snapshotWithNewBranchAction} loader={projectLoader} element={<SnapshotWithBranchNew />} />
      <Route path="projects/:projectId" loader={(args) => redirectToDefaultBranch(projectLoader, args)} element={<ProjectDetails />}>
        <Route path="branches/:branchId/snapshots" loader={branchesLoader} element={<ProjectDetailsBranches />}>
          <Route index={true} loader={() => redirect("pages/0")} />
          <Route path="pages/:pageNr" loader={snapshotsLoader} element={<ProjectDetailsSnapshots />} />
        </Route>
      </Route>
      <Route path="projects/:projectId/branches/:branchId/snapshots/new" action={snapshotAction} element={<SnapshotNew />} />
      <Route path="projects/:projectId/branches/:branchId/snapshots/:snapshotId" element={<SnapshotDetails />} />
      <Route path="projects/:projectId/branches/:branchId" element={<BranchDetails />} />
    </Route>
  );
}
