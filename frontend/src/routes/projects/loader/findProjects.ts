import { LoaderFunctionArgs, redirect } from 'react-router-dom';
import { toInt } from '../../../utils/parser.ts';
import { getApi } from '../../../services/backend.ts';
import { Project } from '../../../generated-sources/ProjectsApi/api.ts';
import { Page } from '../../../types/page.ts';

const loader = async ({ params }: LoaderFunctionArgs): Promise<Response | Page<Project[]>> => {
    const { pageNr: paramsPageNr } = params;
    const pageNr = toInt(paramsPageNr);

    if (pageNr.toString() !== paramsPageNr) {
        return redirect("/projects/page/0");
    }

    // TODO: rename REST enpoint "findAllProjects" -> "findProjects"
    const response = await getApi().findAllProjects(pageNr, 10);

    return {
        nr: response.headers['pagination-currentpage'],
        count: response.headers['pagination-pagecount'],
        data: response.data
    }
}

export default loader;