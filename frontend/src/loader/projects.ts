import { LoaderFunctionArgs, redirect } from 'react-router-dom';
import { toInt } from '../utils/parser.ts';
import { getApi } from '../services/backend.ts';
import { Project } from '../generated-sources/ProjectsApi/api.ts';

const loader = async ({ params }: LoaderFunctionArgs): Promise<Response|Project[]> => {
    const { pageNr: paramsPageNr } = params;
    const pageNr = toInt(paramsPageNr);

    if (pageNr.toString() !== paramsPageNr) {
        return redirect("/projects/page/0");
    }

    const response = await getApi().findAllProjects();

    return response.data;
}

export default loader;