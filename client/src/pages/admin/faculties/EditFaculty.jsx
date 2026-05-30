import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CreateFaculty from "./CreateFaculty";
import { getFacultyDetails } from "../../../features/faculty/facultyActions";
import LoadingSpinner from "../../../components/widgets/LoadingSpinner";

const EditFaculty = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const { faculty = null } = useSelector(
    (state) => state.facultyState,
  );

  useEffect(() => {
    dispatch(getFacultyDetails(id));
  }, [dispatch, id]);

  if (!faculty?.id) {
    return <LoadingSpinner />;
  }

  return <CreateFaculty faculty={faculty} isEdit />;
};

export default EditFaculty;
