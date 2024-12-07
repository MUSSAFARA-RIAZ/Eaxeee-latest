import React, { useEffect, useState } from 'react';
import { Grid, Typography, Paper } from '@mui/material';
// import { useTranslation } from 'react-i18next';
import {
  UncontrolledTreeEnvironment,
  Tree,
  StaticTreeDataProvider,
  createDefaultRenderers
} from "react-complex-tree";
import { longTree2 } from "../Components/data.js";
import "../../../styles/tree.css";
import Popup from '../Components/popup.jsx';
import PropertiesPopup from '../Components/propertiesPopup.jsx';

import 'react-complex-tree/lib/style-modern.css';
import { connect } from "react-redux";
import ShareIcon from '@mui/icons-material/Share';
import PopupTree4 from '../Components/Popup/PopupTree4.js';

const Tree4 = (props) => {
  console.log("props in tree1", props)
  //   const { t, i18n } = useTranslation();
  const [disabledItems, setDisabledItems] = useState({});





  const [tree, setTree] = useState(longTree2)
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [licenseProperties, setLicenseProperties] = useState({
    deploymentType: '',
    repositoryId: '',
  });
  const [treeData, setTreeData] = useState('')





  useEffect(() => {
    if (selectedFile) {
      console.log("selectedFile:", selectedFile);
    }
    setSelectedFile(null);
  }, [selectedFile]);


  const cx = (...classNames) => {
    return classNames.filter(cn => !!cn).join(' ');
  };
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });

  const [itemNameInput, setItemNameInput] = useState('');

  const [updateTreeState, setUpdateTreeState] = useState({
    showPopUp: false,
    item: null,
    rightClickedItem: null,
    type: "item"
  })



  useEffect(() => {
    const handleClickOutside = () => { setContextMenu({ visible: false, x: 0, y: 0 }); };
    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);


  useEffect(() => {
    // console.log("selectedItem:", selectedItem); // This will be called whenever the selectedItem changes
  }, [selectedItem]);






  const handleCreateFile = (action, item) => {
    setContextMenu({ visible: false, x: 0, y: 0 });
    setUpdateTreeState(prev => ({
      ...prev,
      showPopUp: true,
      item: item,
      type: "file",
      action: "create file"
    }));
  };




  const handleCreateFolder = (action, item) => {
    setContextMenu({ visible: false, x: 0, y: 0 });

    console.log("---------------");
    console.log("in handleCreateFolder");

    setUpdateTreeState((prev) => ({ ...prev, showPopUp: true, item: item, type: "folder", action: "create meta-model" }))
    console.log("action:", action);
    console.log("item:", item);
    console.log("tree => ", tree);
    console.log("---------------");
    console.log("");

  }



  const handleRemoveItem = (item) => {
    // Function to recursively disable the item and its children
    const disableItemAndChildren = (itemData) => {
      setDisabledItems((prev) => ({
        ...prev,
        [itemData]: true, // Mark item as disabled
      }));

      // If the item is a folder and has children, disable them as well
      const currentItem = tree.items[itemData];
      if (currentItem && currentItem.isFolder) {
        currentItem.children.forEach((child) => {
          disableItemAndChildren(child); // Recursively disable children
        });
      }
    };

    disableItemAndChildren(item.data); // Disable the item and its children

    setContextMenu((prev) => ({
      ...prev,
      text: "Delete", // Update text to "Delete" after removal
    }));

    // Optionally, add a delay before actually deleting or enable 'delete' state
    setTimeout(() => {
      console.log(`Item ${item.data} and its children are marked for deletion.`);
    }, 2000); // Adjust delay duration as needed
  };
  const handleDeleteItem = (action, item) => {
    setContextMenu({ visible: false, x: 0, y: 0 });

    // Confirm before deleting
    if (!window.confirm("Are you sure you want to delete this item?")) {
      return;
    }

    let selectedItem = item.data;
    console.log("selectedItem:", selectedItem);

    let parentKey = tree.items[selectedItem].parent; //error arha yahan
    // TypeError: Cannot read properties of undefined (reading 'parent')

    console.log("parentKey:", parentKey);

    let newTreeState = { ...tree }; // create a new state object

    // Remove the selected item from its parent's children array
    const parentChildren = newTreeState.items[parentKey].children;
    console.log("parentChildren:", parentChildren);
    const indexToRemove = parentChildren.indexOf(selectedItem);
    if (indexToRemove !== -1) {
      parentChildren.splice(indexToRemove, 1);
    } else {
      alert(' Item not found in parent folder')
    }

    // Remove the selected item from the tree
    delete newTreeState.items[selectedItem];

    console.log("newTreeState:", newTreeState);

    setTree(newTreeState);
  }
  const handleRestoreItem = (item) => {
    // Function to restore the item and its children
    const restoreItemAndChildren = (itemData) => {
      setDisabledItems((prev) => {
        const updated = { ...prev };
        delete updated[itemData]; // Remove the disabled state
        return updated;
      });

      // If the item is a folder, restore its children as well
      const currentItem = tree.items[itemData];
      if (currentItem && currentItem.isFolder) {
        currentItem.children.forEach((child) => {
          restoreItemAndChildren(child); // Recursively restore children
        });
      }
    };

    restoreItemAndChildren(item.data); // Restore the item and its children
  };




  const FolderContextMenu = ({ item }) => {
    const isDisabled = disabledItems[item.data];
    return (
      <div className="contextMenu"
        style={{
          top: contextMenu.y,
          left: contextMenu.x,
        }}>
        <ul>
          {item.data === 'Roles' ? (
            <>
              <li className='contextMenuItems' onClick={() => handleCreateFolder('create', item)}>➕ {('generate license')}</li>
              <li className='contextMenuItems' onClick={() => handleCreateFolder('create', item)}>➕ {('load license')}</li>
              <li className='contextMenuItems' onClick={() => handleCreateFolder('create', item)}>➕ {('generate role')}</li>
              <li className='contextMenuItems' onClick={() => handleCreateFolder('create', item)}>➕ {('load role')}</li>
            </>
          ) : (
            <>
              {item.data === 'Eaxee' && (
                <li className='contextMenuItems' onClick={() => handleCreateFolder('create', item)}>➕ {('New Folder')}</li>
              )}
              {item.data !== 'Eaxee' && (
                <>
                  {!isDisabled && (
                    <li className='contextMenuItems' onClick={() => handleCreateFile('create', item)}>📋 {('New Process')}</li>
                  )}
                  {isDisabled ? (
                    <>
                      <li className="contextMenuItems" onClick={() => handleDeleteItem('deleteItem', item)}>
                        🗑️ {('Delete')}
                      </li>
                      <li className="contextMenuItems" onClick={() => handleRestoreItem(item)}>
                        🔄 {('Restore')}
                      </li>
                    </>
                  ) : (
                    <li className="contextMenuItems" onClick={() => handleRemoveItem(item)}>
                      🗑️ {('Remove')}
                    </li>
                  )}
                </>
              )}
            </>
          )}
        </ul>
      </div>
    );
  };

  const ItemContextMenu = ({ item }) => {
    const isDisabled = disabledItems[item.data];
    return (
      <div className="contextMenu"
        style={{
          position: "absolute",
          top: contextMenu.y,
          left: contextMenu.x,
        }}>
        <ul>
          {/* {isDisabled ? (
            <>
              <li className='contextMenuItems' onClick={() => handleDeleteItem('deleteItem', item)}>🗑️ {('Delete')}</li>
              <li className='contextMenuItems' onClick={() => handleRestoreItem(item)}>🔄 {('Restore')}</li>
            </>
          ) : (
            <>
              <li className='contextMenuItems' onClick={() => handleDeleteItem('deleteItem', item)}>🗑️ {('Delete')}</li>
              <li className='contextMenuItems' onClick={() => handleRemoveItem(item)}>🗑️ {('Remove')}</li>
            </>
          )} */}
        </ul>
      </div>
    );
  };





  const createNewFolder = () => {
    console.log("---------------");
    console.log("in handleCreateFolder");
    if (!itemNameInput.trim()) {
      alert("Meta-model name cannot be empty");
      return;
    }
    // Add item to the clicked folder using rightClickedItem and itemNameInput
    console.log(`adding ${itemNameInput} to folder ${updateTreeState.rightClickedItem.data}`);
    // Clear item name input and close popup
    // console.log("updateTreeState:", updateTreeState);
    // console.log("tree:", tree);
    let selectedFolder = updateTreeState.rightClickedItem.data;
    const children = tree.items[selectedFolder].children;
    const isAlreadyExists = children.some(child => child.toLowerCase() === itemNameInput.toLowerCase());
    console.log("isAlreadyExists:", isAlreadyExists);

    // console.log("selectedFolder:", selectedFolder);
    // console.log(tree.items[selectedFolder].children);

    if (!isAlreadyExists) {

      let oldTreeState = tree;
      let newTreeItem = {
        "index": itemNameInput,
        "canMove": true,
        "isFolder": true,
        "children": [],
        "data": itemNameInput,
        "canRename": true,
        "parent": selectedFolder
      }

      oldTreeState['items'][itemNameInput] = newTreeItem;
      oldTreeState['items'][updateTreeState.rightClickedItem.data].children.push(itemNameInput)
      setTree(oldTreeState)
      closeCreateFolderModal();
      console.log("---------------");
    }
    else {
      alert("Architecture already exists");
    }



  };



  const createNewFile = () => {
    console.log("---------------");
    console.log("in createNewFile");
    if (!itemNameInput.trim()) {
      alert("Repository name cannot be empty");
      return;
    }
    // Extract relevant data
    let selectedFolder = updateTreeState.rightClickedItem.data;
    const newFileName = itemNameInput;
    const children = tree.items[selectedFolder].children;
    // check if children name already exists
    const isAlreadyExists = children.some(child => child.toLowerCase() === newFileName.toLowerCase());
    if (!isAlreadyExists) {
      const updatedTree = { ...tree };
      const newFileItem = {
        index: newFileName,
        canMove: true,
        isFolder: false, // Marking it as a file
        data: newFileName,
        canRename: true,
        parent: selectedFolder
      };
      updatedTree.items[selectedFolder].children.push(newFileName);
      updatedTree.items[newFileName] = newFileItem;
      setTree(updatedTree);
      // Close the modal
      closeCreateFolderModal();
      console.log("---------------");
    }
    else {
      alert("Repository already exists");
    }
  };






  const closeCreateFolderModal = () => {
    setItemNameInput('');
    // setShowPopup(false);
    setUpdateTreeState((prev) => ({ ...prev, showPopUp: false }))
  }




  return (
    <div>

      <div>
        <Grid container spacing={1} sx={{ marginTop: '1%' }}>
          <UncontrolledTreeEnvironment
            dataProvider={new StaticTreeDataProvider(tree.items, (item, data) => ({ ...item, data }))}
            getItemTitle={item => item.data}
            viewState={{}}
            canReorderItems
            canRename={true}
            canDragAndDrop
            canDropOnFolder={true}


            // onSelectItems={(items) => console.log("Sel+ected items:", items)} //returns array of selected items
            renderItemTitle={({ item, context, title }) => {

              // console.log("item:", item);
              // console.log("context:", context);
              // console.log("title:", title);

              return item.isFolder ? <span>{context.isExpanded ? '📁 ' : '📂 '}{title}</span> : <span style={{ display: "inline-flex", alignItems: "center" }}>
                <ShareIcon sx={{ fontSize: "13px", verticalAlign: "middle" }} />
                {title}
              </span>

            }}
            renderItem={({ item, depth, children, title, context, arrow }) => {
              const isSelected = context.isSelected; //returns boolean
              const InteractiveComponent = context.isRenaming ? 'div' : 'button';
              const type = context.isRenaming ? undefined : 'button';

              // Determine if this item is the right-clicked item
              const isRightClickedItem = item === updateTreeState.rightClickedItem;

              // Determine which context menu to show based on item type
              const ContextMenuComponent = item.isFolder ? FolderContextMenu : ItemContextMenu;
              // console.log("item:", item);
              return (
                <li
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // handleItemClick(item)
                  }}
                  {...(context.itemContainerWithChildrenProps)}
                  className={cx(
                    'rct-tree-item-li',
                    item.isFolder && 'rct-tree-item-li-isFolder',
                    context.isSelected && 'rct-tree-item-li-selected',
                    context.isExpanded && 'rct-tree-item-li-expanded',
                    context.isFocused && 'rct-tree-item-li-focused',
                    context.isDraggingOver && 'rct-tree-item-li-dragging-over',
                    context.isSearchMatching && 'rct-tree-item-li-search-match'
                  )
                  }

                  onContextMenu={e => {
                    // console.log("item =>", item.isFolder);
                    // console.log("depth =>", depth);
                    // console.log("children =>", children);
                    // console.log("title =>", title);
                    // console.log("context =>", context);
                    // console.log("arrow =>", arrow);
                    // console.log("e =>", e);

                    e.preventDefault();
                    e.stopPropagation();
                    setUpdateTreeState((prev) => ({ ...prev, rightClickedItem: item }))
                    const containerRect = e.currentTarget.getBoundingClientRect();
                    props.language === 'ar' ? setContextMenu({ visible: true, x: containerRect.right - e.clientX, y: e.clientY - containerRect.top }) : setContextMenu({ visible: true, x: e.clientX + 4 - containerRect.left, y: e.clientY - containerRect.top });
                  }}
                  style={{ position: "relative" }}
                >
                  <div
                    {...(context.itemContainerWithoutChildrenProps)}
                    style={{ paddingLeft: `${(depth + 1) * 10}px` }}
                    className={cx(
                      'rct-tree-item-title-container',
                      disabledItems[item.data] && 'blurred-item', // Add blur if disabled
                      item.isFolder && 'rct-tree-item-title-container-isFolder',
                      context.isSelected && 'rct-tree-item-title-container-selected',
                      context.isExpanded && 'rct-tree-item-title-container-expanded',
                      context.isFocused && 'rct-tree-item-title-container-focused',
                      context.isDraggingOver &&
                      'rct-tree-item-title-container-dragging-over',
                      context.isSearchMatching &&
                      'rct-tree-item-title-container-search-match'
                    )}
                  >
                    {arrow}
                    <InteractiveComponent
                      type={type}
                      {...(context.interactiveElementProps)}
                      className={cx('rct-tree-item-button')}
                    >
                      {title}
                      {context.viewStateFlags.activeItems ? ' (marked as active)' : ''}
                    </InteractiveComponent>
                  </div>
                  {children}
                  {isRightClickedItem && contextMenu.visible && <ContextMenuComponent item={item} />}
                </li>
              );
            }}
          >

            {updateTreeState.showPopUp && (
              updateTreeState.action === "create meta-model" || updateTreeState.action === "create file"
                ? <PopupTree4
                  itemNameInput={itemNameInput}
                  setItemNameInput={setItemNameInput}
                  updateTreeState={updateTreeState}
                  setSelectedFile={setSelectedFile}
                  props={props}
                  type="folder"
                  titlefile="tree4"

                  createNewFolder={createNewFolder}
                  createNewFile={createNewFile}
                  closeCreateFolderModal={closeCreateFolderModal}
                />
                : updateTreeState.action === "show file properties" || updateTreeState.action === "show folder properties"
                  ?
                  <PropertiesPopup
                    closePropertiesModal={closeCreateFolderModal}
                    updateTreeState={updateTreeState}

                  />
                  : null
            )}


            {/* <Grid container spacing={1} sx={{ marginTop: '1%' }}> */}
            <Grid item sx={{ height: "100%", width: "100%", background: "transparent" }}>
              <Paper sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', background: "transparent", justifyContent: 'space-between', boxShadow: 0 }}>

                <div>
                  <Tree treeId="tree-1" rootItem="leftpane" treeLabel="Tree 1"
                  // {...createDefaultRenderers(10, true)} //this is for rtl :)
                  />
                </div>

              </Paper>
              {/* </Grid> */}
            </Grid>
          </UncontrolledTreeEnvironment>


        </Grid>
      </div>
    </div>

  );
};

const mapStateToProps = (state) => ({
  language: state.language,
  theme: state.theme,
  activeTree: state.activeTree,

});

const mapDispatchToProps = (dispatch) => ({
  setLanguage: (lang) =>
    dispatch({
      type: "TOGGLELANG",
      value: lang === "en" ? "ar" : "en",
    }),
  setTheme: (theme) =>
    dispatch({
      type: "UPDATETHEME",
      value: theme,
    }),

  setTree: (tree) =>
    dispatch({
      type: "ACTIVETREE",
      value: tree,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tree4);