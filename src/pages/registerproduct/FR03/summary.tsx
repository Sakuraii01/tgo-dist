import {
  ReactFlow,
  Background,
  Controls,
  type Node,
  type Edge,
  Handle,
  Position,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { useSearchParams } from "react-router-dom";
import useViewModel from "./viewModel";
export const FR03Summary = () => {
  const [searchParams] = useSearchParams();
  const id = Number(searchParams.get("id"));
  const { processData } = useViewModel(id);
  return (
    <div className="bg-gradient-to-r from-secondary-2 to-primary-1 to-60% w-full rounded-3xl my-10 relative shadow-inner p-10 max-w-5xl mx-auto">
      <FlowChart data={processData.map((data) => data.process_name)} />
    </div>
  );
};
const FlowChart = (props: { data: string[] }) => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const verticalGap = 500;
  const horizontalOffset = 500;

  props.data.forEach((label, index) => {
    const id = `main-${index}`;
    const x = 0;
    const y = index * verticalGap;

    // Main node
    nodes.push({
      id,
      position: { x: x + 135, y: y + 100 },
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
      type: "simplebezier",
    });

    // waste (output) node
    const rightId = `waste-${index}`;
    nodes.push({
      id: rightId,
      position: { x: x + horizontalOffset, y: y },
      data: { label: `waste${index}`, type: "output" },
      type: "custom",
    });
    edges.push({
      id: `e-${id}-${rightId}`,
      source: rightId,
      target: id,
      sourceHandle: "left",
      targetHandle: "right",
      type: "simplebezier",
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
        type: "simplebezier",
      });
    }
    edges.push({
      id: `e-${intermediateId}-${id}`,
      source: id,
      target: intermediateId,
      sourceHandle: "bottom",
      targetHandle: "top",
      type: "simplebezier",
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
        defaultViewport={{ x: 400, y: 100, zoom: 0.5 }}
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
    <div className="relative">
      {data.type === "input" && (
        <>
          <Handle type="source" position={Position.Right} id="right" />
          <NodeCard
            topic="สารขาเข้า"
            subtopic={[
              {
                name: "วัตถุดิบ",
                item: [],
              },
              {
                name: "ทรัพยากร และวัสดุช่วยการผลิต",
                item: [
                  {
                    item_name: "Ammonium Nitrate",
                    unit: "kg",
                    amount: "129",
                    type: "M",
                  },
                  {
                    item_name: "Diesel (ANFO)",
                    unit: "kg",
                    amount: "1510",
                    type: "M",
                  },
                ],
              },
            ]}
          />
        </>
      )}
      {data.type === "output" && (
        <>
          <Handle type="source" position={Position.Left} id="left" />
          <NodeCard
            topic="สารขาออก"
            subtopic={[
              {
                name: "ผลิตภัณฑ์",
                item: [
                  {
                    item_name: "Ammonium Nitrate",
                    unit: "kg",
                    amount: "129",
                    type: "M",
                  },
                  {
                    item_name: "Diesel (ANFO)",
                    unit: "kg",
                    amount: "1510",
                    type: "M",
                  },
                ],
              },
            ]}
          />
        </>
      )}
      {data.type === "intermediate" && (
        <>
          <Handle type="target" position={Position.Top} id="top" />
          <Handle type="target" position={Position.Bottom} id="bottom" />
          <NodeCard
            topic="ผลิตภัณฑ์ระหว่างทาง"
            subtopic={[
              {
                name: "ผลิตภัณฑ์ร่วม",
                item: [],
              },
              {
                name: "ของเสีย",
                item: [
                  {
                    item_name: "Ammonium Nitrate",
                    unit: "kg",
                    amount: "129",
                    type: "M",
                  },
                  {
                    item_name: "Diesel (ANFO)",
                    unit: "kg",
                    amount: "1510",
                    type: "M",
                  },
                  {
                    item_name: "Ammonium Nitrate",
                    unit: "kg",
                    amount: "129",
                    type: "M",
                  },
                ],
              },
            ]}
          />
        </>
      )}
      {(!data.type || data.type === "main") && (
        <>
          <Handle type="target" position={Position.Left} id="left" />
          <Handle type="target" position={Position.Right} id="right" />
          <Handle type="source" position={Position.Top} id="top" />
          <Handle type="source" position={Position.Bottom} id="bottom" />
          <TopicNodeCard topic={data.label} ordering={data.ordering} />
        </>
      )}
    </div>
  );
};

const NodeCard = ({
  topic,
  subtopic,
}: {
  topic: string;
  subtopic: {
    name: string;
    item: { item_name: string; unit: string; amount: string; type?: string }[];
  }[];
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3
        className={`text-lg font-semibold w-fit rounded text-white px-5 ${
          topic === "สารขาเข้า"
            ? "bg-[#76B273]"
            : topic === "ผลิตภัณฑ์ระหว่างทาง"
            ? "bg-[#FAB431]"
            : topic === "สารขาออก"
            ? "bg-[#F15A5A]"
            : "bg-primary"
        }`}
      >
        {topic}
      </h3>
      {subtopic.map((sub, index) => (
        <div key={index} className="mt-2">
          <h4 className="text-sm font-semibold bg-stroke px-2 rounded">
            {sub.name}
          </h4>
          <table className="text-sm border-separate border-spacing-2.5">
            <tbody>
              {sub.item[0] ? (
                sub?.item?.map((item, itemIndex) => (
                  <tr key={itemIndex}>
                    <td className="w-48">{item.item_name}</td>
                    <td className="w-10">{item.unit}</td>
                    <td className="w-10">{item.type}</td>
                    <td className="w-10">{item.amount} </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>
                    <p>-</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

const TopicNodeCard = ({
  topic,
  ordering,
}: {
  topic: string;
  ordering: number | string;
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">
        {ordering}.{topic}
      </h3>
    </div>
  );
};
