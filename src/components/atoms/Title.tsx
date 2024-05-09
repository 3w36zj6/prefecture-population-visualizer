import React from "react";
import styled from "styled-components";

interface TitleProps {
  text: string;
  level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

interface StyledHeadingProps {
  level: TitleProps["level"];
}

const fontSizeMap = {
  h1: "1.5em",
  h2: "1.4em",
  h3: "1.3em",
  h4: "1.2em",
  h5: "1.1em",
  h6: "1em",
};

const StyledHeading = styled.span<StyledHeadingProps>`
  font-size: ${({ level }) => fontSizeMap[level]};
  font-weight: bold;
`;

const Title: React.FC<TitleProps> = ({ text, level }) => {
  const Heading = level as keyof JSX.IntrinsicElements;

  return (
    <Heading>
      <StyledHeading level={level}>{text}</StyledHeading>
    </Heading>
  );
};

export default Title;
