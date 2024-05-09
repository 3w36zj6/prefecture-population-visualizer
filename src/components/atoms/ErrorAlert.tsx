import { ReactNode } from "react";
import styled from "styled-components";

const ErrorMessage = styled.div`
  margin: 1em;
  padding: 0.8em;
  color: #ff3366;
  background: #ffe6ec;
  border-top: solid 0.5em #f93953;
  border-radius: 5px;
  & > * {
    margin: 0.3em;
  }
`;

const ErrorTitle = styled.h2`
  margin: 0em 0em 0.5em;
  font-size: 1.5em;
  font-weight: bold;
`;

export interface ErrorAlertProps {
  title: string;
  children: ReactNode;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ title, children }) => {
  return (
    <ErrorMessage>
      <ErrorTitle>{title}</ErrorTitle>
      {children}
    </ErrorMessage>
  );
};
