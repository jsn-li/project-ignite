import React from 'react';
import Head from 'next/head';
import { RichText } from 'prismic-reactjs';
import styled from 'styled-components';
import { client, hrefResolver, linkResolver } from '../prismic-configuration';
import { Card, Button, Space, Divider, Row, Col } from 'antd';

import { Section, Centered } from '../components/Blocks';

const Landing = styled(Section)`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 95vh;

  h1 {
    font-size: 3.5em;
    margin-bottom: 0px;
  }

  p {
    font-size: 1.25em;
  }

  div {
    white-space: nowrap;
    padding: 50px;
    /* TODO: change based upon the logo padding */
  }

  img {
    max-height: 50%;
    max-width: 90%;
  }

  @media (min-width: 992px) {
    flex-direction: row;
    text-align: left;
    height: 80vh;
  }
`;

const StyledCard = styled(Card)`
  border-radius: 0.5em;

   
`;

const Homepage = (props) => {

  return(
    <div>
      <Head>
        <title>Home &#124; Project Ignite</title>
      </Head>
      <Landing>
        <div>
          <h1>{RichText.asText(props.home.data.title)}</h1>
          <p>{RichText.asText(props.home.data.subtitle)}</p>
          <Button type="primary" size="large" href="#register">{RichText.asText(props.home.data.action_button_text)}</Button>
        </div>
        <img src={props.home.data.banner.url} alt={props.home.data.banner.alt} />
      </Landing>

      {/* info groups */}
      <Section>
        <Row gutter={[16]}>
          {props.home.data.info_group.map((group) => (
            <Col key={RichText.asText(group.header)} xs={24} md={12}>
              <StyledCard title={RichText.asText(group.header)} bordered={false}>
                <Centered>
                  <img src={group.image.url} alt={group.image.alt} />
                </Centered>
                <p>{RichText.asText(group.body)}</p>
              </StyledCard>
            </Col>
          ))}
        </Row>
      </Section>

      {/* action groups */}
      <Section>
        <Space direction="vertical" id="register">
          {props.home.data.action_group.map((group) => (
            <StyledCard key={RichText.asText(group.header)} title={RichText.asText(group.header)}>
              <p>{RichText.asText(group.body)}</p>
              <Centered>
                <Button type="primary" href={group.button_link.url} target="_blank">{RichText.asText(group.button_text)}</Button>
              </Centered>
            </StyledCard>
          ))}
        </Space>
      </Section>
    </div>
  );
}

Homepage.getInitialProps = async context => {
  const home = await client.getSingle('homepage');
  return { home }
}

export default Homepage;
