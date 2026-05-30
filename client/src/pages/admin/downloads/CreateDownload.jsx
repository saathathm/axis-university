import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import LoadingSpinner from "../../../components/widgets/LoadingSpinner";
import { getCourses } from "../../../features/course/courseActions";
import { getDownloads } from "../../../features/download/downloadActions";
import DownloadForm from "./DownloadForm";

const CreateDownload = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { courses = [], loading: courseLoading } = useSelector(
    (state) => state.courseState,
  );
  const { downloads = [], loading: downloadLoading } = useSelector(
    (state) => state.downloadState,
  );

  const [ready, setReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setReady(false);

      await Promise.all([dispatch(getCourses()), dispatch(getDownloads())]);

      if (isMounted) {
        setReady(true);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  if (courseLoading || downloadLoading || !ready) {
    return (
      <LoadingSpinner
        title="Loading download form"
        description="Preparing the course list and existing download records."
      />
    );
  }

  return <DownloadForm courses={courses} />;
};

export default CreateDownload;
