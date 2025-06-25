import {
  InputProcessService,
  OutputProcessService,
  WasteProcessService,
  ProcessService,
} from "../../../service/api/fr03";
import { useEffect, useState } from "react";
import type {
  ProcessType,
  InputProcessType,
  OutputProcessType,
  WasteProcessType,
} from "../../../service/api/fr03/type";

const useViewModel = (id: number) => {
  const [tab, setTab] = useState(1);
  const [processData, setProcessData] = useState<ProcessType[]>([]);
  const [processId, setProcessId] = useState<string[]>([]);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const processService = new ProcessService();
  const inputProcessService = new InputProcessService();
  const outputProcessService = new OutputProcessService();
  const wasteProcessService = new WasteProcessService();

  const handleOnSubmitFR03Item = (
    entity: any,
    type: "input" | "intermediate" | "waste",
    processId: number,
    dataId?: number,
    isUpdate?: boolean
  ) => {
    if (isUpdate) {
      if (type === "input") {
        inputProcessService
          .reqPutInputProcessByID(dataId || 0, {
            process_id: processId,
            // input_process_id: dataId,
            input_cat_id: entity.materialType,
            input_name: entity.itemName,
            input_unit: entity.unit,
            input_quantity: entity.amount,
            chemical_reaction: 0,
          } as InputProcessType)
          .then((response) => {
            console.log("Input process updated:", response);
            fetchProcess();
          });
      } else if (type === "intermediate") {
        outputProcessService
          .reqPutOutputProcessByID(dataId || 0, entity as OutputProcessType)
          .then((response) => {
            console.log("Output process updated:", response);
            fetchProcess();
          });
      } else if (type === "waste") {
        wasteProcessService
          .reqPutWasteProcessByID(dataId || 0, entity as WasteProcessType)
          .then((response) => {
            console.log("Waste process updated:", response);
            fetchProcess();
          });
      } else {
        console.error("Invalid type");
      }
    } else {
      if (type === "input") {
        inputProcessService
          .reqPostInputProcess({
            process_id: processId,
            input_cat_id: entity.materialType,
            input_name: entity.itemName,
            input_unit: entity.unit,
            input_quantity: entity.amount,
            chemical_reaction: 0,
          } as InputProcessType)
          .then((response) => {
            console.log("New input process added:", response);
            fetchProcess();
          });
      } else if (type === "intermediate") {
        outputProcessService
          .reqPostOutputProcess({
            process_id: processId,
            output_cat_id: 2,
            output_name: entity.itemName,
            output_unit: entity.unit,
            output_quantity: entity.amount,
            finish_output: entity.isLastProduct,
            packaging_output: entity.sumPackage,
          })
          .then((response) => {
            console.log("New output process added:", response);
            fetchProcess();
          });
      } else if (type === "waste") {
        console.log(entity);

        wasteProcessService
          .reqPostWasteProcess({
            process_id: processId,
            waste_cat_id: entity.materialType,
            waste_name: entity.itemName,
            waste_unit: entity.unit,
            waste_qty: entity.amount,
            life_cycle_phase: 0,
          })
          .then((response) => {
            console.log("New waste process added:", response);
            fetchProcess();
          });
      } else {
        console.error("Invalid type");
      }
    }
  };

  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) => {
      const isExpanded = prev.includes(id);
      return isExpanded
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id];
    });
  };
  const handleTabChange = (newValue: number) => {
    setTab(newValue);
  };

  const handleChangeOrder = (newOrder: string[]) => {
    const newProcessData = newOrder.map(
      (id) => processData.find((p) => String(p.ordering) === id)!
    );

    setProcessId(newOrder);
    setProcessData(newProcessData);
  };
  const handelAddProcess = (ordering: number, newProcess: string) => {
    processService
      .reqPostProcess({
        product_id: id,
        ordering: ordering,
        process_name: newProcess,
        mass_balanced: 1,
      })
      .then((response) => {
        console.log("New process added:", response);
        fetchProcess();
      });
  };
  const handleUpdateProcess = (processId: number, updatedProcess: string) => {
    processService
      .reqPutProcessByID(processId, {
        process_name: updatedProcess,
      })
      .then((response) => {
        console.log("Process updated:", response);
        fetchProcess();
      })
      .catch((error) => {
        console.error("Error updating process:", error);
      });
  };
  const handleDeleteProcess = (processId: number) => {
    processService
      .reqDeleteProcessByID(processId)
      .then((response) => {
        console.log("Process deleted:", response);
        fetchProcess();
      })
      .catch((error) => {
        console.error("Error deleting process:", error);
      });
  };
  const fetchProcess = async () => {
    const data = await processService.reqGetProcess(id);

    setProcessData(data);
    setProcessId(data?.map((data) => data.ordering.toString()));
  };

  useEffect(() => {
    fetchProcess();
  }, []);
  useEffect(() => {}, [processId]);

  return {
    processData,
    processId,
    expandedItems,
    tab,

    handleTabChange,
    toggleExpanded,
    handleChangeOrder,
    handelAddProcess,
    handleDeleteProcess,
    handleUpdateProcess,
    handleOnSubmitFR03Item,
  };
};
export default useViewModel;
