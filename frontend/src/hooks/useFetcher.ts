import { useEffect, useState } from "react";
import { AxiosResponse } from "axios"

export default function useFetcher<T>(request: () => Promise<AxiosResponse<T>>) {
    const [data, setData] = useState<T>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        request().then((response) => {
            setData(response.data);
            setLoading(false);
        }).catch((err) => {
            setError(err);
            setLoading(false);
        });
    }, [request]);

    return { data, loading, error };
}
