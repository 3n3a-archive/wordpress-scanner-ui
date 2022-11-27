import { Box, Button, Group, Input, TextInput, Title } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useRouter } from "next/router";
import { useSharedState } from "../../store/main";


type UrlInputProps = {

}

type FormFields = {
    url: string,
}

export function UrlInput({}: UrlInputProps) {
    const [state, setState] = useSharedState();
    const router = useRouter();

    const form = useForm({
        initialValues: {
            url: ''
        },
    })

    function updateFormValues(values: FormFields) {
        setState((prev) => ({...prev, url: values.url}))

        router.push('scan')
    }

    return (
        <Box sx={{ maxWidth: 300 }} mx="auto">
            <Title order={2}>
              Enter your URL
            </Title>

            <form onSubmit={form.onSubmit((values) => updateFormValues(values))}>
                <TextInput
                  mt="md"
                  placeholder="https://www.wordpress.org"
                  {...form.getInputProps('url')}
                />

                <Group position="right" mt="md">
                    <Button type="submit">Scan</Button>
                </Group>
            </form>
        </Box>
    )
}