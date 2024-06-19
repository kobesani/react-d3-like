import { Node } from "../../utils/Tree/Tree";

export interface NodeLayout {
  node: Node;
  verticalAxisMapping: (arg0: number) => number;
  horizontalAxisMapping: (arg0: number) => number;
  leafNodeIndexMap: Map<Node, number>;
}

const NodeLayout = ({
  node,
  verticalAxisMapping,
  horizontalAxisMapping,
  leafNodeIndexMap,
}: NodeLayout) => {
  const getVerticalPositioning = (node: Node): number => {
    if (node.isLeaf() && leafNodeIndexMap.has(node)) {
      return leafNodeIndexMap.get(node)!;
    } else {
      return node.children.reduce(
        (acc, child) => acc + getVerticalPositioning(child),
        0
      ) / node.children.length;
    }
  };

  const initialHorizontalPosition = horizontalAxisMapping(
    node.getDistanceToRoot()
  );
  const finalHorizontalPosition = horizontalAxisMapping(
    node.getDistanceToRoot() - (node.branchLength ? node.branchLength : 0)
  );
  const verticalPosition = verticalAxisMapping(getVerticalPositioning(node));

  // prepare for drawing vertical node lines (pipes below)
  //  ___________
  // |
  // |
  // |
  // |___________
  //
  // min and max of child heights are used to draw line for the parent node

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
        {node.branchLength !== undefined ? (
          <line
            id={`tree-node-${node.id}-branch-delimiter`}
            x1={initialHorizontalPosition}
            x2={finalHorizontalPosition}
            y1={verticalPosition}
            y2={verticalPosition}
            stroke="white"
          />
        ) : (
          <line
            id={`tree-node-${node.id}-branch-delimiter`}
            x1={initialHorizontalPosition}
            x2={initialHorizontalPosition - 5}
            y1={verticalPosition}
            y2={verticalPosition}
            stroke="white"
          />
        )}
      </g>
    </>
  );
};

export default NodeLayout;
