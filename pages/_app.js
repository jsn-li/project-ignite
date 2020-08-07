import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Layout, Drawer, Button, Space } from 'antd';
import { CloseOutlined, MenuOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Context as ResponsiveContext } from 'react-responsive'
import '../styles/my-theme.less';
import CustomMenu from '../components/CustomMenu';
import { CenteredText, ContentWrapper } from '../components/Blocks'
const { Header, Content, Footer } = Layout;

const Flexbox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const StyledHeader = styled(Header)`
  background: ${props => props.theme === "light" ? "#FFFFFF" : "#001529"};

  .header-content {
    padding: 0 1em 0 1em;
    max-width: 1000px;
    width: 95%;
    min-width: 300px;
  }
`;

const StyledContent = styled(Content)`
  padding: 0 1em 0 1em;
  max-width: 1000px;
  width: 95%;
  min-width: 300px;
`;

const StyledSpace = styled(Space)`
  float: right;
`;

const Logo = styled.a`
  float: left;
  display: inline;
  font-size: 1.5em;
  color: inherit;
  cursor: default;
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
      display: block;
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
      <Layout>
        <Drawer
          title={<Button onClick={() => toggleDrawer()}><CloseOutlined /></Button>}
          placement="right"
          closable={false}
          onClose={onClose}
          visible={visible}>
          <CustomMenu routes={ROUTES} theme="light" mode="vertical" onClick={toggleDrawer} defaultSelectedKeys={[router.pathname]}/>
        </Drawer>
        <StyledHeader theme="light">
          <Flexbox>
            <div className="header-content">
              <Logo>Project Ignite</Logo>
              <StyledSpace direction="horizontal">
                <MediaQuery>
                  <Button className="mobile" onClick={() => toggleDrawer()}><MenuOutlined /></Button>
                  <CustomMenu className="desktop" routes={ROUTES} theme="light" mode="horizontal" defaultSelectedKeys={[router.pathname]}/>
                </MediaQuery>
              </StyledSpace>
            </div>
          </Flexbox>
        </StyledHeader>
        <Flexbox>
          <StyledContent>
              <Component {...pageProps} />
          </StyledContent>
        </Flexbox>
        <Footer>
          <CenteredText>Project Ignite &copy; 2018–2020</CenteredText>
        </Footer>
      </Layout>
    </>
  );
}

export default MyApp
