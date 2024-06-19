import { useState } from "react";
import { NewickParser } from "../utils/Tree/Parser";
import { NewickLexer } from "../utils/Tree/Lexer";
import { Node, Tree } from "../utils/Tree/Tree";

import SvgDimensionsProvider from "../components/Providers/SvgDimensionsProvider";
import { useSvgDimensions } from "../hooks/SvgDimensions";
import { useLinearScale } from "../hooks/Axis";
import NodeLayout from "../components/Shapes/Node";

interface PhylogenyProps {
  tree: Tree;
}

const Phylogeny = ({ tree }: PhylogenyProps) => {
  const { width, height } = useSvgDimensions();

  const treeWidth = tree.getMaxDistanceToRoot();
  const leafNodes = tree.getLeafNodes();
  const padding = 20;

  const horizontalAxisMapping = useLinearScale({
    domain: [0, treeWidth],
    range: [padding, width - padding],
  });

  const verticalAxisMapping = useLinearScale({
    domain: [0, leafNodes.length],
    range: [padding, height - padding],
  });

  const leafNodesToIndex = new Map<Node, number>(
    leafNodes.map((node, index) => [node, index])
  );

  return (
    <>
      <g>
        {tree.getAllNodes("preorder").map((node, index) => (
          <NodeLayout
            key={index}
            node={node}
            verticalAxisMapping={verticalAxisMapping}
            horizontalAxisMapping={horizontalAxisMapping}
            leafNodeIndexMap={leafNodesToIndex}
          />
        ))}
      </g>
    </>
  );
};

const App = () => {
  const exampleTree =
    "(ant:17, ((bat:31, cow:22):25, dog:22):10, (giraffe:15, (elk:33, fox:12):10):11);";
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
