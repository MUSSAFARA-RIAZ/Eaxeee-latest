export function getHelperLines(change, nodes, distance = 30) {
  const defaultResult = {
    horizontal: undefined,
    vertical: undefined,
    snapPosition: { x: undefined, y: undefined },
  };
  const nodeA = nodes.find((node) => node.id === change.id);

  if (!nodeA || !change.position) {
    return defaultResult;
  }

  const nodeABounds = {
    left: change.position.x,
    right: change.position.x + (nodeA.measured?.width || 0),
    top: change.position.y,
    bottom: change.position.y + (nodeA.measured?.height || 0),
    width: nodeA.measured?.width || 0,
    height: nodeA.measured?.height || 0,
  };

  let horizontalDistance = distance;
  let verticalDistance = distance;

  return nodes
    .filter((node) => node.id !== nodeA.id)
    .reduce((result, nodeB) => {
      const nodeBBounds = {
        left: nodeB.position.x,
        right: nodeB.position.x + (nodeB.measured?.width || 0),
        top: nodeB.position.y,
        bottom: nodeB.position.y + (nodeB.measured?.height || 0),
        width: nodeB.measured?.width || 0,
        height: nodeB.measured?.height || 0,
      };

      // Calculate distances for vertical alignment
      const distanceLeftLeft = Math.abs(nodeABounds.left - nodeBBounds.left);
      if (distanceLeftLeft < verticalDistance) {

        
        result.snapPosition.x = nodeBBounds.left;
        result.vertical = nodeBBounds.left;
        verticalDistance = distanceLeftLeft;
        console.log("distanceLeftLeft < verticalDistance",verticalDistance)
      }

      const distanceRightRight = Math.abs(nodeABounds.right - nodeBBounds.right);
      if (distanceRightRight < verticalDistance) {
        result.snapPosition.x = nodeBBounds.right - nodeABounds.width;
        result.vertical = nodeBBounds.right;
        verticalDistance = distanceRightRight;
        console.log("distanceRightRight < verticalDistance",verticalDistance)

      }

      const distanceLeftRight = Math.abs(nodeABounds.left - nodeBBounds.right);
      if (distanceLeftRight < verticalDistance) {
        result.snapPosition.x = nodeBBounds.right;
        result.vertical = nodeBBounds.right;
        verticalDistance = distanceLeftRight;
        console.log("distanceLeftRight < verticalDistance",verticalDistance)

        
      }

      const distanceRightLeft = Math.abs(nodeABounds.right - nodeBBounds.left);
      if (distanceRightLeft < verticalDistance) {
        result.snapPosition.x = nodeBBounds.left - nodeABounds.width;
        result.vertical = nodeBBounds.left;
        verticalDistance = distanceRightLeft;
        console.log("distanceRightLeft < verticalDistance",verticalDistance)


      }

      // Calculate distances for horizontal alignment
      const distanceTopTop = Math.abs(nodeABounds.top - nodeBBounds.top);
      if (distanceTopTop < horizontalDistance) {
        result.snapPosition.y = nodeBBounds.top;
        result.horizontal = nodeBBounds.top;
        horizontalDistance = distanceTopTop;
        console.log("distanceTopTop < horizontalDistance",horizontalDistance)


      }

      const distanceBottomTop = Math.abs(nodeABounds.bottom - nodeBBounds.top);
      if (distanceBottomTop < horizontalDistance) {
        result.snapPosition.y = nodeBBounds.top - nodeABounds.height;
        result.horizontal = nodeBBounds.top;
        horizontalDistance = distanceBottomTop;
        console.log("distanceBottomTop < horizontalDistance",horizontalDistance)

      }

      const distanceBottomBottom = Math.abs(nodeABounds.bottom - nodeBBounds.bottom);
      if (distanceBottomBottom < horizontalDistance) {
        result.snapPosition.y = nodeBBounds.bottom - nodeABounds.height;
        result.horizontal = nodeBBounds.bottom;
        horizontalDistance = distanceBottomBottom;
        console.log("distanceBottomBottom < horizontalDistance",horizontalDistance)

      }

      const distanceTopBottom = Math.abs(nodeABounds.top - nodeBBounds.bottom);
      if (distanceTopBottom < horizontalDistance) {
        result.snapPosition.y = nodeBBounds.bottom;
        result.horizontal = nodeBBounds.bottom;
        horizontalDistance = distanceTopBottom;
        console.log("distanceTopBottom < horizontalDistance",horizontalDistance)

      }

      console.log("final result",result)

      return result;
    }, defaultResult);
}
