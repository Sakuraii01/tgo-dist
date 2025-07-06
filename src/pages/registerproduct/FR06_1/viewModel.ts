import { Fr06Service } from "../../../service/api/fr06";
import { useEffect, useState } from "react";
import type { FR06Report } from "../../../service/api/fr06/type";
const useViewModel = (id: number) => {
  const [fr06Data, setFr06Data] = useState<FR06Report>();
  const fr06Service = new Fr06Service();
  const handleSubmit = (entity: FR06Report) => {
    if (fr06Data?.lc1_based_emission) {
      fr06Service
        .reqPutFr06_1(entity, fr06Data.report61_sum_id)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      fr06Service
        .reqPostFr06_1(entity)
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
      .reqGetFr06_1(id)
      .then((res) => {
        setFr06Data(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return { fr06Data, handleSubmit };
};
export default useViewModel;
