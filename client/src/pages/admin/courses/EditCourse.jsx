import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import CreateCourse from "./CreateCourse";

import { getCourseDetails } from "../../../features/course/courseActions";

import LoadingSpinner from "../../../components/widgets/LoadingSpinner";

const EditCourse = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const { course = null } = useSelector((state) => state.courseState);

  useEffect(() => {
    dispatch(getCourseDetails(id));
  }, [dispatch, id]);

  if (!course?.id) {
    return <LoadingSpinner />;
  }

  return <CreateCourse course={course} isEdit />;
};

export default EditCourse;
