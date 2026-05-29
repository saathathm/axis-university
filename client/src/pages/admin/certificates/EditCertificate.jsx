import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import CreateCertificate from "./CreateCertificate";

import { getCertificateDetails } from "../../../features/certificate/certificateActions";

import LoadingSpinner from "../../../components/widgets/LoadingSpinner";

const EditCertificate = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const { certificate = null, loading } = useSelector(
    (state) => state.certificateState,
  );

  useEffect(() => {
    dispatch(getCertificateDetails(id));
  }, [dispatch, id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return <CreateCertificate certificate={certificate} isEdit />;
};

export default EditCertificate;
