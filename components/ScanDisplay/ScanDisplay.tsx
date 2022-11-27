import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useSharedState } from '../../store/main';
import { NextRouter, useRouter } from 'next/router';

function useScan(url: string, router: NextRouter) {
    const combinedUrl: string = `${process.env.apiUrl}/scan/${btoa(url)}`
    return useQuery(
        ['scan', { url }],
        () => axios.post(combinedUrl)
          .then((res) => res.data)
          .catch(e => {
            console.log(e)
            router.push("/")
          }),
        { enabled: true, retry: false, staleTime: 604800 }
    );
}

export function ScanDisplay() {
    const router = useRouter();
    const [state, setState] = useSharedState();
    const { isLoading, isError, error, data, isFetching } = useScan(state.url, router);
    
    return (
        <>
            {
                isLoading ? 'Loading...'
                : isFetching ? 'Fetching...'
                : isError ? 'Error!' + JSON.stringify(error)
                : data ? (
                    <>
                        <pre>
                            {JSON.stringify(data)}
                        </pre>
                    </>
                ) : (
                    'Unknown Error occurred'
                )
            }
        </>
    )
}