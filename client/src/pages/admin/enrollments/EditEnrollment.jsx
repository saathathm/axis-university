import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CreateEnrollment from "./CreateEnrollment";
import { getEnrollmentEditData } from "../../../features/enrollment/enrollmentActions";
import LoadingSpinner from "../../../components/widgets/LoadingSpinner";

const EditEnrollment = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const { enrollmentEditData = null } = useSelector(
    (state) => state.enrollmentState,
  );

  useEffect(() => {
    dispatch(getEnrollmentEditData(id));
  }, [dispatch, id]);

  if (!enrollmentEditData?.enrollment?.id) {
    return <LoadingSpinner />;
  }

  return (
    <CreateEnrollment
      enrollment={enrollmentEditData.enrollment}
      students={enrollmentEditData.students}
      courses={enrollmentEditData.courses}
      isEdit
    />
  );
};

export default EditEnrollment;
