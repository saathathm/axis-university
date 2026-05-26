import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CreateFaculty from "./CreateFaculty";
import { getFacultyDetails } from "../../../features/faculty/facultyActions";

const EditFaculty = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const { faculty = null } = useSelector((state) => state.facultyState);

  useEffect(() => {
    dispatch(getFacultyDetails(id));
  }, [dispatch, id]);

  return <CreateFaculty faculty={faculty} isEdit />;
};

export default EditFaculty;
