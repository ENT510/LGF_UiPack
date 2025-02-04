import React, { useState } from "react";
import { Button, Alert } from "@mantine/core";
import { useNuiEvent } from "../hooks/useNuiEvent";
import { isEnvBrowser } from "../utils/misc";
import Menu from "./context/Menu";
import "./context/index.scss";
import Alertd from "./alert/Alert";
import TextUI from "./textui/TextUI";
const App: React.FC = () => {
  const [contextVisible, setContextVisible] = useState(false);
  const [menuData, setMenu] = useState([]);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertData, setAlertData] = useState([]);

  const [textUiVisible, setTextUiVisible] = useState(false);
  const [textUiData, setTextUiData] = useState([]);


  useNuiEvent<any>("showContextMenu", (data) => {
    setContextVisible(data?.Display);
    if (data.Display) {
      setMenu(data?.Menu);
    }
  });

  useNuiEvent<any>("showAlert", (data) => {
    setAlertVisible(data?.Display);
    if (data.Display) {
      setAlertData(data?.Alert);
    }
  });

  useNuiEvent<any>("showTextUi", (data) => {
    setTextUiVisible(data?.Display);
    if (data.Display) {
      setTextUiData(data?.TextUi);
    }
  });

  const alertSimulated = {

    title: "Baby",
    message: "Baby Baby Baby Baby BabyBaby Baby Baby Baby.",
    type: "info",
    confirmLabel: "OK",
    cancelLabel: "Annulla",
    icon: "info-circle",
    id: 1,
    offset: { x: 450, y: 300 }, 
  };

  const menuDataSimulato = {
    id: "simulato-menu",
    title: "Menu Simulato",
    enableCloseButton: false,
    options: [
      {
        id: "1",
        title: "Opzione 1",
        description: "Questa è la descrizione dell'opzione 1",
        icon: "home",
        disabled: false,
      },
      {
        id: "2",
        title: "Opzione 2",
        description: "Questa è la descrizione dell'opzione 2",
        icon: "info-circle",
        disabled: false,
      },
      {
        id: "3",
        title: "Opzione 3",
        description: "Questa è la descrizione dell'opzione 3",
        icon: "cog",
        disabled: true, 
      },
      {
        id: "3",
        title: "Opzione 3",
        description: "Questa è la descrizione dell'opzione 3",
        icon: "cog",
        disabled: true, 
      },
      {
        id: "3",
        title: "Opzione 3",
        description: "Questa è la descrizione dell'opzione 3",
        icon: "cog",
        disabled: true, 
      },
      {
        id: "3",
        title: "Opzione 3",
        description: "Questa è la descrizione dell'opzione 3",
        icon: "cog",
        disabled: true, 
      },


      {
        id: "3",
        title: "Opzione 3",
        description: "Questa è la descrizione dell'opzione 3",
        icon: "cog",
        disabled: true, 
      },
      {
        id: "3",
        title: "Opzione 3",
        description: "Questa è la descrizione dell'opzione 3",
        icon: "cog",
        disabled: true, 
      },
    ],
  };

  const textuiSimulato = {
    title: "Open Vehicle Shop",
    message: "Press the bind to Open the vehicle shop",
    binder: "X",
    position: "right", 
    backgroundColor: "#343a40",
  };


  return (
    <>
      <Menu Display={contextVisible} menu={menuData} />
      <Alertd Display={alertVisible} alert={alertData} />
      <TextUI Display={textUiVisible} textUi={textUiData} />

      {isEnvBrowser() && (
        <div style={{ position: "fixed", top: 10, right: 10, zIndex: 1000 }}>
          <Button
            onClick={() => setContextVisible((prev) => !prev)}
            variant="default"
            color="teal"
            style={{ marginBottom: 10, width: 150 }}
          >
            Toggle Context
          </Button>
          <Button
            onClick={() => setAlertVisible((prev) => !prev)}
            variant="default"
            color="teal"
            style={{ marginBottom: 10, width: 150 }}
          >
            Show Alert
          </Button>
          <Button
            onClick={() => setTextUiVisible((prev) => !prev)}
            variant="default"
            color="teal"
            style={{ marginBottom: 10, width: 150 }}
          >
            Show TextUI
          </Button>
        </div>
      )}
    </>
  );
};

export default App;
