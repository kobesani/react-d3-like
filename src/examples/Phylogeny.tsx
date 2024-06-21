import { useState } from "react";
import { NewickParser } from "../utils/Tree/Parser";
import { NewickLexer } from "../utils/Tree/Lexer";
import { Node, Tree } from "../utils/Tree/Tree";

import SvgDimensionsProvider from "../components/Providers/SvgDimensionsProvider";
import { useSvgDimensions } from "../hooks/SvgDimensions";
import { useLinearScale } from "../hooks/Axis";
import NodeLayout from "../components/Shapes/Node";
import { useLongestSvgText } from "../hooks/SvgText";

interface PhylogenyDefaults {
  rootBranchLength: number;
  nodeLabelPadding: number;
  paddingLeft: number;
  paddingRight: number;
  paddingTop: number;
  paddingBottom: number;
}

interface PhylogenyProps {
  tree: Tree;
  defaults?: PhylogenyDefaults;
}

const Phylogeny = ({
  tree,
  defaults = {
    rootBranchLength: 1,
    nodeLabelPadding: 5,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
}: PhylogenyProps) => {
  const maxLabelLength = useLongestSvgText({
    textsToRender: tree
      .getAllNodes("preorder")
      .filter((node) => node.label !== undefined)
      .map((node) => node.label!), // definitely defined because the undefined are filtered!
    fontSize: 16,
  });

  console.log(`MAXLABELLENGTH: ${maxLabelLength}`);
  const { width, height } = useSvgDimensions();

  const leafNodes = tree.getLeafNodes();

  // prepping horizontal axis domain and range
  // add a little space for a small piece of branch for the root
  const domainLowerBound = -defaults.rootBranchLength;
  const domainUpperBound = tree.getMaxDistanceToRoot();
  const rangeLowerBound = defaults.paddingLeft;
  // adjusting upper bound for adding node labels for the leaf nodes
  // leaves maximum space for a label, plus default padding and node label padding between tips
  const rangeUpperBound =
    width -
    (defaults.paddingRight + defaults.nodeLabelPadding + maxLabelLength);

  const horizontalAxisMapping = useLinearScale({
    domain: [domainLowerBound, domainUpperBound],
    range: [rangeLowerBound, rangeUpperBound],
  });

  const verticalAxisMapping = useLinearScale({
    domain: [0, leafNodes.length],
    range: [defaults.paddingTop, height - defaults.paddingBottom],
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
            defaultBranchLength={defaults.rootBranchLength}
            nodeLabelPadding={defaults.nodeLabelPadding}
          />
        ))}
      </g>
    </>
  );
};

const App = () => {
  const exampleTree =
    "(ant:17, ((bat:31, cow:22):25, dog:22):10, ((elk:33, fox:12):10, giraffe:15):11);";
  const [newick, setNewick] = useState(exampleTree);

  const [tree, setTree] = useState<Tree | null>(null);

  const parseTree = () => {
    const lexer = new NewickLexer(newick);
    const parser = new NewickParser(lexer.lex());
    const parsedTree = parser.parseTree();
    setTree(parsedTree);
    parsedTree
      ?.getAllNodes("preorder")
      .forEach((node) =>
        console.log(
          node.id,
          node.label,
          node.branchLength,
          node.isRoot(),
          node.isLeaf(),
          node.getDistanceToRoot()
        )
      );
  };
  return (
    <>
      <div>
        <div style={{ color: "white" }}>
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
