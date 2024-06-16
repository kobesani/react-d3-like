import { useState } from "react";
import { NewickParser } from "../utils/Tree/Parser";
import { NewickLexer } from "../utils/Tree/Lexer";
import { Tree } from "../utils/Tree/Tree";

import SvgDimensionsProvider from "../components/Providers/SvgDimensionsProvider";
import { useSvgDimensions } from "../hooks/SvgDimensions";

interface PhylogenyProps {
  tree: Tree;
}

const Phylogeny = ({ tree }: PhylogenyProps) => {
  const { width, height } = useSvgDimensions();

  const leafNodes = tree.getLeafNodes();
  const stepSize = height / leafNodes.length;
  const padding = 20;
  const values = tree.getLeafNodes().map((node, index) => ({
    id: node.id,
    label: node.label,
    y: index * stepSize + padding,
  }));

  return (
    <>
      {values.map((value) => (
        <text
          textAnchor="middle"
          fontSize={16}
          dominantBaseline="middle"
          fill="white"
          key={value.id}
          x={padding}
          y={value.y}
        >
          {value.label}
        </text>
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
    setTree(parser.parseTree());
    tree
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
