import styled from 'styled-components';
import { Button, Card } from 'antd';

export const PageHeader = styled.div`
  padding: 2em 0 0 0;
  text-align: center;
  h1 {
    font-size: 3em;
  }
`;

export const CenteredText = styled.div`
  text-align: center;
`;

export const RoundedButton = styled(Button)`
  border-radius: 0.5em;
`

export const CenteredDiv = styled.div`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
`;

export const StyledCard = styled(Card)`
  border-radius: 0.5em;
  height: 100%;
  width: 100%;
`;