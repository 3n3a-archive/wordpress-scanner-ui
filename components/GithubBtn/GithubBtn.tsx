import { Button } from "@mantine/core";
import useStyles from "./GithubBtn.styles"

type GithubBtnProps = {
    link: string;
}

export function GithubBtn({ link }: GithubBtnProps) {
    const { classes } = useStyles();

    return (
        <>
            <Button component='a' className={classes.button} href={link}>Github</Button>
        </>
    )
}