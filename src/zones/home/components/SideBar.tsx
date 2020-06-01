import React from "react";
import styled from "styled-components";
import { colors } from "lib/theme";
import { SideBarLink } from "zones/home/components/SideBarLink";

const SideBarContainer = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-rows: 1fr 5fr;
  width: 100%;
  height: 100%;
`;

const Avatar = styled.div`
  border-radius: 50%;
  background-color: ${colors.blueGrey.lighten3};
  margin: 2rem auto;
  height: calc(300px * 0.8);
  width: calc(300px * 0.8);
`;

const SideBarLinkContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(auto-fill, 3rem);
  grid-gap: 2rem;
`;

export const SideBar = () => {
  return (
    <SideBarContainer>
      <Avatar />
      <SideBarLinkContainer>
        <SideBarLink
          activeColor={colors.blueGrey.base}
          text="About"
          urlPath="/about"
        />
        <SideBarLink
          activeColor={colors.blueGrey.base}
          text="Work"
          urlPath="/work"
        />
        <SideBarLink
          activeColor={colors.blueGrey.base}
          text="Contact"
          urlPath="/contact"
        />
      </SideBarLinkContainer>
    </SideBarContainer>
  );
};
