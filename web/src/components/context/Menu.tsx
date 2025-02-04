import React, { useState, useEffect, useRef } from "react"; 
import { Title, ScrollArea, Text, Tooltip, Image, Flex, createStyles } from "@mantine/core"; 
import { motion } from "framer-motion"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { library } from "@fortawesome/fontawesome-svg-core"; 
import * as Icons from "@fortawesome/free-solid-svg-icons"; 
import { fetchNui } from "../../utils/fetchNui";

library.add(...Object.values(Icons).filter((icon) => (icon as { prefix?: string }).prefix !== undefined));

interface Option { 
  title: string; 
  description?: string; 
  icon: string; 
  menu?: string; 
  metadata?: Record<string, any>; 
  disabled: boolean; 
  id: string; 
}

interface MenuProps { 
  Display: boolean; 
  menu: { 
    id: string; 
    title: string; 
    enableCloseButton: boolean; 
    options: Option[]; 
  }; 
}

const useStyles = createStyles((theme) => ({ 
  container: { 
    position: "relative", 
    backgroundColor: "rgba(26, 30, 35, 0.704)", 
    border: "2px solid rgba(168, 177, 174, 0.3)" 
  }, 
  menuTitle: { 
    fontWeight: 700, 
    textTransform: "uppercase", 
    color: theme.colors.dark[0], 
    letterSpacing: "1px", 
    padding: "10px 20px", 
    backgroundColor: "rgba(26, 30, 35, 0.904)", 
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)", 
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center" 
  }, 
  backButton: { 
    position: "absolute", 
    top: 9, 
    height: 20, 
    right: 60, 
    padding: "6px 10px", 
    backgroundColor: "rgba(54, 156, 129, 0.202)", 
    borderRadius: "3px", 
    cursor: "pointer", 
    color: "#e0e0e0", 
    fontWeight: 500, 
    fontSize: 14, 
    transition: "background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease", 
    zIndex: 1000 
  }, 
  closeButton: { 
    position: "absolute", 
    top: 9, 
    right: 14, 
    height: 20, 
    padding: "6px 10px", 
    backgroundColor: "rgba(255, 34, 0, 0.202)", 
    borderRadius: "3px", 
    cursor: "pointer", 
    color: "#e0e0e0", 
    fontWeight: 500, 
    fontSize: 16, 
    transition: "background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease", 
    zIndex: 1000 
  } 
}));

const Interaction: React.FC<MenuProps> = ({ Display, menu }) => { 
  const { classes } = useStyles(); 
  const [currentMenu, setCurrentMenu] = useState<MenuProps | null>(null); 
  const viewport = useRef<HTMLDivElement>(null);

  useEffect(() => { 
    if (Display) setCurrentMenu({ Display, menu }); 
  }, [Display, menu]);

  const handleItemClick = async (option: Option) => { 
    if (option.disabled) return; 
    const payload = { id: option.id }; 
    try { 
      await fetchNui("LGF_Context.NUI.handleMenuSelection", payload); 
    } catch (error) { 
      console.error("Error handling item :", error); 
    } 
  };

  const handleBackClick = () => fetchNui("LGF_Context.NUI.backPreviousMenu", {});
  
  const handleCloseClick = () => { 
    fetchNui("LGF_Context.NUI.hideContextMenu", {}); 
    setTimeout(() => { 
      setCurrentMenu(null); 
    }, 500); 
  };

  return ( 
    <div className={`MenuContext ${Display ? "slide-in" : "slide-out"}`}> 
      <div className={classes.container}> 
        <Tooltip style={{ backgroundColor: "rgba(30, 30, 35, 0.8)", color: "white" }} radius="sm" label="Go back" position="top" offset={10} withArrow disabled={!Display}>
          <motion.div className={classes.backButton} onClick={handleBackClick} whileTap={{ scale: 0.55 }} transition={{ duration: 0.2 }}> 
            <FontAwesomeIcon style={{ fontSize: 20, color: "#ffffff" }} icon="chevron-left" /> 
          </motion.div> 
        </Tooltip>

        <Tooltip radius="sm" style={{ backgroundColor: "rgba(30, 30, 35, 0.8)", color: "white" }} label="Close menu" offset={10} position="top" withArrow>
          <motion.div className={classes.closeButton} onClick={handleCloseClick} whileTap={{ scale: 0.55 }} style={{ pointerEvents: menu.enableCloseButton ? "auto" : "none", opacity: menu.enableCloseButton ? 1 : 0.5 }} transition={{ duration: 0.2 }}>
            <FontAwesomeIcon style={{ fontSize: 20, color: "#ffffff" }} icon="times" />
          </motion.div> 
        </Tooltip>

        <div className={classes.menuTitle}>
          <Title style={{ fontSize: "24px" }} tt="uppercase">{menu.title}</Title>
        </div>
      </div>

      {currentMenu ? (
        <ScrollArea h={600} scrollbarSize={0} ref={viewport}>
          <div className="menuItem-list">
            {menu.options.map((option, index) => (
              <div key={index}>
                <Tooltip openDelay={450} disabled={!option.metadata} offset={10} radius="sm" transitionProps={{ transition: "fade", duration: 100 }} label={option.metadata && option.metadata.image ? (
                  <Image src={option.metadata.image} alt="Metadata Image" fit="contain" radius="md" width={150} />
                ) : (option.metadata && (
                  <div>
                    {Object.entries(option.metadata || {}).map(([key, value], idx) => (
                      <div key={key} style={{ marginBottom: idx < Object.entries(option.metadata).length - 1 ? "10px" : "0" }}>
                        <Flex direction="row" justify="space-between" align="center" style={{ paddingRight: "10px" }}>
                          <Text size="sm" weight={500} color="dimmed" tt="uppercase" style={{ flex: 1, color: "white", marginRight: "8px" }}>
                            {key}:
                          </Text>
                          <Text color="dimmed" size="sm" style={{ flex: 2 }}>
                            {typeof value === "object" ? (
                              <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", fontSize: "12px", backgroundColor: "#333", padding: "5px", borderRadius: "4px" }}>
                                {JSON.stringify(value, null, 2)}
                              </pre>
                            ) : (value)}
                          </Text>
                        </Flex>
                      </div>
                    ))}
                  </div>
                ))}
                position="right" withinPortal multiline style={{ backgroundColor: option?.metadata?.image ? "transparent" : "rgba(30, 30, 35, 0.8)", borderRadius: "8px" }}>
                  <motion.div className={`menu-item ${option.disabled ? "disabled" : ""}`} onClick={!option.disabled ? () => handleItemClick(option) : undefined} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} whileTap={option.disabled ? {} : { scale: 0.95 }} transition={{ duration: 0.1 }}>
                    <div className="contentContext">
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <FontAwesomeIcon icon={option.icon} style={{ marginRight: "10px" }} />
                        <Title tt="uppercase" order={5}>{option.title}</Title>
                      </div>
                      {option.description && <Text size="sm">{option.description}</Text>}
                    </div>
                  </motion.div>
                </Tooltip>
              </div>
            ))}
          </div>
        </ScrollArea>
      ) : (
        <div className="MenuContext-item">
          <div className="content">
            <Title order={4}>No Menu Items</Title>
          </div>
        </div>
      )}
    </div>
  );
};

export default Interaction;
