import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  button: {
    '&': {
      backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.gray[0] : theme.colors.dark[9],
      color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[0],
    },
    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.gray[2] : theme.colors.dark[7],
      color: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2],
    }
  },
}))