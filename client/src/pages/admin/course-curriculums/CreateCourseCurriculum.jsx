import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import LoadingSpinner from "../../../components/widgets/LoadingSpinner";
import { getCourseDetails } from "../../../features/course/courseActions";
import { getCourseCurriculums } from "../../../features/courseCurriculum/courseCurriculumActions";
import CourseCurriculumForm from "./CourseCurriculumForm";

const CreateCourseCurriculum = () => {
  const dispatch = useDispatch();
  const { courseId } = useParams();

  const { course = null, loading: courseLoading } = useSelector(
    (state) => state.courseState,
  );
  const { curriculums = [], loading: curriculumLoading } = useSelector(
    (state) => state.courseCurriculumState,
  );

  const [ready, setReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setReady(false);

      await Promise.all([
        dispatch(getCourseDetails(courseId)),
        dispatch(getCourseCurriculums(courseId)),
      ]);

      if (isMounted) {
        setReady(true);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [dispatch, courseId]);

  if (courseLoading || curriculumLoading || !ready) {
    return <LoadingSpinner title="Loading course" description="Preparing the curriculum form for this course." />;
  }

  return (
    <CourseCurriculumForm
      course={course}
      courseId={courseId}
      curriculums={curriculums}
    />
  );
};

export default CreateCourseCurriculum;
