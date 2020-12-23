import React from "react";
import { RichText } from "prismic-reactjs";
import { client } from "../prismic-configuration";
import { Col } from "antd";
import { PageHeader, CenteredText, RoundedButton } from "../components/Blocks";

const Volunteer = (props) => {
  console.log(props.volunteer.data.button_url);
  return (
    <>
      <PageHeader>
        <h1>{RichText.asText(props.volunteer.data.header)}</h1>
        <p>{RichText.asText(props.volunteer.data.information)}</p>
      </PageHeader>
      <Col>
        <CenteredText>
          <RoundedButton
            size="large"
            type="primary"
            href={props.volunteer.data.button_url.url}
            target="_blank"
          >
            {RichText.asText(props.volunteer.data.button_text)}
          </RoundedButton>
        </CenteredText>
      </Col>
    </>
  );
};

Volunteer.getInitialProps = async (context) => {
  const volunteer = await client.getSingle("volunteer");
  return { volunteer };
};

export default Volunteer;
