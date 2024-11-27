




const DEFAULT_HANDLE_STYLE = {
  width: 10,
  height: 10,
  bottom: -5,
};
const EdgeNode = ({ data }) => (
  <div style={{ backgroundColor: 'red', color: 'white', padding: '10px', width: '20px', height: '20px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>


    <Handle type="target" id="left" position={Position.Left} style={{ background: 'blue', top: '50%' }} isConnectable={true} />
    <Handle type="source" id="right" position={Position.Right} style={{ background: 'blue', top: '50%' }} isConnectable={true} />
    <Handle
      type="source"
      id="orange"
      position={Position.Bottom}
      style={{ ...DEFAULT_HANDLE_STYLE, left: '50%', background: 'blue' }}
      isConnectable={true}
    />
  </div>
);

const Architecture = (props) => {
  const [open, setOpen] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  const [isDroppable, setIsDroppable] = useState(false);
  const [contextMenu, setContextMenu] = useState(false);
  const [diagrams, setDiagrams] = useState([]);
  const [activeDiagramId, setActiveDiagramId] = useState(1);

  const [selectedImageColor, setSelectedImageColor] = useState("");
  const [selectedImageTitle, setSelectedImageTitle] = useState("");
  const [colorModalOpen, setColorModalOpen] = useState(false);
  const [activeCatalogId, setActiveCatalogId] = useState(null);
  const [minimized, setMinimized] = useState(false);

  const [catalogs, setCatalogs] = useState([]);
  const [activeTool, setActiveTool] = useState('Diagram');
  const [architecture, setArchitecture] = useState("");
  const [addArtifactEnabled, setAddArtifactEnabled] = useState(false);
  const [savedTabs, setSavedTabs] = useState({});
  const [textMode, setTextMode] = useState(false);
  const [texts, setTexts] = useState([]);
  const [savedArtifacts, setSavedArtifacts] = useState({});

  const [matrices, setMatrices] = useState([]);
  const [navigations, setNavigations] = useState([]);
  const [viewpoints, setViewpoints] = useState([]);
  const [isBackgroundVisible, setIsBackgroundVisible] = useState(true);
  const [roadmaps, setRoadmaps] = useState([]);
  const [activeMatrixId, setActiveMatrixId] = useState(null);
  const [activeNavigationId, setActiveNavigationId] = useState(null);
  const [activeViewpointId, setActiveViewpointId] = useState(null);
  const [artifacts, setArtifacts] = useState([]);
  const [activeRoadmapId, setActiveRoadmapId] = useState(null);
  const [activeTab, setActiveTab] = useState("");
  const objectsrc = props.theme === "dark" ? objectdark : objectdefault;
  const processsrc = props.theme === "dark" ? processdark : processdefault;
  const artifactsrc = props.theme === "dark" ? blueprintdark : blueprintdefault;
  const [value, setValue] = useState(0);
  const [tabs, setTabs] = React.useState([
    ...diagrams.map((diagram) => ({ type: 'diagram', id: diagram.id })),
    ...catalogs.map((catalog) => ({ type: 'catalog', id: catalog.id })),
    ...matrices.map((matrix) => ({ type: 'matrix', id: matrix.id })),
    ...navigations.map((navigation) => ({ type: 'navigation', id: navigation.id })),
    ...viewpoints.map((viewpoint) => ({ type: 'viewpoint', id: viewpoint.id })),
    ...roadmaps.map((roadmap) => ({ type: 'roadmap', id: roadmap.id })),
  ]);
  const view = 0;
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [titleCountMap, setTitleCountMap] = useState({});



  const [editingId, setEditingId] = useState(null);
 

  const [contextMenuOptions, setContextMenuOptions] = useState(null);
  const [isContainerMode, setIsContainerMode] = useState(false);
  const [containers, setContainers] = useState([]);
  const DEFAULT_HANDLE_STYLE = {
    width: 10,
    height: 10,
    bottom: -5,
  };

  // State to store the options
  const handleCanvasClick = (event) => {
    const canvasRect = event.target.getBoundingClientRect();


    const activeDiagram = diagrams.find((diag) => diag.id === activeDiagramId);
    console.log("activedigram", activeDiagram);
    const activeDiagramIndex = diagrams.findIndex((diag) => diag.id === activeDiagramId);


    if (event.button === 0) {
      if (isContainerMode) {
        // Container mode code remains unchanged
        const x = event.clientX - canvasRect.left;
        const y = event.clientY - canvasRect.top;
        const newContainer = { x, y, width: 200, height: 150, id: Date.now() };

        setDiagrams((prevDiagrams) =>
          prevDiagrams.map((diagram) =>
            diagram.id === activeDiagramId
              ? { ...diagram, containers: [...(diagram.containers || []), newContainer] }
              : diagram
          )
        );
        setIsContainerMode(false);
      } else if (textMode) {
        // Text mode code remains unchanged
        const x = event.clientX - canvasRect.left;
        const y = event.clientY - canvasRect.top;
        const newText = { id: Date.now(), x, y, text: '' };

        setTexts((prev) => [...prev, newText]);
        setDiagrams((prevDiagrams) =>
          prevDiagrams.map((diagram) =>
            diagram.id === activeDiagramId
              ? { ...diagram, texts: [...diagram.texts, newText] }
              : diagram
          )
        );

        setEditingId(newText.id);
        setTextMode(false);
      } else if (selectedImage && isDroppable && activeDiagram) {
        // Add a new node with handles embedded directly
        const x = event.clientX - canvasRect.left;
        const y = event.clientY - canvasRect.top;

        const baseTitle = selectedImageTitle;
        const currentCount = titleCountMap[baseTitle] || 0;

        console.log("currentCount==>", currentCount)
        const newCount = currentCount + 1;
        const formattedCount = String(newCount).padStart(3, '0');
        const newTitle = `${baseTitle} ${formattedCount}`;

        setTitleCountMap((prev) => ({ ...prev, [baseTitle]: newCount }));

        const newNode = {
          id: `${diagrams[activeDiagramIndex].nodes.length + 1}`,
          type: "default", // Use default node type
          position: { x, y },
          data: {
            label: (
              <>
                <NodeResizer minWidth={100} minHeight={40} />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span
                    style={{
                      fontSize: '12px',
                      color: 'black',
                      textAlign: 'center',
                      width: '100px',
                    }}
                  >
                    {newTitle}
                  </span>
                  <img
                    src={selectedImage}
                    alt="Dropped"
                    style={{
                      width: '29px',
                      height: '24px',
                      position: 'absolute',
                      top: 2,
                      right: 0,
                    }}
                  />
                  <div>

                  </div>

                </div>
               


              </>
            ),
          },
          style: {
            backgroundColor: isBackgroundVisible ? selectedImageColor : 'transparent',
            padding: '10px',
            width: '150px',
            borderRadius: '5px',
          },
        };

        const updatedDiagrams = diagrams.map((diagram) => {
          if (diagram.id === activeDiagramId) {
            return { ...diagram, nodes: [...diagram.nodes, newNode] };
          }
          return diagram;
        });

        setDiagrams(updatedDiagrams);
      }
    }
    setContextMenu(null);
  };


  const handleCanvasRightClick = (event, isText = false) => {
    event.preventDefault();




    setSelectedImage(null);


    setTextMode(false);

    console.log("Right-clicked on canvas, closing node context menu if open");
  };

  const handleRightClick = (event, nodeId) => {
    console.log("event in handle right click", event);

    event.preventDefault();


    setSelectedNodeId(nodeId);

    setContextMenu({ x: event.clientX, y: event.clientY });

    setSelectedImage(null);

    setContextMenuOptions("node");
  };

  // This handles selecting a new image from the icon box ----> and also extract if the clicked image has a title textt
  const handleSelectImage = (imageSrc, backgroundColor, title) => {
    setContextMenu(false);

    if (title === 'Text') {
      setTextMode(true);

    } else if (title === 'Container') {
      // Toggle showContainer to display the container

      setIsContainerMode(true);
    } else {
      setSelectedImage(imageSrc);
      setSelectedImageColor(backgroundColor);
      setSelectedImageTitle(title);
      setTextMode(false);

    }
  };

  const activeDiagram = diagrams.find(
    (diagram) => diagram.id === activeDiagramId
  );


  const handleMainChange = (event, newValue) => {
    setValue(newValue);
  };






  





  
  const canvasStyle = {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 10,
    pointerEvents: 'none',
  };
  const [helperLines, setHelperLines] = useState({ horizontal: null, vertical: null });

  const storeSelector = (state) => ({
    width: state.width,
    height: state.height,
    transform: state.transform, 
  });

  console.log("storeSelector============>",storeSelector.width);
  console.log("heightttttttttttttttttttt",storeSelector.height);


  function HelperLinesRenderer({ horizontal, vertical }) {

    console.log("horizontal position in helperlines renderer",horizontal);
    console.log("vertical position in helperlines renderer ",vertical);

    const { width, height, transform } = useStore(storeSelector);
   
    const canvasRef = useRef(null);
    console.log(
      "canvasRef in helperlines renderer ",
      transform
    )

    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');

      if (!ctx || !canvas) return;

      const dpi = window.devicePixelRatio;
      canvas.width = width * dpi;
      canvas.height = height * dpi;
      ctx.scale(dpi, dpi);

      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = 'red';

      if (typeof vertical === 'number') {
        const xPosition = vertical * transform[2] + transform[0];
        ctx.beginPath();
        ctx.moveTo(xPosition, 0);
        ctx.lineTo(xPosition, height);
        ctx.stroke();
      }

      if (typeof horizontal === 'number') {
        const yPosition = horizontal * transform[2] + transform[1];
        ctx.beginPath();
        ctx.moveTo(0, yPosition);
        ctx.lineTo(width, yPosition);
        ctx.stroke();
      }
    }, [width, height, transform, horizontal, vertical]);

    return (
      <canvas ref={canvasRef} className="react-flow__canvas" style={canvasStyle} />
    );
  }






  // Update function to use the helper for mid-node positioning

  // Refactor onConnect to use the helper function as well
  const onConnect = useCallback(
    (params) => {
      const updatedDiagrams = diagrams.map((diagram) => {
        if (diagram.id === activeDiagramId) {
          const sourceNode = diagram.nodes.find((node) => node.id === params.source);
          const targetNode = diagram.nodes.find((node) => node.id === params.target);

          // Adding an edge node for all node types (default or non-default)
          const edgeNode = {
            id: `edge-${params.source}-${params.target}`,
            type: "edgeNode",
            position: {
              x: (sourceNode.position.x + targetNode.position.x) / 2,
              y: (sourceNode.position.y + targetNode.position.y) / 2,
            },
          };

          const newNodes = [...diagram.nodes, edgeNode];

          const newEdges = [
            {
              id: `${params.source}-${edgeNode.id}`,
              source: params.source,
              target: edgeNode.id,
              type: 'smoothstep',
              targetHandle: "left", // Custom handle for edgeNode
            },
            {
              id: `${edgeNode.id}-${params.target}`,
              source: edgeNode.id,

              target: params.target,
              type: 'smoothstep',
              sourceHandle: "right", // Custom handle for edgeNode
            },
          ];

          return {
            ...diagram,
            nodes: newNodes,
            edges: [...diagram.edges, ...newEdges],
          };
        }

        return diagram;
      });

      setDiagrams(updatedDiagrams);
    },
    [diagrams, activeDiagramId]
  );




  const onNodesChange = useCallback((changes) => {
    setDiagrams((prevDiagrams) =>
      prevDiagrams.map((diagram) => {
        if (diagram.id === activeDiagramId) {
          // Regular node changes
          const updatedNodes = applyNodeChanges(changes, diagram.nodes);

          // Find position changes
          const positionChanges = changes.filter(
            (change) => change.type === 'position' && change.dragging
          );

          if (positionChanges.length > 0) {
            const helperLineData = getHelperLines(positionChanges[0], updatedNodes);

            // Update helper lines state
            setHelperLines({
              horizontal: helperLineData.horizontal,
              vertical: helperLineData.vertical,
            });

            return {
              ...diagram,
              nodes: updatedNodes.map((node) => {
                // If this is not an edge node, return the same
                if (node.type !== 'edgeNode') {
                  return node;
                }

                // Find connected edges
                const connectedEdges = diagram.edges.filter(
                  (edge) => edge.source === node.id || edge.target === node.id
                );

                // If this edge node is connected to any of the dragged nodes
                const sourceNode = updatedNodes.find(
                  (n) => n.id === connectedEdges[0]?.source
                );
                const targetNode = updatedNodes.find(
                  (n) => n.id === connectedEdges[1]?.target
                );

                // Update if we found both connected nodes
                if (sourceNode && targetNode) {
                  return {
                    ...node,
                    position: {
                      x: (sourceNode.position.x + targetNode.position.x) / 2,
                      y: (sourceNode.position.y + targetNode.position.y) / 2,
                    },
                  };
                }

                return node;
              }),
            };
          }

          // Reset helper lines when no position change
          setHelperLines({ horizontal: null, vertical: null });

          return { ...diagram, nodes: updatedNodes };
        }
        return diagram;
      })
    );
  }, [activeDiagramId]);

  const onEdgesChange = useCallback(
    (changes) => {
      setDiagrams(prevDiagrams => prevDiagrams.map(diagram => {
        if (diagram.id === activeDiagramId) {
          return { ...diagram, edges: applyEdgeChanges(changes, diagram.edges || []) };
        }
        return diagram;
      }));
    },
    [activeDiagramId]
  );






  return (
    <div>
      <LeftPane open={open} onClose={() => setOpen(false)} props={props}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <UserTabs
            value={value}
            handleChange={handleMainChange}
            tabs={leftpanetabs}
            language={props.language}
            theme={props.theme}
            onClick={() => props.settree("tree1")}
          />
        </div>
        <div>
          <DropDownInputField props={props} />
        </div>
        <div>
          {view === 0 && (
            <EnterpriseContent value={value} language={props.language} />
          )}
        </div>
      </LeftPane>

      <RightPane
        open={open}
        props={props}
        handleDrawerOpen={() => setOpen(true)}
      >
        <div style={{ display: "flex", width: "100%" }}>
          {/* <div style={{
            width: "25%",
            display: "flex",
            alignItems: "center",
            marginLeft: open ? "25px" : "50px",
          }}>
            Architecture Diagrams
          </div> */}
          <div style={{
            width: "25%",
            display: "flex",
            alignItems: "center",
            marginLeft: open ? "25px" : "50px",
          }}>
            <FormControl
              variant="outlined"
              size="small"
              sx={{
                minWidth: 220,
              }}

            >
              <Select
                value={architecture}
                onChange={handleArchitectureChange}
                displayEmpty
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"

                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value="">
                  <em>Select Architecture</em> {/* Placeholder option */}
                </MenuItem>
                <MenuItem value="Eaxee">Eaxee</MenuItem>
                <MenuItem value="Noneaxee">Noneaxee</MenuItem>
                <MenuItem value="archimate">archimate</MenuItem>
              </Select>
            </FormControl>
          </div>


          <div style={{
            width: "75%",
            display: "flex",
            justifyContent: "flex-end",

            // border:"2px solid red"
          }}>
            {/* Button with Menu */}

            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={() => { handleAddDiagram(); handleMenuClose(); }}>Diagram</MenuItem>
              <MenuItem onClick={handleAddCatalog}>Catalog</MenuItem>
              <MenuItem onClick={handleAddMatrix}>Matrix</MenuItem>
              <MenuItem onClick={handleAddNavigation}>Navigation</MenuItem>
              <MenuItem onClick={handleAddViewpoint}>Viewpoint</MenuItem>
              <MenuItem onClick={handleAddRoadmap}>Roadmap</MenuItem>
            </Menu>
            {/* <button onClick={handleCloseAllTabs}>Close All</button> */}
            <IconToolbar
              theme={props.theme}
              handleMenuOpen={handleMenuOpen}
              handleCloseAllTabs={handleCloseAllTabs}
              disabled={!addArtifactEnabled}

            />


          </div>
        </div>
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
          {tabs.map((tab) => (
            <Tab
              key={`${tab.type}-${tab.id}`}
              value={`${tab.type}-${tab.id}`}
              onClick={() => {
                if (tab.type == "diagram") {
                  setActiveDiagramId(tab.id);
                }
              }}
              label={
                <span>
                  {`${tab.type.charAt(0).toUpperCase() + tab.type.slice(1)} ${tab.id}`}
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent switching tabs when closing
                      handleCloseTab(`${tab.type}-${tab.id}`);
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </span>
              }
            />
          ))}
        </Tabs>







        <>
                <Iconbox onSelectImage={handleSelectImage} props={props} />
                <div
                  id="canvas"
                  style={{ width: "100%", position: "relative", transition: "all 0.3s ease" }}

                  onClick={handleCanvasClick}
                  onContextMenu={handleCanvasRightClick}
                  onMouseEnter={() => setIsDroppable(true)}
                  onMouseLeave={() => setIsDroppable(false)}
                >
                  <Rnd
                    default={{
                      x: open ? 850 : 1240,
                      y: 20,
                    }}
                    bounds="parent"
                    position={{ x: open ? 850 : 1240, y: 20 }}
                  >
                    {/* <Diagra /> */}
                  </Rnd>

                  <ReactFlowProvider>

                  <ReactFlow
                    nodes={minimized ? [] : activeDiagram.nodes}
                    edges={minimized ? [] : activeDiagram.edges}


                    onNodesChange={onNodesChange}


                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}

                    nodeTypes={{ edgeNode: EdgeNode }}
                    deleteKeyCode={['Backspace', 'Delete']}

                    connectionMode="loose"
                    style={{ width: '100%', height: '100%' }}
                    onNodeContextMenu={(event, node) => handleRightClick(event, node.id)}
                    onNodeClick={onNodeClick}
                  >

                    <Controls />
                    <Background />
                    <HelperLinesRenderer
                      horizontal={helperLines.horizontal}
                      vertical={helperLines.vertical}
                    />
                  

                  </ReactFlow>
                  </ReactFlowProvider>






                </div>
              </>




      </RightPane>


    </div>
  );
};
