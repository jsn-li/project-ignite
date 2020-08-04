import React from 'react';
import Head from 'next/head';
import { Layout, Drawer, Button, Space } from 'antd';
import { CloseOutlined, MenuOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Context as ResponsiveContext } from 'react-responsive'
import '../styles/my-theme.less';

import CustomMenu from '../components/CustomMenu';

const { Header, Content, Footer } = Layout;

const StyledHeader = styled(Header)`
  width: 100%;
  background: ${props => props.theme === "light" ? "#FFFFFF" : "#001529"};
`;

const StyledLayout = styled(Layout)`
  display: flex;
  align-items: center;
  background: #FFFFFF;
`;

const StyledContent = styled(Content)`
  padding: 0 1em 0 1em;
`;

const StyledSpace = styled(Space)`
  float: right;
`;

const Main = styled.div`
  width: 100%;
  max-width: 1000px;
  min-width: 300px;
  overflow: hidden;
`;

const StyledFooter = styled(Footer)`
  background: #FFFFFF;
  text-align: center;
`;

const Logo = styled.div`
  float: left;
  display: inline;
  font-size: 1.5em;
`;

const MediaQuery = styled.div`
  .mobile {
    display: inline;
  }
  .desktop {
    display: none;
  }
  @media (min-width: 768px) {
    .mobile {
      display: none;
    }
    .desktop {
      display: inline;
    }
  }
`;

function MyApp({ Component, pageProps }) {
  const ROUTES = [
    {route: '/', name: 'Home'},
    // {route: '/curriculum', name: 'Curriculum'},
    {route: '/the-team', name: 'The Team'},
    {route: '/testimonials', name: 'Testimonials'},
    {route: '/contact', name: 'Contact'},
  ];

  const router = useRouter();
  const [visible, setVisible] = React.useState(false);

  const toggleDrawer = () => {
    setVisible(!visible);
  };
  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <StyledLayout>
        <Drawer
          title={<Button onClick={() => toggleDrawer()}><CloseOutlined /></Button>}
          placement="right"
          closable={false}
          onClose={onClose}
          visible={visible}>
          <CustomMenu routes={ROUTES} theme="light" mode="vertical" defaultSelectedKeys={[router.pathname]}/>
        </Drawer>
        <Main>
          <StyledHeader theme="light">
            <Logo>Project Ignite</Logo>
            <StyledSpace direction="horizontal">
              <MediaQuery>
                <Button className="mobile" onClick={() => toggleDrawer()}><MenuOutlined /></Button>
                <CustomMenu className="desktop" routes={ROUTES} theme="light" mode="horizontal" defaultSelectedKeys={[router.pathname]}/>
              </MediaQuery>
            </StyledSpace>
          </StyledHeader>
          <StyledContent>
              <Component {...pageProps} />
          </StyledContent>
          <StyledFooter>Project Ignite &copy; 2018–2020</StyledFooter>
        </Main>
      </StyledLayout>
    </>
  );
}

export default MyApp
