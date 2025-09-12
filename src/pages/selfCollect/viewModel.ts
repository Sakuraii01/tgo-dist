import { SelfCollectService } from "../../service/api/selfcollect";
import { useEffect, useState } from "react";
import type {
  SelfCollectListType,
  SelfCollectProcessEntityType,
} from "../../service/api/selfcollect/type";
import { UnitsDropdownService } from "../../service/api/dropdown";
import type { UnitsDrowpdownType } from "../../service/api/dropdown/type";
const useViewModel = () => {
  const selfCollectService = new SelfCollectService();
  const unitService = new UnitsDropdownService();
  const [selfcollectList, setSelfCollectList] = useState<SelfCollectListType[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [unitList, setUnitList] = useState<UnitsDrowpdownType[]>([]);

  const handleOnSubmitSelfCollectProcess = async (
    entity: SelfCollectProcessEntityType
  ) => {
    setLoading(true);
    if (entity.company_id === undefined) {
    } else {
      await selfCollectService
        .reqPostSelfCollectProcess(entity)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          window.location.reload();
        });
    }
    setLoading(false);
  };
  const fetchSelfCollectListData = async () => {
    setLoading(true);
    const data = await selfCollectService.reqGetSelfCollectList();
    setSelfCollectList(data);

    new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
  };
  useEffect(() => {
    fetchSelfCollectListData();
    unitService
      .reqGetUnits()
      .then((data) => {
        setUnitList(data || []);
      })
      .catch((err) => console.error(err));
  }, []);

  return {
    selfcollectList,
    handleOnSubmitSelfCollectProcess,
    loading,
    unitList,
  };
};
export default useViewModel;
