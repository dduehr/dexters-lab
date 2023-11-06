import { useEffect, useState } from "react";
import { AxiosResponse } from "axios"
import { Page } from "../types/page";

export default function usePageFetcher<T>(request: () => Promise<AxiosResponse<T>>) {
    const [page, setPage] = useState<Page<T>>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        request().then((response) => {
            setPage({
                nr: response.headers['pagination-currentpage'],
                count: response.headers['pagination-pagecount'],
                data: response.data
            })
            setLoading(false);
        }).catch((err) => {
            setError(err);
            setLoading(false);
        });
    }, [request]);

    return { page, loading, error };
}