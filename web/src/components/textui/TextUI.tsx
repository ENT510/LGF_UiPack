import React from "react";
import { Title, Text, Container, Flex, Avatar } from "@mantine/core";
import "./textUI.scss";

interface TextUiProps {
  Display: boolean;
  textUi: {
    title: string;
    message: string;
    binder: string;
    position: "left" | "right";
    backgroundColor: string;
  };
}

const TextUI: React.FC<TextUiProps> = ({ Display, textUi }) => {
  const positionStyles = {
    right: textUi.position === "right" ? "2%" : "-500px",
    left: textUi.position === "left" ? "2%" : "-500px",
    opacity: Display ? 1 : 0,
    pointerEvents: Display ? "auto" : "none",
  };

  return (
    <div
      className={`TextUI ${Display ? "slide-in-TextUI" : "slide-out-TextUI"}`}
      style={{
        position: "fixed",
        top: "50%",
        left: textUi.position === "left" ? positionStyles.left : "auto",
        right: textUi.position === "right" ? positionStyles.right : "auto",
        opacity: positionStyles.opacity,
        zIndex: 9999,
        transition: `all 0.5s ease`,
        backgroundColor: textUi.backgroundColor || "#212529",
        transform: "translateY(-50%)",
        borderRadius:"6px",
      }}
    >
      <Container className="text-ui-container">
        <Flex direction="column" align="center" justify="center">
          <Flex align="center" justify="center" gap="sm">
            <Avatar
            radius="xs"
            size={40}
              style={{
                backgroundColor: "rgba(54, 156, 129, 0.3)",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)"
              }}
            >
              <Text size={24} weight={500} color="white">
                {textUi.binder}
              </Text>
            </Avatar>

            <Flex justify="flex-start" align="flex-start" direction="column">
              <Title order={4} tt="uppercase">
                {textUi.title}
              </Title>
              <Text size="sm" color="gray.5">
                {textUi.message}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </div>
  );
};

export default TextUI;
