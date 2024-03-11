import React, { ReactNode } from "react";
import styled from "styled-components";

const Container = ({ children }: { children: ReactNode }) => {
  return <StyleContainer>{children}</StyleContainer>;
};

export default Container;

const StyleContainer = styled.div`
  padding: 25px;
  width: 100%;
  height: 100%;
`;
