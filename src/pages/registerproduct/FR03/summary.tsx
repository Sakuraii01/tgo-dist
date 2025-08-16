import {
  ReactFlow,
  Background,
  Controls,
  type Node,
  type Edge,
  Handle,
  Position,
} from "@xyflow/react";
import type { ProcessType } from "../../../service/api/fr03/type";
import "@xyflow/react/dist/style.css";
import { useSearchParams } from "react-router-dom";
import useViewModel from "./viewModel";
export const FR03Summary = () => {
  const [searchParams] = useSearchParams();
  const id = Number(searchParams.get("id"));
  const { processData } = useViewModel(id);

  return (
    <div className="bg-gradient-to-r from-secondary-2 to-primary-1 to-60% w-full rounded-3xl my-10 relative shadow-inner p-10 max-w-5xl mx-auto">
      <FlowChart data={processData} />
    </div>
  );
};

const FlowChart = (props: { data: ProcessType[] }) => {
  const position = { x: 0, y: 0 };

  const nodes: Node[] = [];
  const edges: Edge[] = [];
  // const verticalGap = 500;
  // const horizontalOffset = 500;

  props.data.forEach((data, index) => {
    const id = `main-${index}`;
    // const x = 0;
    // const y = index * verticalGap;

    // Main node
    nodes.push({
      id,
      position: position,
      data: { label: data.process_name, ordering: index + 1, data: [] },
      type: "custom",
    });

    // Left (input) node
    const leftId = `input-${index}`;
    nodes.push({
      id: leftId,
      position: position,
      data: { label: `input_${index}`, type: "input", data: data.input },
      type: "custom",
    });

    edges.push({
      id: `e-${leftId}-${id}`,
      source: leftId,
      target: id,
      type: "straight",
    });

    // waste (output) node
    const rightId = `waste-${index}`;
    nodes.push({
      id: rightId,
      position: position,
      data: { label: `waste${index}`, type: "output", data: data.waste },
      type: "custom",
    });
    edges.push({
      id: `e-${id}-${rightId}`,
      source: rightId,
      target: id,
      sourceHandle: "left",
      targetHandle: "right",
      type: "straight",
    });

    // intermediaet (output) node
    const intermediateId = `intermediate-${index}`;
    nodes.push({
      id: intermediateId,
      position: position,
      data: {
        label: `output_${index}`,
        type: "intermediate",
        data: data.output,
      },
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
        type: "straight",
      });
    }
    edges.push({
      id: `e-${intermediateId}-${id}`,
      source: id,
      target: intermediateId,
      sourceHandle: "bottom",
      targetHandle: "top",
      type: "straight",
    });
  });

  const nodeTypes = { custom: CustomNode };
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
                item:
                  data?.data
                    ?.filter((item: any) => item.input_title === "วัตถุดิบ")
                    ?.map((item: any) => ({
                      item_name: item.input_name,
                      unit: item.input_unit,
                      amount: item.input_quantity,
                    })) ?? [],
              },
              {
                name: "ทรัพยากร และวัสดุช่วยการผลิต",
                item:
                  data?.data
                    ?.filter(
                      (item: any) =>
                        item.input_title === "ทรัพยากร" ||
                        item.input_title === "วัสดุช่วยการผลิต"
                    )
                    ?.map((item: any) => ({
                      item_name: item.input_name,
                      unit: item.input_unit,
                      amount: item.input_quantity,
                    })) ?? [],
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
                name: "ผลิตภัณฑ์ร่วม",
                item:
                  data?.data
                    ?.filter(
                      (item: any) => item.waste_cat_name === "ผลิตภัณฑ์ร่วม"
                    )
                    ?.map((item: any) => ({
                      item_name: item.waste_name,
                      unit: item.waste_unit,
                      amount: item.waste_qty,
                    })) ?? [],
              },
              {
                name: "ของเสีย",
                item:
                  data?.data
                    ?.filter((item: any) => item.waste_cat_name === "ของเสีย")
                    ?.map((item: any) => ({
                      item_name: item.waste_name,
                      unit: item.waste_unit,
                      amount: item.waste_qty,
                    })) ?? [],
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
                name: "ผลิตภัณฑ์",
                item:
                  data?.data?.map((item: any) => ({
                    item_name: item.output_name,
                    unit: item.output_unit,
                    amount: item.output_quantity,
                  })) ?? [],
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
