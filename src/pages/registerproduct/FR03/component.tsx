import {
  ReactFlow,
  Background,
  Controls,
  type Node,
  type Edge,
  Handle,
  Position,
  //   type ReactFlowInstance,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import useViewModel from "./viewModel";
export const FR03Summary = () => {
  const { processData } = useViewModel();
  return (
    <div className="bg-gradient-to-r from-secondary-2 to-primary-1 to-60% w-full rounded-3xl my-10 relative shadow-inner p-10 max-w-5xl mx-auto">
      <FlowChart data={processData.map((data) => data.process_name)} />
    </div>
  );
};
// export const TreeGraph = (props: TreeGraphType) => {
//   const nodeTypes = {
//     custom: CustomNode, // Register the custom node type
//   };

//   const [nodes, setNodes] = useNodesState<any>([]);
//   const [edges, setEdges] = useEdgesState<any>([]);
//   useEffect(() => {
//     setNodes(props.NodeData.map((node) => ({ ...node, draggable: false })));
//   }, [props.NodeData]);

//   // Update edges when EdgesData changes
//   useEffect(() => {
//     setEdges(props.EdgesData);
//   }, [props.EdgesData]);

//   return (
//     <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView>
//       <Controls position="top-right" />
//     </ReactFlow>
//   );
// };

// type CardProps = {
//   data:
//     | TreeGraphMaterialTypes
//     | TreeGraphOutputTypes
//     | TreeGraphWasteTypes
//     | TreeGraphStepType;
// };

// export const Card: React.FC<CardProps> = ({ data }) => {
//   // Type guards for different data types
//   const isStepType = (d: any): d is TreeGraphStepType =>
//     d.datatype === "header";
//   const isMaterialType = (d: any): d is TreeGraphMaterialTypes =>
//     d.datatype === "input";
//   const isOutputType = (d: any): d is TreeGraphOutputTypes =>
//     d.datatype === "output";
//   const isWasteType = (d: any): d is TreeGraphWasteTypes =>
//     d.datatype === "waste";

//   return (
//     <div className="bg-white py-4 px-5 rounded-2xl w-80 shadow-lg">
//       <div>
//         <h4 className="text-lg font-semibold text-secondary-2">
//           {isStepType(data)
//             ? data.header
//             : isMaterialType(data)
//             ? data.material.name
//             : isOutputType(data) || isWasteType(data)
//             ? data.name
//             : ""}
//         </h4>
//       </div>
//       <hr className="border-1 my-2" />
//       <div>
//         <h3 className="font-bold text-2xl text-gradient gradient-secondary">
//           {isMaterialType(data)
//             ? data.material.amount + " " + data.material.unit
//             : isOutputType(data)
//             ? data.amount + " " + data.unit
//             : isWasteType(data)
//             ? data.amount + " " + data.unit
//             : ""}
//         </h3>
//         {/* Example table, adjust as needed for your data */}
//         {(isMaterialType(data) || isOutputType(data) || isWasteType(data)) && (
//           <table className="w-full">
//             <tbody>
//               {/* You can add more rows depending on your data structure */}
//               <tr>
//                 <td>Type</td>
//                 <td className="text-end">
//                   {isMaterialType(data)
//                     ? data.material.type
//                     : isOutputType(data)
//                     ? data.type
//                     : isWasteType(data)
//                     ? data.type
//                     : ""}
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };
// export type NodeType = {
//   id: string | number;
//   type: string;
//   position: { x: number; y: number };
//   data:
//     | TreeGraphMaterialTypes
//     | TreeGraphOutputTypes
//     | TreeGraphWasteTypes
//     | TreeGraphStepType;
// };
// export type EdgesType = {
//   type: string;
//   source: string | number;
//   target: string | number;
//   id: string | number;
// };
// export const CustomNode = ({
//   data,
// }: {
//   data:
//     | TreeGraphMaterialTypes
//     | TreeGraphOutputTypes
//     | TreeGraphWasteTypes
//     | TreeGraphStepType;
// }) => {
//   return (
//     <div>
//       <Card data={data} />
//       <Handle type="target" position={Position.Top} />
//       <Handle type="source" position={Position.Bottom} />
//     </div>
//   );
// };

