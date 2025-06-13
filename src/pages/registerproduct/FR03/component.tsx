import React from "react";
import {
  ReactFlow,
  Background,
  Controls,
  type Node,
  type Edge,
  type ReactFlowInstance,
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
  const nodes: Node[] = props.data.map((label, index) => ({
    id: String(index),
    position: { x: 250, y: index * 150 },
    data: { label },
    type: "default",
  }));

  const edges: Edge[] = props.data.slice(1).map((_, index) => ({
    id: `e${index}-${index + 1}`,
    source: String(index),
    target: String(index + 1),
    type: "smoothstep",
  }));

  return (
    <div style={{ width: "100%", height: "700px" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        defaultViewport={{ x: 0, y: 15, zoom: 1.5 }}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};
