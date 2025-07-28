import { Fr06Service } from "../../../service/api/fr06";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PROTECTED_PATH } from "../../../constants/path.route";
import type { FR06_2Report } from "../../../service/api/fr06/type";
const useViewModel = (id: number) => {
  const [fr06Data, setFr06Data] = useState<FR06_2Report>();
  const [sum4142, setSum4142] = useState<number>();
  const navigate = useNavigate();
  const fr06Service = new Fr06Service();
  const handleFormSubmit = async (report_id: number, entity: FR06_2Report) => {
    if (report_id) {
      await fr06Service
        .reqPutFr06_2({ ...entity, report62_sum_id: report_id }, report_id)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      await fr06Service
        .reqPostFr06_2(entity)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    navigate(PROTECTED_PATH.PRODUCT_DETAIL + `?id=${entity.product_id}`);
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
    fr06Service
      .reqGetFr06_1Sum4142(id)
      .then((res) => {
        setSum4142(
          res.sum_lc1_emission +
            res.sum_lc2_emission +
            res.sum_lc3_emission +
            res.sum_lc4_emission +
            res.sum_lc5_emission
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return { fr06Data, handleFormSubmit, sum4142 };
};
export default useViewModel;
