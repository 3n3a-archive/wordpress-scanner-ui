import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useSharedState } from '../../store/main';
import { NextRouter, useRouter } from 'next/router';
import { Button, Code, Group, List, Title, Text, Collapse } from '@mantine/core';
import { BtnLink } from '../BtnLink/BtnLink';
import { Prism } from '@mantine/prism';
import { useState } from 'react';

export interface ScanResult {
    url_info: UrlInfo;
    req_info: ReqInfo;
    document_info: DocumentInfo;
    time_info: TimeInfo;
    framework_info: FrameworkInfo;
}
export interface UrlInfo {
    original_url: string;
    host: string;
    scheme: string;
    port: string;
}
export interface ReqInfo {
    headers?: (HeadersEntity)[] | null;
    status: Status;
    is_alive: boolean;
    timing: Timing;
}
export interface HeadersEntity {
    name: string;
    value: string;
}
export interface Status {
    status_code: string;
    status_reason: string;
}
export interface Timing {
    response_time: string;
}
export interface DocumentInfo {
    source_code: string;
    page_title: string;
    css_urls?: (CssUrlsEntityOrJsUrlsEntityOrLinkUrlsEntity)[] | null;
    js_urls?: (CssUrlsEntityOrJsUrlsEntityOrLinkUrlsEntity)[] | null;
    img_urls?: (ImgUrlsEntity)[] | null;
    link_urls?: (CssUrlsEntityOrJsUrlsEntityOrLinkUrlsEntity)[] | null;
}
export interface CssUrlsEntityOrJsUrlsEntityOrLinkUrlsEntity {
    url: string;
}
export interface ImgUrlsEntity {
    url: string;
    alt: string;
}
export interface TimeInfo {
    created_at: string;
    timezone: string;
}
export interface FrameworkInfo {
    name: string;
    version: string;
    detected_vulnerabilities?: (null)[] | null;
    server: string;
}

function useScan(url: string, router: NextRouter) {
    const combinedUrl: string = `${process.env.apiUrl}/scan/${btoa(url)}`
    return useQuery(
        ['scan', { url }],
        () => axios.post(combinedUrl)
            .then((res) => {
                let data: ScanResult = res.data
                return data
            })
            .catch(e => {
                console.log(e)
                router.push("/")
            }),
        { enabled: true, retry: false, staleTime: 604800 }
    );
}

export function ScanDisplay() {
    const router = useRouter();
    const [sourceCodeState, setSourceCode] = useState(false); // closed
    const [state, setState] = useSharedState();
    const { isLoading, isError, error, data, isFetching } = useScan(state.url, router);

    return (
        <>
            <Group position='left' >
                <BtnLink name="Back" link="/" />
            </Group>
            {
                isLoading ? 'Loading...'
                    : isFetching ? 'Fetching...'
                        : isError ? 'Error!' + JSON.stringify(error)
                            : data ? (
                                <>
                                    <Title order={2}>
                                        Scan Result for {data.url_info.host}
                                    </Title>
                                    <Text>
                                        {data.time_info.created_at} - {data.time_info.timezone}
                                    </Text>

                                    <a href={data.url_info.original_url}>
                                        {data.url_info.original_url}
                                    </a>

                                    <Title order={2}>
                                        Framework Information
                                    </Title>
                                    <List>
                                        <List.Item>
                                            <Code color="blue">Name</Code>: {data.framework_info.name}
                                        </List.Item>
                                        <List.Item>
                                            <Code color="blue">Version</Code>: {data.framework_info.version}
                                        </List.Item>
                                        <List.Item>
                                            <Code color="blue">Server</Code>: {data.framework_info.server}
                                        </List.Item>
                                    </List>

                                    <Title order={3}>
                                        URL Information
                                    </Title>
                                    <List>
                                        <List.Item>
                                            <Code color="blue">Original URL</Code>: {data.url_info.original_url}
                                        </List.Item>
                                        <List.Item>
                                            <Code color="blue">Host</Code>: {data.url_info.host}
                                        </List.Item>
                                        <List.Item>
                                            <Code color="blue">Scheme</Code>: {data.url_info.scheme}
                                        </List.Item>
                                        <List.Item>
                                            <Code color="blue">Port</Code>: {data.url_info.port}
                                        </List.Item>
                                    </List>

                                    <Title order={3}>
                                        Request Information
                                    </Title>
                                    <List>
                                        <List.Item>
                                            <Code color="blue">Alive</Code>: {data.req_info.is_alive ? 'True':'False'}
                                        </List.Item>
                                        <List.Item>
                                            <>
                                                <Code color="blue">Status Code</Code>: {data.req_info.status.status_code}
                                            </>
                                        </List.Item>
                                        <List.Item>
                                            <>
                                                <Code color="blue">Status Reason</Code>: {data.req_info.status.status_reason}
                                            </>
                                        </List.Item>
                                        <List.Item>
                                            <>
                                                <Code color="blue">Scan Time</Code>: {data.req_info.timing.response_time}
                                            </>
                                        </List.Item>
                                        <List.Item>
                                            <>
                                                <Code color="blue">Headers</Code>: 
                                                <List withPadding>
                                                    {data.req_info.headers?.map(h => <List.Item><Code color="green">{h.name}</Code>: {h.value}</List.Item>)}
                                                </List>
                                            </>
                                        </List.Item>
                                    </List>

                                    <Title order={3}>
                                        Document Information
                                    </Title>

                                    <List>
                                        <List.Item>
                                            <Code color="blue">Page Title</Code>: {data.document_info.page_title}
                                        </List.Item>
                                        <List.Item>
                                            <>
                                                <Code color="blue">CSS Urls</Code>: 
                                                <List withPadding>
                                                    {data.document_info.css_urls?.map(h => <List.Item>{h.url}</List.Item>)}
                                                </List>
                                            </>
                                        </List.Item>
                                        <List.Item>
                                            <>
                                                <Code color="blue">Javascript Urls</Code>: 
                                                <List withPadding>
                                                    {data.document_info.js_urls?.map(h => <List.Item>{h.url}</List.Item>)}
                                                </List>
                                            </>
                                        </List.Item>
                                        <List.Item>
                                            <>
                                                <Code color="blue">Links</Code>: 
                                                <List withPadding>
                                                    {data.document_info.link_urls?.map(h => <List.Item>{h.url}</List.Item>)}
                                                </List>
                                            </>
                                        </List.Item>
                                        <List.Item>
                                            <>
                                                <Code color="blue">Images</Code>: 
                                                <List withPadding>
                                                    {data.document_info.img_urls?.map(h => <List.Item>{h.url} - {h.alt}</List.Item>)}
                                                </List>
                                            </>
                                        </List.Item>
                                    </List>
                                    <Button onClick={() => setSourceCode((o) => !o)}>
                                        Toggle Source Code
                                    </Button>
                                    <Collapse in={sourceCodeState}>
                                        <Prism language='markup' withLineNumbers>
                                            {atob(data.document_info.source_code)}
                                        </Prism>
                                    </Collapse>

                                    
                                </>
                            ) : (
                                'Unknown Error occurred'
                            )
            }
        </>
    )
}