import { Node } from "../../utils/Tree/Tree";

export interface NodeLayout {
  node: Node;
  verticalAxisMapping: (domainValue: number) => number;
  horizontalAxisMapping: (domainValue: number) => number;
  leafNodeIndexMap: Map<Node, number>;
  defaultBranchLength: number;
}

const NodeLayout = ({
  node,
  verticalAxisMapping,
  horizontalAxisMapping,
  leafNodeIndexMap,
  defaultBranchLength,
}: NodeLayout) => {
  const getVerticalPositioning = (node: Node): number => {
    if (node.isLeaf() && leafNodeIndexMap.has(node)) {
      return leafNodeIndexMap.get(node)!;
    } else {
      return (
        node.children.reduce(
          (acc, child) => acc + getVerticalPositioning(child),
          0
        ) / node.children.length
      );
    }
  };

  // need to flip these around somehow so that the both are still in the domain range.
  const initialHorizontalPosition = horizontalAxisMapping(
    node.getDistanceToRoot()
  );
  const finalHorizontalPosition = horizontalAxisMapping(
    node.getDistanceToRoot() -
      (node.branchLength !== undefined
        ? node.branchLength
        : defaultBranchLength)
  );
  const verticalPosition = verticalAxisMapping(getVerticalPositioning(node));

  /*
    Prepare to draw vertical lines (pipes below)
     ____________
    |
    |
    |
    |____________

    The min and max of the child heights are used to draw a vertical line
    for the parent node, which connects the branches of the children.
  */

  const verticalPositionsChildren = node.children.map((child) =>
    verticalAxisMapping(getVerticalPositioning(child))
  );

  const minVerticalPosition =
    verticalPositionsChildren.length !== 0
      ? Math.min(...verticalPositionsChildren)
      : 0;

  const maxVerticalPosition =
    verticalPositionsChildren.length !== 0
      ? Math.max(...verticalPositionsChildren)
      : 0;

  return (
    <>
      <g id={`tree-node-${node.id}`}>
        <circle
          r={5}
          cx={initialHorizontalPosition}
          cy={verticalPosition}
          fill="red"
        />
        {/* 
          if the node.label is not defined, currently, this means that it is
          a leaf node, but this is definitely open to interpretation and will
          require some additional work...
          (1) we may want to position the node labels for internal nodes on top of the
          branch or behind the node connection point.
          (2) for leaf nodes, it is simpler, we want to render the node label behind the
          node connection point, i.e. at the end of the tip.
        */}
        {node.label !== undefined ? (
          <text
            textAnchor="middle"
            fontSize={16}
            dominantBaseline="middle"
            fill="white"
            x={initialHorizontalPosition}
            y={verticalPosition}
          >
            {node.label}
          </text>
        ) : null}
        {/* 
          if there are no children, this is an internal node, we want to render a
          vertical line at the initial position of the node to connect the nodes
          for the children
        */}
        {verticalPositionsChildren.length !== 0 ? (
          <line
            id={`tree-node-${node.id}-vertical-delimiter`}
            x1={initialHorizontalPosition}
            y1={minVerticalPosition}
            x2={initialHorizontalPosition}
            y2={maxVerticalPosition}
            stroke="white"
          />
        ) : null}
        <line
          id={`tree-node-${node.id}-branch-delimiter`}
          x1={initialHorizontalPosition}
          x2={finalHorizontalPosition}
          y1={verticalPosition}
          y2={verticalPosition}
          stroke="white"
        />
      </g>
    </>
  );
};

export default NodeLayout;
