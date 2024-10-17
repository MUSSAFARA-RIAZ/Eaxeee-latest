import React from 'react';
import { Rnd } from 'react-rnd';
import Iconbox from './Components/Iconbox';
import ContextMenu from './Testing'; // Adjust the path as needed
import ModalChangeColor from './Components/Modals/ModalChangeColor'; // Adjust the path as needed
import IconToolbar from './Components/IconToolbar'; // Adjust the path as needed

const MainContent = ({
  droppedImages,
  order,
  isBackgroundHidden,
  contextMenu,
  handleCanvasClick,
  handleRightClick,
  handleRectangleRightClick,
  selectedImage,
  isDroppable,
  mousePos,
  fullScreen,
  setDroppedImages,
  setfullScreen,
  isColorModalOpen,
  handleSelectImage,
  language,
  setIsColorModalOpen,
  handleChangeColor,
  handleMenuClick,
  getBackgroundColor,
  handleMouseEnter,
  handleMouseLeave,
  theme,
}) => {
  return (
    <div style={{ display: 'flex', flex: 1 }}>
      <Iconbox onSelectImage={handleSelectImage} />
      <div
        id="canvas"
        style={{
          width: '100%',
          height: '100vh',
          position: 'relative',
          overflow: 'auto',
          backgroundColor: !fullScreen ? 'transparent' : '#e0e0e0', // Set background color based on fullScreen
        }}
        onClick={handleCanvasClick}
        onContextMenu={handleRightClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button onClick={() => setfullScreen(false)}>Minimize</button>
        <button onClick={() => setfullScreen(true)}>Full Screen</button>
        {order.map((index) => {
          const image = droppedImages[index];
          return (
            <Rnd
              key={index}
              size={{ width: image.width || 140, height: image.height || 60 }}
              position={{ x: image.x, y: image.y }}
              onDragStop={(e, d) => {
                setDroppedImages((prev) =>
                  prev.map((img, idx) => (idx === index ? { ...img, x: d.x, y: d.y } : img))
                );
              }}
              onResizeStop={(e, direction, ref, delta, position) => {
                setDroppedImages((prev) =>
                  prev.map((img, idx) =>
                    idx === index
                      ? {
                          ...img,
                          width: ref.style.width,
                          height: ref.style.height,
                          ...position,
                        }
                      : img
                  )
                );
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: isBackgroundHidden[index]
                    ? 'transparent'
                    : image.backgroundColor,
                  border: isBackgroundHidden[index] ? 'none' : image.backgroundColor,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '10px',
                  padding: '5px',
                  cursor: 'move',
                  position: 'relative',
                }}
                onContextMenu={(e) => handleRectangleRightClick(e, index)}
              >
                {/* Center Marker */}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 10,
                  }}
                />

                {isBackgroundHidden[index] ? (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <img
                      src={image.src}
                      alt={`Dropped ${index}`}
                      style={{
                        position: 'relative',
                        width: '29px',
                        height: '24px',
                        margin: 'auto',
                      }}
                    />
                    <div style={{ fontSize: '12px', color: 'black', textAlign: 'center', display: 'flex' }}>
                      {image.title}
                    </div>
                  </div>
                ) : (
                  <>
                    <div style={{ fontSize: '12px', color: 'black', textAlign: 'center' }}>
                      {image.title}
                    </div>
                    <img
                      src={image.src}
                      alt={`Dropped ${index}`}
                      style={{
                        position: 'absolute',
                        width: '29px',
                        height: '24px',
                        top: 4,
                        right: 0,
                      }}
                    />
                  </>
                )}
              </div>
            </Rnd>
          );
        })}

        {selectedImage && isDroppable && (
          <img
            src={selectedImage}
            alt="Moving"
            style={{
              position: 'fixed',
              left: mousePos.x,
              top: mousePos.y,
              width: '30px',
              height: '30px',
              pointerEvents: 'none',
              transform: 'translate(-50%, -50%)',
            }}
          />
        )}

        {contextMenu && (
          <ContextMenu
            contextMenu={contextMenu}
            handleMenuClick={handleMenuClick}
            getBackgroundColor={getBackgroundColor}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            fullScreen={fullScreen}
            theme={theme}
          />
        )}

        {isColorModalOpen && (
          <ModalChangeColor
            open={isColorModalOpen}
            handleClose={() => setIsColorModalOpen(false)}
            onChangeColor={handleChangeColor}
            language={language}
            theme={theme}
          />
        )}
      </div>
    </div>
  );
};

export default MainContent;
