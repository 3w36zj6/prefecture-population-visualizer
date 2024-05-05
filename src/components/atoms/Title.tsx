import React from "react";

interface TitleProps {
  text: string;
  level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const Title: React.FC<TitleProps> = ({ text, level }) => {
  const Heading = level as keyof JSX.IntrinsicElements;

  return <Heading>{text}</Heading>;
};

export default Title;
