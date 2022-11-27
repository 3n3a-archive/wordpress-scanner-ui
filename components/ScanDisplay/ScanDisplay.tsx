import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useSharedState } from '../../store/main';

function useScan(url: string) {
    const combinedUrl: string = `${process.env.apiUrl}/scan`
    return useQuery(
        ['scan', { url }],
        () => axios.post(combinedUrl, {url:url})
          .then((res) => res.data),
        { enabled: true, retry: false }
    );
}

export function ScanDisplay() {
    const [state, setState] = useSharedState();
    const { isLoading, isError, error, data, isFetching } = useScan(state.url);
    
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