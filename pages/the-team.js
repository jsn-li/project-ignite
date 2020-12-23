import React from "react";
import Prismic from "prismic-javascript";
import { RichText } from "prismic-reactjs";
import { client, hrefResolver, linkResolver } from "../prismic-configuration";
import { Col, Row, Menu, Space, Card, Divider } from "antd";
import styled from "styled-components";
import { StyledCard, PageHeader, CenteredText } from "../components/Blocks";
import { SecurityScanTwoTone } from "@ant-design/icons";

const TeamCard = styled(StyledCard)`
  img {
    width: 256px;
    height: 256px;
    object-fit: cover;
    position: relative;
    float: none;
    display: block;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 1.5em;
    border-radius: 0.5em;
  }

  h1 {
    margin: 0;
  }

  p {
    margin-bottom: 0;
  }

  @media (min-width: 576px) {
    img {
      position: inline;
      left: 0;
      transform: none;
      float: left;
      margin-bottom: 0;
      margin-right: 1.5em;
    }
  }
`;

const MediaQuery = styled.div`
  .mobile {
    overflow: scroll;
    display: block;

    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none;
  }
  .mobile::-webkit-scrollbar {
    display: none;
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

const Team = (props) => {
  const [selected, setSelected] = React.useState(props.teamPage.data.chapter_group[0].chapter.uid);

  const handleClick = (e) => {
    setSelected(e.key);
  };

  const TeamCardBuilder = ({ person }) => (
    <TeamCard>
      <img src={person.portrait.url} alt={person.name} />
      <h1>{RichText.asText(person.name)}</h1>
      <h4>{RichText.asText(person.position)}</h4>
      <p>{RichText.asText(person.description)}</p>
    </TeamCard>
  );

  return (
    <>
      <Head>
        <title>The Team &#124; Project Ignite</title>
      </Head>
      <PageHeader>
        <h1>{RichText.asText(props.teamPage.data.header)}</h1>
      </PageHeader>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <MediaQuery>
            <StyledCard title={<CenteredText>Branch</CenteredText>}>
              <Menu
                className="desktop"
                mode="vertical"
                onClick={handleClick}
                defaultSelectedKeys={[selected]}
              >
                {props.teamPage.data.chapter_group.map((group) => (
                  <Menu.Item key={group.chapter.uid}>
                    {RichText.asText(props.chapterMap[group.chapter.uid].data.header)}
                  </Menu.Item>
                ))}
              </Menu>
              <div className="mobile">
                <Menu mode="horizontal" onClick={handleClick} defaultSelectedKeys={[selected]}>
                  {props.teamPage.data.chapter_group.map((group) => (
                    <Menu.Item key={group.chapter.uid}>
                      {RichText.asText(props.chapterMap[group.chapter.uid].data.header)}
                    </Menu.Item>
                  ))}
                </Menu>
              </div>
            </StyledCard>
          </MediaQuery>
        </Col>
        <Col xs={24} md={16}>
          <CenteredText>
            <h2>{RichText.asText(props.chapterMap[selected].data.header)}</h2>
          </CenteredText>
          <Space direction="vertical">
            {props.chapterMap[selected].data.person.map((person) => (
              <TeamCardBuilder person={person} key={RichText.asText(person.name)} />
            ))}
          </Space>
          <>
            {props.chapterMap[selected].data.body.length > 0 ? (
              <>
                {props.chapterMap[selected].data.body.map((slice) => (
                  <React.Fragment key={RichText.asText(slice.primary["chapter_section"])}>
                    <Divider>{RichText.asText(slice.primary["chapter_section"])}</Divider>
                    <Space direction="vertical">
                      {slice.items.map((person) => (
                        <TeamCardBuilder person={person} key={RichText.asText(person.name)} />
                      ))}
                    </Space>
                  </React.Fragment>
                ))}
              </>
            ) : (
              <></>
            )}
          </>
        </Col>
      </Row>
    </>
  );
};

Team.getInitialProps = async (context) => {
  const teamPage = await client.getSingle("the_team");
  const chapters = await client.query(Prismic.Predicates.at("document.type", "chapter_page"));
  const chapterMap = chapters.results.reduce(function (map, chapter) {
    map[chapter.uid] = chapter;
    return map;
  }, {});
  return { chapterMap, teamPage };
};

export default Team;

