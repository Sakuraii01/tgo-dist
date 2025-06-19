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
      type: "custom",
    });

    // Left (input) node
    const leftId = `input-${index}`;
    nodes.push({
      id: leftId,
      position: { x: x - horizontalOffset, y: y },
      data: { label: `input_${index}`, type: "input" },
      type: "custom",
    });

    edges.push({
      id: `e-${leftId}-${id}`,
      source: leftId,
      target: id,
      type: "smoothstep",
    });

    // waste (output) node
    const rightId = `waste-${index}`;
    nodes.push({
      id: rightId,
      position: { x: x + horizontalOffset * 2, y: y },
      data: { label: `waste${index}`, type: "output" },
      type: "custom",
    });
    edges.push({
      id: `e-${id}-${rightId}`,
      source: rightId,
      target: id,
      type: "smoothstep",
    });

    // intermediaet (output) node
    const intermediateId = `intermediate-${index}`;
    nodes.push({
      id: intermediateId,
      position: { x: x, y: y + verticalGap / 2 },
      data: { label: `output_${index}`, type: "intermediate" },
      type: "custom",
    });

    // Main vertical edge (to next node)
    if (index - 1 >= 0) {
      const prevMiddleId = `intermediate-${index - 1}`;
      edges.push({
        id: `e-${id}-${prevMiddleId}`,
        source: id,
        target: prevMiddleId,
        sourceHandle: "top",
        targetHandle: "bottom",
        type: "smoothstep",
      });
    }
    edges.push({
      id: `e-${intermediateId}-${id}`,
      source: id,
      target: intermediateId,
      sourceHandle: "bottom",
      targetHandle: "top",
      type: "smoothstep",
    });
  });
  const nodeTypes = {
    custom: CustomNode,
  };
  return (
    <div style={{ width: "100%", height: "700px" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        defaultViewport={{ x: 350, y: 100, zoom: 1 }}
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
    <div className="bg-white border border-black rounded px-4 py-2 text-center shadow relative">
      {data.type === "input" && (
        <Handle type="source" position={Position.Right} id="right" />
      )}
      {data.type === "output" && (
        <Handle type="source" position={Position.Left} id="left" />
      )}
      {data.type === "intermediate" && (
        <>
          <Handle type="target" position={Position.Top} id="top" />
          <Handle type="target" position={Position.Bottom} id="bottom" />
        </>
      )}
      {(!data.type || data.type === "main") && (
        <>
          <Handle type="target" position={Position.Left} id="left" />
          <Handle type="target" position={Position.Right} id="right" />
          <Handle type="source" position={Position.Top} id="top" />
          <Handle type="source" position={Position.Bottom} id="bottom" />
        </>
      )}
      <div>{data.label}</div>
    </div>
  );
};
