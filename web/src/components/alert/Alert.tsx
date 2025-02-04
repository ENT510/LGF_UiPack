import React from "react";
import { Title, Text, Button, Container, Image, Flex } from "@mantine/core";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./alert.scss";
import { fetchNui } from "../../utils/fetchNui";

type AlertType = "error" | "info" | "warning";

const alertImages: Record<AlertType, string> = {
  error: "https://cdn-icons-png.flaticon.com/128/1304/1304037.png",
  info: "https://cdn-icons-png.flaticon.com/128/10023/10023893.png",
  warning: "https://cdn-icons-png.flaticon.com/128/4344/4344882.png",
};

interface AlertProps {
  Display: boolean;
  alert: {
    title: string;
    message: string;
    type: AlertType;
    confirmLabel: string;
    cancelLabel: string;
    icon: string;
    id: number;
    offset?: { x: number, y: number };
  };
}

const handleAlertAction = (id: number, action: string) => {
  fetchNui("LGF_UiPack.NUI.handleAlertAction", {
    action: action,
    id: id,
  });
};

const Alert: React.FC<AlertProps> = ({ Display, alert }) => {
  const alertImage = alertImages[alert.type] || alertImages.info;


  const { x = (window.innerWidth - 400) / 2, y = (window.innerHeight - 200) / 2 } = alert.offset || {};

  return (
    <>
      <div
        className={`Alert ${Display ? "slide-in-alert" : "slide-out-alert"}`}
        style={{
          position: "fixed",  
          top: `${y}px`, 
          left: `${x}px`, 
          zIndex: 9999,       
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Container p={5}>
            <Flex
              gap="xs"
              justify="flex-start"
              align="center"
              direction="row"
              wrap="wrap"
            >
              <FontAwesomeIcon icon={alert.icon} size="2x" />
              <Title tt="uppercase" style={{ letterSpacing: "1px" }} order={2}>
                {alert.title}
              </Title>
            </Flex>

            <Image
              maw={38}
              mx="auto"
              radius="md"
              src={alertImage}
              fit="contain"
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
              }}
              alt={`${alert.type} icon`}
            />
            <Text size="sm" color="dimmed" style={{ marginTop: "10px" }}>
              {alert.message}
            </Text>

            <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
              <Button
                onClick={() => handleAlertAction(alert.id, "confirm")}
                variant="light"
                color="green"
                fullWidth
                size="sm"
                style={{
                  border: "3px solid rgba(90, 90, 90, 0.6)",
                }}
              >
                {alert.confirmLabel}
              </Button>
              <Button
                onClick={() => handleAlertAction(alert.id, "cancel")}
                variant="light"
                color="red"
                fullWidth
                size="sm"
                style={{
                  border: "3px solid rgba(90, 90, 90, 0.6)",
                }}
              >
                {alert.cancelLabel}
              </Button>
            </div>
          </Container>
        </motion.div>
      </div>

      {Display && (
        <div className="alert-overlay"></div>
      )}
    </>
  );
};

export default Alert;
