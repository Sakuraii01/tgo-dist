import {
  //   OutputProcessService,
  //   InputProcessService,
  //   WasteProcessService,
  ProcessService,
} from "../../../service/api/fr03";
import { useEffect, useState } from "react";
import { type ProcessType } from "../../../service/api/fr03/type";

const useViewModel = () => {
  const [tab, setTab] = useState(1);
  const [processData, setProcessData] = useState<ProcessType[]>([]);
  const processService = new ProcessService();
  const [processId, setProcessId] = useState<string[]>([]);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
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
  const handleChangeOrder = (newArr: string[]) => {
    setProcessId(newArr);
  };
  const fetchProcess = async () => {
    const data = await processService.reqGetProcess(1005, 7);
    setProcessData(data);
    setProcessId(data.map((data) => data.process_id.toString()));
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
  };
};
export default useViewModel;
