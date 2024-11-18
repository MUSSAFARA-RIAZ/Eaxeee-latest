import React, { memo } from 'react';
import { useReactFlow, useStoreApi, NodeResizer, NodeToolbar } from '@xyflow/react';
import useDetachNodes from '../useDetachNodes';
import { getRelativeNodesBounds } from '../utils';
import { useStore } from '@xyflow/react'; // Import useStore from @xyflow/react


const lineStyle = { borderColor: 'white' };

function GroupNode({ id }) {
  const store = useStoreApi();
  const { deleteElements } = useReactFlow();
  const detachNodes = useDetachNodes();
  
  const { minWidth, minHeight, hasChildNodes } = useStore((store) => {
    const childNodes = Array.from(store.nodeLookup.values()).filter(
      (n) => n.parentId === id
    );
    const rect = getRelativeNodesBounds(childNodes);

    return {
      minWidth: rect.x + rect.width,
      minHeight: rect.y + rect.height,
      hasChildNodes: childNodes.length > 0,
    };
  }, isEqual);

  const onDelete = () => {
    deleteElements({ nodes: [{ id }] });
  };

  const onDetach = () => {
    const childNodeIds = Array.from(store.getState().nodeLookup.values())
      .filter((n) => n.parentId === id)
      .map((n) => n.id);

    detachNodes(childNodeIds, id);
  };

  return (
    <div>
      <NodeResizer
        lineStyle={lineStyle}
        minHeight={minHeight}
        minWidth={minWidth}
      />
      <NodeToolbar className="nodrag">
        <button onClick={onDelete}>Delete</button>
        {hasChildNodes && <button onClick={onDetach}>Ungroup</button>}
      </NodeToolbar>
    </div>
  );
}

function isEqual(prev, next) {
  return (
    prev.minWidth === next.minWidth &&
    prev.minHeight === next.minHeight &&
    prev.hasChildNodes === next.hasChildNodes
  );
}

export default memo(GroupNode);
