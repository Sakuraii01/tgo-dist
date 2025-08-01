import { SelfCollectService } from "../../service/api/selfcollect";
import { useEffect, useState } from "react";
import type {
  SelfCollectListType,
  SelfCollectProcessEntityType,
} from "../../service/api/selfcollect/type";
const useViewModel = () => {
  const selfCollectService = new SelfCollectService();
  const [selfcollectList, setSelfCollectList] = useState<SelfCollectListType[]>(
    []
  );
  const [loading, setLoading] = useState(false);

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
  }, []);

  return {
    selfcollectList,
    handleOnSubmitSelfCollectProcess,
    loading,
  };
};
export default useViewModel;
