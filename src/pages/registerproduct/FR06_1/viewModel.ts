import { Fr06Service } from "../../../service/api/fr06";
import { useEffect, useState } from "react";
import type { FR06Report, FR06_1Sum4142 } from "../../../service/api/fr06/type";
import { useNavigate } from "react-router-dom";
import { PROTECTED_PATH } from "../../../constants/path.route";
const useViewModel = (id: number) => {
  const [fr06Data, setFr06Data] = useState<FR06Report>();
  const [fr06Sum4142, setFr06Sum4142] = useState<FR06_1Sum4142>();
  const fr06Service = new Fr06Service();
  const navigate = useNavigate();
  const handleSubmit = (report_id: number, entity: FR06Report) => {
    if (report_id) {
      fr06Service
        .reqPutFr06_1({ ...entity, report61_sum_id: report_id }, report_id)
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
    navigate(
      PROTECTED_PATH.REGISTER_PRODUCT_FR06_2 + `?id=${entity.product_id}`
    );
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
    fr06Service
      .reqGetFr06_1Sum4142(id)
      .then((res) => {
        setFr06Sum4142(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return { fr06Data, handleSubmit, fr06Sum4142 };
};
export default useViewModel;
