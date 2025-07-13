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

  const handleOnSubmitSelfCollectProcess = async (
    entity: SelfCollectProcessEntityType
  ) => {
    if (entity.company_id === undefined) {
    } else {
      await selfCollectService
        .reqPostSelfCollectProcess(entity)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchSelfCollectListData();
  };
  const fetchSelfCollectListData = async () => {
    const data = await selfCollectService.reqGetSelfCollectList(1005);
    setSelfCollectList(data);
    console.log(data);
  };
  useEffect(() => {
    fetchSelfCollectListData();
  }, []);

  return {
    selfcollectList,
    handleOnSubmitSelfCollectProcess,
  };
};
export default useViewModel;
