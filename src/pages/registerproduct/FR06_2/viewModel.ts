import { Fr06Service } from "../../../service/api/fr06";
import { useEffect, useState } from "react";
import type { FR06_2Report } from "../../../service/api/fr06/type";
const useViewModel = (id: number) => {
  const [fr06Data, setFr06Data] = useState<FR06_2Report>();

  const fr06Service = new Fr06Service();
  const handleFormSubmit = (entity: FR06_2Report) => {
    if (fr06Data?.std_emission) {
      fr06Service
        .reqPutFr06_2(entity, fr06Data.report62_sum_id)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      fr06Service
        .reqPostFr06_2(entity)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  useEffect(() => {
    fr06Service
      .reqGetFr06_2(id)
      .then((res) => {
        setFr06Data(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return { fr06Data, handleFormSubmit };
};
export default useViewModel;
