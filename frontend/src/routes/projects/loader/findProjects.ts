import { LoaderFunctionArgs, redirect } from 'react-router-dom';
import { toInt } from '../../../utils/parser.ts';
import { getApi } from '../../../services/backend.ts';
import { Project } from '../../../generated/openapi/projects/api.ts';
import { Page } from '../../../types/page.ts';

const loader = async ({ params }: LoaderFunctionArgs): Promise<Response | Page<Project[]>> => {
    const { pageNr: paramsPageNr } = params;
    const pageNr = toInt(paramsPageNr);
    const pageSize = import.meta.env.VITE_PAGE_SIZE

    if (pageNr.toString() !== paramsPageNr) {
        return redirect("/projects/page/0");
    }

    const response = await getApi().findProjects(pageNr, pageSize);

    return {
        nr: response.headers['pagination-currentpage'],
        count: response.headers['pagination-pagecount'],
        data: response.data
    }
}

export default loader;