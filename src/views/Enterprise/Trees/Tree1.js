import React, { useEffect, useState } from 'react';
import { Grid, Typography, Paper } from '@mui/material';
// import { useTranslation } from 'react-i18next';
import {
    UncontrolledTreeEnvironment,
    Tree,
    StaticTreeDataProvider,
    createDefaultRenderers
} from "react-complex-tree";
import { longTree } from "../Components/data.js";
import "../../../styles/tree.css";
import Popup from '../Components/popup.jsx';
import PropertiesPopup from '../Components/propertiesPopup.jsx';

import 'react-complex-tree/lib/style-modern.css';
import { connect } from "react-redux";
import PopupTree1 from '../Components/Popup/PopupTree1.js';

const Tree1 = (props) => {
    // console.log("props in tree1", props);
    const [tree, setTree] = useState(longTree)
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);

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
        foldertitle: "Create Architecture",
        filetitle: "",

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

    }, [selectedItem]);

    const handleCreateFolder = (action, item) => {
        setContextMenu({ visible: false, x: 0, y: 0 });

        console.log("---------------");
        console.log("in handleCreateFolder");

        setUpdateTreeState((prev) => ({ ...prev, showPopUp: true, item: item, type: "folder", action: "create meta-model" }))


    }

    const handleCopyArchitecture = (item) => {
        setContextMenu({ visible: false, x: 0, y: 0 });

        // Function to generate a unique name
        const generateUniqueName = (baseName) => {
            let newName = baseName + "_copy";
            let count = 1;

            // Ensure the new name is unique in the current tree
            while (tree.items[newName]) {
                newName = `${baseName}_copy${count}`;
                count++;
            }

            return newName;
        };

        // Generate unique name for the copied folder
        const newFolderName = generateUniqueName(item.data);

        // Deep copy the folder and its children
        const copiedFolder = {
            ...item,
            index: newFolderName, // Ensure index matches the new name
            data: newFolderName,
            children: item.children.map((childId) => {
                const originalChild = tree.items[childId];
                const childNewName = generateUniqueName(originalChild.data);
                return {
                    ...originalChild,
                    index: childNewName,
                    data: childNewName,
                    parent: newFolderName,
                };
            }),
        };

        // Create a copy of the tree structure
        const updatedTree = { ...tree };

        // Add the copied folder to the tree
        updatedTree.items[newFolderName] = copiedFolder;

        // Add each child of the copied folder
        copiedFolder.children.forEach((child) => {
            updatedTree.items[child.index] = child;
        });

        // Append the copied folder to its parent's children
        updatedTree.items[item.parent].children.push(newFolderName);

        // Update the state
        setTree(updatedTree);
        console.log("Updated Tree:", updatedTree);
    };







    // Define context menu component for folders
    const FolderContextMenu = ({ item }) => {
        const hasFiles = item.children.length > 0;
        return (
            <div className="contextMenu"
                style={{
                    top: contextMenu.y,
                    left: contextMenu.x,
                }}>
                <ul>

                    <>
                        {item.data === 'Eaxee' && (
                            <li className='contextMenuItems' onClick={() => handleCreateFolder('create', item)}>➕ {('New Architecture')}</li>
                        )}
                        {item.data !== 'Eaxee' && (
                            <>
                                <li className='contextMenuItems' onClick={() => handleCopyArchitecture(item)}>📋 {('Evolve Architecture')}</li>

                            </>
                        )}
                    </>

                </ul>
            </div>
        )
    };
    // Define context menu component for other items
    const ItemContextMenu = ({ item }) => (
        <div className="contextMenu"
            style={{
                position: "absolute",
                top: contextMenu.y,
                left: contextMenu.x,
            }}>
            <ul>

            </ul>
        </div>
    );




    const createNewFolder = () => {
        // Ensure the new folder is created properly as usual
        console.log("in handleCreateFolder");
        if (!itemNameInput.trim()) {
            alert("Meta-model name cannot be empty");
            return;
        }

        let selectedFolder = updateTreeState.rightClickedItem.data;
        const children = tree.items[selectedFolder].children;
        const isAlreadyExists = children.some(child => child.toLowerCase() === itemNameInput.toLowerCase());

        if (!isAlreadyExists) {
            let oldTreeState = tree;
            let newTreeItem = {
                index: itemNameInput,
                canMove: true,
                isFolder: true,
                children: [],
                data: itemNameInput,
                canRename: true,
                parent: selectedFolder
            };

            oldTreeState['items'][itemNameInput] = newTreeItem;
            oldTreeState['items'][updateTreeState.rightClickedItem.data].children.push(itemNameInput);
            setTree(oldTreeState);
            closeCreateFolderModal();
        } else {
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
                    <style>
                        {`
      :root {

           --rct-color-arrow: #2158a4;

         
          --rct-bar-color: #2158a4;

          --rct-color-focustree-item-selected-bg:#2158A429;
         
        
          --rct-color-focustree-item-active-text: #4f4f4f;
          
   
       
        }
        .rct-tree-item-arrow svg : hover{
    background-color: red
}
      .rct-tree-item-title-container-selected .rct-tree-item-button::before {

    content: " ";
    position: absolute;
    left: calc(-1* var(--rct-bar-width));
 
    left: calc(-0.5* var(--rct-bar-width));
    right: calc(-0.5* var(--rct-bar-width));
    height: calc(var(--rct-item-height) - 2* var(--rct-bar-offset));
    width: var(--rct-bar-width);
    background-color: var(--rct-bar-color);
    border-radius: 99px;
}

        .rct-tree-item-button:hover{
        background-color: #cecece;
         color: #393a3a;
        }
      
.rct-tree-item-title-container-selected .rct-tree-item-button {
    background-color: var(--rct-color-focustree-item-selected-bg);
    color: #393a3a;
    }
[dir="rtl"] .rct-tree-item-li[aria-expanded="false"] .rct-tree-item-arrow {
  rotate: 180deg;
}
.rct-tree-item-arrow.rct-tree-item-arrow-isFolder:hover {
    background-color: transparent;
    color: red;
}
    


    `}
                    </style>
                    <UncontrolledTreeEnvironment
                        dataProvider={new StaticTreeDataProvider(tree.items, (item, data) => ({ ...item, data }))}
                        getItemTitle={item => item.data}
                        viewState={{}}
                        canReorderItems
                        canRename={true}
                        canDragAndDrop
                        canDropOnFolder={true}


                        // onSelectItems={(items) => console.log("Selected items:", items)} //returns array of selected items
                        renderItemTitle={({ item, context, title }) => {

                            return item.isFolder ? <span>{context.isExpanded ? '📁 ' : '📂 '}{title}</span> : <span>{'📚 '}{title}</span>
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
                                ? <PopupTree1
                                    itemNameInput={itemNameInput}
                                    setItemNameInput={setItemNameInput}
                                    updateTreeState={updateTreeState}
                                    setSelectedFile={setSelectedFile}
                                    props={props}
                                    foldertitle={updateTreeState.foldertitle}
                                    filetitle={updateTreeState.filetitle}
                                    //   type="folder"
                                    titlefile="tree1"
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

export default connect(mapStateToProps, mapDispatchToProps)(Tree1);