import { getNgoById } from "../../components/api/Auth";
import { SET_NGO } from "../Slices/ngoSlices";

export const setNgoData = (id, dispatch) => {
  getNgoById(id)
    .then((res) => {
      let data = res;
      dispatch(
        SET_NGO({
          data,
        })
      );
    })

    .catch((err) => {
      console.log("Error in setting ngo data in redux", err);
    });
};
