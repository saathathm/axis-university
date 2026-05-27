import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CreateStudent from "./CreateStudent";
import { getStudentDetails } from "../../../features/student/studentActions";
import LoadingSpinner from "../../../components/widgets/LoadingSpinner";

const EditStudent = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { student = null, loading } = useSelector(
    (state) => state.studentState,
  );

  useEffect(() => {
    dispatch(getStudentDetails(id));
  }, [dispatch, id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return <CreateStudent student={student} isEdit />;
};

export default EditStudent;
