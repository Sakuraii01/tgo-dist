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
  const [loading, setLoading] = useState(false);
  const [pdflink, setPdflink] = useState("");

  const processService = new ProcessService();
  const inputProcessService = new InputProcessService();
  const outputProcessService = new OutputProcessService();
  const wasteProcessService = new WasteProcessService();

  const handleOnSubmitFR03Item = async (
    entity: any,
    type: "input" | "intermediate" | "waste",
    processId: number,
    dataId?: number,
    isUpdate?: boolean,
    isChangeCategory?: boolean
  ) => {
    setLoading(true);
    if (isChangeCategory && dataId) {
      handleDeleteFR03Item(type, dataId);
    }
    if (!isChangeCategory) {
      if (isUpdate) {
        if (type === "input") {
          console.log(processId);

          await inputProcessService
            .reqPutInputProcessByID(dataId || 0, {
              process_id: processId,
              input_cat_id: entity.materialType,
              input_title_id:
                entity.materialType === 7
                  ? 1
                  : entity.materialType === 8
                  ? 3
                  : entity.materialType === 9
                  ? 2
                  : 0,
              input_name: entity.itemName,
              input_unit: entity.unit,
              input_quantity: entity.amount,
              chemical_reaction: 0,
            } as InputProcessType)
            .then((response) => {
              console.log("Input process updated:", response);
            })
            .catch((error) => {
              console.log(error);
            })
            .finally(() => {
              window.location.reload();
            });
        } else if (type === "intermediate") {
          await outputProcessService
            .reqPutOutputProcessByID(dataId || 0, {
              process_id: processId,
              output_cat_id: 2,
              output_name: entity.itemName,
              output_unit: entity.unit,
              output_quantity: entity.amount,
              finish_output: entity.isLastProduct,
              packaging_output: entity.sumPackage,
            } as OutputProcessType)
            .then((response) => {
              console.log("Output process updated:", response);
            })
            .catch((error) => {
              console.log(error);
            })
            .finally(() => {
              window.location.reload();
            });
        } else if (type === "waste") {
          await wasteProcessService
            .reqPutWasteProcessByID(dataId || 0, entity as WasteProcessType)
            .then((response) => {
              console.log("Waste process updated:", response);
            })
            .catch((error) => {
              console.log(error);
            })
            .finally(() => {
              window.location.reload();
            });
        } else {
          console.error("Invalid type");
        }
        return;
      }
    }

    if (type === "input") {
      await inputProcessService
        .reqPostInputProcess({
          process_id: processId,
          input_cat_id: entity.materialType,
          input_title_id:
            entity.materialType === 7
              ? 1
              : entity.materialType === 8
              ? 3
              : entity.materialType === 9
              ? 2
              : 0,
          input_name: entity.itemName,
          input_unit: entity.unit,
          input_quantity: entity.amount,
          chemical_reaction: 0,
        } as InputProcessType)
        .then((response) => {
          console.log("New input process added:", response);
        })
        .finally(() => {
          window.location.reload();
        });
    } else if (type === "intermediate") {
      await outputProcessService
        .reqPostOutputProcess({
          process_id: processId,
          output_cat_id: 2,
          output_name: entity.itemName,
          output_unit: entity.unit,
          output_quantity: entity.amount,
          finish_output: entity.isLastProduct || false,
          packaging_output: entity.sumPackage || false,
        })
        .then((response) => {
          console.log("New output process added:", response);
        })
        .catch((error) => {
          console.error("Error adding output process:", error);
        })
        .finally(() => {
          window.location.reload();
        });
    } else if (type === "waste") {
      console.log(entity);

      await wasteProcessService
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
        })
        .catch((error) => {
          console.error("Error adding waste process:", error);
        })
        .finally(() => {
          window.location.reload();
        });
    } else {
      console.error("Invalid type");
    }
  };
  const handleDeleteFR03Item = async (type: string, item_id: number) => {
    await processService
      .reqDeleteItemCategory(type, item_id)
      .then((response) => {
        console.log("Item deleted:", response);
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      })
      .finally(() => {
        window.location.reload();
      });
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

  const handleChangeOrder = async (newOrder: string[]) => {
    const newProcessData = newOrder.map((id, index) => {
      const item = processData.find((p) => String(p.ordering) === id)!;
      return { ...item, ordering: index + 1 };
    });

    setProcessId(newOrder);
    setProcessData(newProcessData);
    newProcessData.map(async (data) => {
      await processService.reqPutProcessByID(data.process_id, {
        ordering: data.ordering,
        process_name: data.process_name,
      });
    });
    // console.log(newProcessData);
  };
  const handelAddProcess = async (ordering: number, newProcess: string) => {
    setLoading(true);
    await processService
      .reqPostProcess({
        product_id: id,
        ordering: ordering,
        process_name: newProcess,
        mass_balanced: 1,
      })
      .then((response) => {
        console.log("New process added:", response);
      })
      .catch((error) => {
        console.error("Error adding process:", error);
      })
      .finally(() => {
        window.location.reload();
      });
  };
  const handleUpdateProcess = async (
    processId: number,
    updatedProcess: string
  ) => {
    setLoading(true);
    await processService
      .reqPutProcessByID(processId, {
        process_name: updatedProcess,
      })
      .then((response) => {
        console.log("Process updated:", response);
      })
      .catch((error) => {
        console.error("Error updating process:", error);
      })
      .finally(() => {
        window.location.reload();
      });
  };
  const handleDeleteProcess = async (processId: number) => {
    setLoading(true);
    await processService
      .reqDeleteProcessByID(processId)
      .then((response) => {
        console.log("Process deleted:", response);
      })
      .catch((error) => {
        console.error("Error deleting process:", error);
      })
      .finally(() => {
        window.location.reload();
      });
  };
  const fetchPDFExcel = async () => {
    await processService
      .reqGetPDFExcel(id)
      .then((data) => {
        setPdflink(data[0].path_excel_fr03);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const fetchProcess = async () => {
    setLoading(true);

    await processService
      .reqGetProcess(id)
      .then((data) => {
        setProcessData(data);
        setProcessId(data?.map((data) => data.ordering.toString()));
        new Promise((resolve) => setTimeout(resolve, 1000));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProcess();
    fetchPDFExcel();
  }, []);
  // useEffect(() => {}, [processId]);

  return {
    processData,
    processId,
    expandedItems,
    tab,
    loading,
    pdflink,
    handleTabChange,
    toggleExpanded,
    handleChangeOrder,
    handelAddProcess,
    handleDeleteProcess,
    handleUpdateProcess,
    handleOnSubmitFR03Item,
    handleDeleteFR03Item,
  };
};
export default useViewModel;
