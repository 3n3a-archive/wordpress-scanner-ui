import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ScanDisplay } from "../components/ScanDisplay/ScanDisplay";

const queryClient = new QueryClient()

export default function ScanPage() {
    return (
        <QueryClientProvider client={queryClient}>
            <ScanDisplay />
        </QueryClientProvider>
    )
}