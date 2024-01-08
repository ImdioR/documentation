import React, { forwardRef, useRef, useImperativeHandle } from "react";
import { Box, Button, Text } from "grommet";
import styled from "styled-components";
import { Link as GatsbyLink } from "gatsby";
import { Next } from "grommet-icons";

const Link = styled(GatsbyLink)`
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }

  font-family: Inter, sans-serif;
  font-weight: 500;
  color: ${(props) => props.theme.global.colors.black};

  line-height: 1.375;
  padding: ${(props) => (props.size === "large" ? "4px 0" : "4px 16px")};
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;

  &.activeLink {
    color: ${(props) => props.theme.global.colors.black};
    background-color: #f0f4ff;
    font-weight: 700;
  }
`;

const LinkWithSubpages = styled(GatsbyLink)`
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }

  font-family: Inter, sans-serif;
  font-weight: 500;
  color: ${(props) =>
    (!!props.color && props.theme.global.colors[props.color]) ||
    props.theme.global.colors.black};

  line-height: 1.375;
  padding: ${(props) => (props.size === "large" ? "4px 0px" : "4px 16px")};
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;

  &.activeLink {
    font-weight: 600;
  }

  &svg {
    fill: ${(props) =>
      props.hasChildren ? "red" : props.theme.global.colors.brand};
  }
`;

const InternalLink = (
  { href, label, primary, size, altFont, hasChildren, subpageChild },
  ref
) => {
  const linkRef = useRef();

  let props = { size, to: href };
  if (!primary) props.color = "dark-3";

  let textProps = {};
  if (altFont) textProps.style = { fontFamily: "Inter" };

  useImperativeHandle(ref, () => ({
    isActive: linkRef.current
      ?.getAttribute("class")
      .split(" ")
      .includes("activeLink"),
  }));

  return hasChildren ? (
    <>
      <LinkWithSubpages
        ref={linkRef}
        activeClassName="activeLink"
        partiallyActive
        hasChildren
        {...props}
      >
        <Box direction="row" justify="between" align="center">
          <Text>{label}</Text>
          <Next
            style={{
              stroke: "black",
              rotate: ref.current?.isActive ? "270deg" : "90deg",
            }}
            size="16px"
          />
        </Box>
      </LinkWithSubpages>
    </>
  ) : (
    <Link
      {...props}
      ref={linkRef}
      partiallyActive={!!hasChildren}
      activeClassName="activeLink"
    >
      <Text margin={{ left: subpageChild ? "small" : "0" }}>{label}</Text>
    </Link>
  );
};

InternalLink.defaultProps = {
  primary: false,
  altFont: false,
  size: "medium",
};

export default forwardRef(InternalLink);
