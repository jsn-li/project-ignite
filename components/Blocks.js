import styled from 'styled-components';
import { Button } from 'antd';

export const Section = styled.section`
  padding: 2em 0 0 0;
  width: 100%;
  height: 100%;
`;

export const PageHeader = styled.section`
  text-align: center;
  h1 {
    font-size: 3em;
  }
`;

export const Centered = styled.div`
  text-align: center;
`;

export const RoundedButton = styled(Button)`
  border-radius: 0.5em;
`