// type TreeGraphType = {
//   NodeData: NodeType[];
//   EdgesData: EdgesType[];
// };

// export type TreeGraphMaterialTypes = {
//   datatype: "input";
//   material: {
//     name: string;
//     unit: string;
//     amount: number;
//     type: string;
//   };
//   energy: {
//     name: string;
//     unit: string;
//     amount: number;
//     type: string;
//   };
//   other: {
//     name: string;
//     unit: string;
//     amount: number;
//     type: string;
//   };
// };
// export type TreeGraphOutputTypes = {
//   datatype: "output";
//   name: string;
//   unit: string;
//   amount: number;
//   type: string;
// };
// export type TreeGraphWasteTypes = {
//   datatype: "waste";
//   name: string;
//   unit: string;
//   amount: number;
//   type: string;
// };
// export type TreeGraphStepType = {
//   datatype: "header";
//   order: number;
//   header: string;
// };

// export type TreeNode = {
//   type: "node";
//   data:
//     | TreeGraphMaterialTypes
//     | TreeGraphOutputTypes
//     | TreeGraphWasteTypes
//     | TreeGraphStepType;
//   name: string;
//   children: Tree[];
// };

// export type TreeLeaf = {
//   type: "leaf";
//   name: string;
//   data:
//     | TreeGraphMaterialTypes
//     | TreeGraphOutputTypes
//     | TreeGraphWasteTypes
//     | TreeGraphStepType;
// };

// export type Tree = TreeNode | TreeLeaf;
const FlowChart = (props: { data: string[] }) => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const verticalGap = 200;
  const horizontalOffset = 200;

  props.data.forEach((label, index) => {
    const id = `main-${index}`;
    const x = 0;
    const y = index * verticalGap;

    // Main node
    nodes.push({
      id,
      position: { x, y },
      data: { label },
      type: "default",
    });

    // Left (input) node
    const leftId = `input-${index}`;
    nodes.push({
      id: leftId,
      position: { x: x - horizontalOffset, y: y },
      data: { label: `input_${index}` },
      type: "input",
    });
    edges.push({
      id: `e-${leftId}-${id}`,
      source: leftId,
      target: id,
      type: "smoothstep",
    });

    const rightId = `waste-${index}`;
    nodes.push({
      id: rightId,
      position: { x: x + horizontalOffset, y: y },
      data: { label: `waste${index}` },
      type: "waste",
    });
    edges.push({
      id: `e-${id}-${rightId}`,
      source: rightId,
      target: id,
      type: "smoothstep",
    });

    // Right (output) node
    const middleId = `output-${index}`;
    nodes.push({
      id: middleId,
      position: { x: x + horizontalOffset, y: y + verticalGap / 2 },
      data: { label: `output_${index}` },
      type: "default",
    });
    edges.push({
      id: `e-${id}-${middleId}`,
      source: id,
      target: middleId,
      type: "default",
    });
    edges.push({
      id: `e-${id}-${middleId}-next`,
      source: middleId,
      target: `main-${index + 1}`,
      type: "default",
    });

    // Main vertical edge (to next node)
    if (index < props.data.length - 1) {
      const nextId = `main-${index + 1}`;
      edges.push({
        id: `e-${id}-${nextId}`,
        source: id,
        target: nextId,
        type: "smoothstep",
      });
    }
  });
  const nodeTypes = {
    custom: CustomNode,
  };
  return (
    <div style={{ width: "100%", height: "700px" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        defaultViewport={{ x: 350, y: 100, zoom: 1.3 }}
        nodeTypes={nodeTypes}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

const CustomNode = ({ data }: any) => {
  return (
    <div className="bg-white border border-black rounded px-4 py-2 text-center shadow">
      {/* Four connection points */}
      <Handle type="target" position={Position.Top} />
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
      <Handle type="source" position={Position.Bottom} />

      <div>{data.label}</div>
    </div>
  );
};
