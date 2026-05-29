import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CreateEnrollment from "./CreateEnrollment";
import { getEnrollmentDetails } from "../../../features/enrollment/enrollmentActions";
import LoadingSpinner from "../../../components/widgets/LoadingSpinner";

const EditEnrollment = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const { enrollment = null, loading } = useSelector(
    (state) => state.enrollmentState,
  );

  useEffect(() => {
    dispatch(getEnrollmentDetails(id));
  }, [dispatch, id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return <CreateEnrollment enrollment={enrollment} isEdit />;
};

export default EditEnrollment;
