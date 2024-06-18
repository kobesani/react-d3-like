import { useState } from "react";
import { NewickParser } from "../utils/Tree/Parser";
import { NewickLexer } from "../utils/Tree/Lexer";
import { Node, Tree } from "../utils/Tree/Tree";

import SvgDimensionsProvider from "../components/Providers/SvgDimensionsProvider";
import { useSvgDimensions } from "../hooks/SvgDimensions";

interface PhylogenyProps {
  tree: Tree;
}

const Phylogeny = ({ tree }: PhylogenyProps) => {
  const { width, height } = useSvgDimensions();

  const leafNodes = tree.getLeafNodes();
  const leafNodesToIndex = new Map<Node, number>(
    leafNodes.map((node, index) => [node, index])
  );

  const getVerticalPositioning = (node: Node): number =>
    node.isLeaf() && leafNodesToIndex.has(node)
      ? // all leaf nodes should be in the leafNodesToIndex map
        leafNodesToIndex.get(node)!
      : // if it is not a leaf node we take the average of the vertical positioning of the children
        node.children.reduce(
          (accumulator, child) => accumulator + getVerticalPositioning(child),
          0
        ) / node.children.length;
  const stepSize = height / leafNodes.length;
  const padding = 20;
  const treeWidth = tree.getMaxDistanceToRoot();
  const branchLengthScalar = width / treeWidth;
  const values = tree.getAllNodes("preorder").map((node, index) => ({
    id: node.id,
    label: node.label,
    xValue:
      (node.branchLength ? node.branchLength : 0) * branchLengthScalar +
      padding,
    rootDistance: node.getDistanceToRoot() * branchLengthScalar,
    branchlength:
      (node.branchLength ? node.branchLength : 1) * branchLengthScalar,
    yValue: getVerticalPositioning(node) * stepSize + padding,
  }));

  const getMinMaxVerticalPositioning = (
    node: Node
  ): {
    min: number;
    max: number;
    rootDistance: number;
    branchLength: number;
  } => {
    const childrenPositions = node.children.map((child) =>
      getVerticalPositioning(child)
    );
    const min = Math.min(...childrenPositions) * stepSize + padding;
    const max = Math.max(...childrenPositions) * stepSize + padding;
    const rootDistance = node.getDistanceToRoot() * branchLengthScalar;
    const branchLength =
      (node.branchLength ? node.branchLength : 0) * branchLengthScalar;
    return { min, max, rootDistance, branchLength };
  };

  const nonLeafNodesMinMax = tree
    .getAllNodes("preorder")
    .filter((node) => !node.isLeaf())
    .map((node) => getMinMaxVerticalPositioning(node));

  console.log(values);

  return (
    <>
      {values.map((value, index) => (
        <g key={index}>
          <circle r={5} cx={value.rootDistance} cy={value.yValue} fill="red" />
          <text
            key={index}
            textAnchor="middle"
            fontSize={16}
            dominantBaseline="middle"
            fill="white"
            x={value.rootDistance}
            y={value.yValue}
          >
            {value.label}
          </text>
          <line
            key={100 + value.id}
            stroke="white"
            x1={value.rootDistance}
            x2={value.rootDistance - value.branchlength}
            y1={value.yValue}
            y2={value.yValue}
          />
        </g>
      ))}

      {nonLeafNodesMinMax.map((value, index) => (
          <line
            key={200 + index}
            stroke="white"
            x1={value.rootDistance}
            x2={value.rootDistance}
            y1={value.min}
            y2={value.max}
          />
      ))}
    </>
  );
};

const App = () => {
  const exampleTree =
    "(ant:17, ((bat:31, cow:22):25, dog:22):10, (elk:33, fox:12):10);";
  const [newick, setNewick] = useState(exampleTree);

  const [tree, setTree] = useState<Tree | null>(null);

  const parseTree = () => {
    const lexer = new NewickLexer(newick);
    const parser = new NewickParser(lexer.lex());
    const parsedTree = parser.parseTree();
    setTree(parsedTree);
    parsedTree
      ?.getLeafNodes()
      .forEach((leaf) =>
        console.log(
          leaf.id,
          leaf.label,
          leaf.branchLength,
          leaf.isRoot(),
          leaf.isLeaf(),
          leaf.getDistanceToRoot()
        )
      );
  };
  return (
    <>
      <div>
        <div>
          Enter a newick tree:{" "}
          <input
            value={newick}
            onChange={(event) => setNewick(event.target.value)}
          />
          <button onClick={parseTree}>Submit</button>
        </div>
        <div
          id="svg-container-1"
          className="svg-container"
          style={{ height: "600px", width: "100%" }}
        >
          <SvgDimensionsProvider>
            {tree ? <Phylogeny tree={tree} /> : null}
          </SvgDimensionsProvider>
        </div>
      </div>
    </>
  );
};

export default App;
