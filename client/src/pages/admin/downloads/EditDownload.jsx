import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import LoadingSpinner from "../../../components/widgets/LoadingSpinner";
import {
  getDownloadEditData,
} from "../../../features/download/downloadActions";
import DownloadForm from "./DownloadForm";

const EditDownload = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { downloadEditData = null, loading: downloadLoading } = useSelector(
    (state) => state.downloadState,
  );

  const [ready, setReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setReady(false);

      await dispatch(getDownloadEditData(id));

      if (isMounted) {
        setReady(true);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [dispatch, id]);

  const download = downloadEditData?.download || null;
  const courses = downloadEditData?.availableCourses || [];

  if (downloadLoading || !download || !ready) {
    return (
      <LoadingSpinner
        title="Loading download"
        description="Fetching the selected download record and available courses."
      />
    );
  }

  return <DownloadForm courses={courses} download={download} isEdit />;
};

export default EditDownload;
