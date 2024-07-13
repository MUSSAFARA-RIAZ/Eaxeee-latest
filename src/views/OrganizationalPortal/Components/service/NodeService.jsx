export const NodeService = {
    getTreeNodesData() {
        return [
            {
                key: '0',
                label: 'Architecture',
                data: 'Architecture Folder',
                icon: 'pi pi-fw pi-inbox',
                children: [
                    {
                        key: '0-0',
                        label: 'Diary',
                        data: 'Diary Folder',
                        icon: 'pi pi-fw pi-folder',
                        children: [
                            {
                                key: '0-0-0',
                                label: 'Page 1',
                                data: 'Page leaf',
                                icon: 'pi pi-fw pi-file',
                            },
                            {
                                key: '0-0-1',
                                label: 'Page 2',
                                data: 'Page leaf',
                                icon: 'pi pi-fw pi-file',
                            }
                        ]
                    },
                ]
            }
        ];
    },

    getTreeNodes(parentKey, newChildData) {
        const treeNodes = this.getTreeNodesData();
        const parentNode = this.findNode(treeNodes, parentKey);
        
        if (parentNode) {
            const newChildKey = this.generateUniqueKey();
            const newChildNode = { ...newChildData, key: newChildKey };
            parentNode.children.push(newChildNode);
        }
        
        return Promise.resolve(treeNodes);
    },

    
    generateUniqueKey() {
        // Generate a unique key, you can use any method you prefer
        return 'node_' + Math.random().toString(36).substr(2, 9);
    },
    

    findNode(nodes, key) {
        console.log('Searching for key:', key);
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            console.log('Current Node:', node);
            if (node.key === key) {
                return node;
            }
            if (node.children) {
                const foundNode = this.findNode(node.children, key);
                if (foundNode) {
                    return foundNode;
                }
            }
        }
        console.log('Node not found for key:', key);
        return null;
    }
};
