import React from 'react';
import { RichText } from 'prismic-reactjs';
import { client } from '../prismic-configuration';
import styled from 'styled-components';
import { Form, Input, Button } from 'antd';
import { Section, PageHeader, Centered, RoundedButton } from '../components/Blocks';
import * as emailjs from 'emailjs-com'

const { TextArea } = Input;

const Wrapper = styled.div`
  position: relative;
  padding: 1.5em;
  max-width: 500px;
  left: 50%;
  transform: translateX(-50%);
`;

const Contact = (props) => {
  const [form] = Form.useForm();
  const [submitted, setSubmitted] = React.useState(false);

  const onFinish = values => {
    let templateParams = {
      from_name: values.name,
      from_email: values.email,
      subject: values.subject,
      message_html: values.message,
     }
     emailjs.send(
      'gmail',
      'template_aSWgO4it',
       templateParams,
      'user_gb9oy0JFrSFXJ37FEgnQW'
     )
     setSubmitted(true);
  };
  
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return(
    <Section>
      <PageHeader>
        <h1>{RichText.asText(props.contact.data.header)}</h1>
        <p>{RichText.asText(props.contact.data.information)}</p>
      </PageHeader>
      <Wrapper>
        {submitted ? 
          <Centered><h1>Your message has been sent.</h1></Centered>
          :
            <Form
              layout="vertical"
              form={form}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item name="name" label="Name" rules={[{ required: true, type: 'string', message: 'Please enter your name!' }]}>
                <Input/>
              </Form.Item>
              <Form.Item name="email" label="Email" type="email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email address!' }]}>
                <Input/>
              </Form.Item>
              <Form.Item name="subject" label="Subject" rules={[{ required: true,  message: 'Please enter a subject!' }]}>
                <Input/>
              </Form.Item>
              <Form.Item name="message" label="Message" rules={[{ required: true,  message: 'Please enter a message!' }]}>
                <TextArea rows={6}/>
              </Form.Item>
              <Form.Item>
                <Centered>
                  <RoundedButton size="large" type="primary" htmlType="submit">Submit</RoundedButton>
                </Centered>
              </Form.Item>
            </Form>
        }
      </Wrapper>
    </Section>
  );
}

Contact.getInitialProps = async context => {
  const contact = await client.getSingle('contact');
  return { contact }
}

export default Contact;