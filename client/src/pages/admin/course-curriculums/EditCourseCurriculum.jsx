import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import LoadingSpinner from "../../../components/widgets/LoadingSpinner";
import { getCourseCurriculumDetails, getCourseCurriculums } from "../../../features/courseCurriculum/courseCurriculumActions";
import CourseCurriculumForm from "./CourseCurriculumForm";

const EditCourseCurriculum = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { courseCurriculum = null, loading } = useSelector(
    (state) => state.courseCurriculumState,
  );
  const { curriculums = [] } = useSelector((state) => state.courseCurriculumState);

  const [curriculumsLoaded, setCurriculumsLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadCurriculum = async () => {
      setCurriculumsLoaded(false);
      await dispatch(getCourseCurriculumDetails(id));
      if (isMounted) {
        // allow the next effect to fetch course curriculums once the curriculum is in state
      }
    };

    loadCurriculum();

    return () => {
      isMounted = false;
    };
  }, [dispatch, id]);

  useEffect(() => {
    const courseId = courseCurriculum?.course?.id;

    if (!courseId) {
      return;
    }

    let isMounted = true;

    const loadCurriculums = async () => {
      await dispatch(getCourseCurriculums(courseId));

      if (isMounted) {
        setCurriculumsLoaded(true);
      }
    };

    loadCurriculums();

    return () => {
      isMounted = false;
    };
  }, [dispatch, courseCurriculum?.course?.id]);

  if (loading || !courseCurriculum || !curriculumsLoaded) {
    return <LoadingSpinner title="Loading curriculum" description="Fetching the selected curriculum record." />;
  }

  return (
    <CourseCurriculumForm
      course={courseCurriculum.course}
      curriculums={curriculums}
      curriculum={courseCurriculum}
      isEdit
    />
  );
};

export default EditCourseCurriculum;
