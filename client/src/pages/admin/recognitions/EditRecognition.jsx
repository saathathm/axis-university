import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import LoadingSpinner from "../../../components/widgets/LoadingSpinner";
import { getRecognitionDetails } from "../../../features/recognition/recognitionActions";
import CreateRecognition from "./CreateRecognition";

const EditRecognition = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { recognition = null } = useSelector((state) => state.recognitionState);

  useEffect(() => {
    dispatch(getRecognitionDetails(id));
  }, [dispatch, id]);

  if (!recognition?.id) {
    return (
      <LoadingSpinner
        title="Loading recognition"
        description="Fetching the selected recognition record."
      />
    );
  }

  return <CreateRecognition recognition={recognition} isEdit />;
};

export default EditRecognition;