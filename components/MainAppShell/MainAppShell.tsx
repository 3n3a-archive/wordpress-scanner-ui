import { useState } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  MediaQuery,
  Burger,
  useMantineTheme,
  Space,
  Image,
  Title
} from '@mantine/core';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';
import { BtnLink } from '../BtnLink/BtnLink';
import { GithubBtn } from '../GithubBtn/GithubBtn';

//@ts-ignore
export function MainAppShell({children}) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      footer={
        <Footer height={60} p="md">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
            <div>
            Copyright © Enea "3n3a" Krähenbühl
            </div>
              
            <GithubBtn link={'https://github.com/3n3a/wordpress-scanner'} />
          </div>
        </Footer>
      }
      header={
        <Header height={70} p="md">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
            <div></div>

            <Title order={1}>
              Wordpress Scanner
            </Title>

            <ColorSchemeToggle></ColorSchemeToggle>

          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}