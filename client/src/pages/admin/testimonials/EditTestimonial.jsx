import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import LoadingSpinner from "../../../components/widgets/LoadingSpinner";
import { getTestimonialDetails } from "../../../features/testimonial/testimonialActions";
import CreateTestimonial from "./CreateTestimonial";

const EditTestimonial = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const { testimonial = null } = useSelector((state) => state.testimonialState);

  useEffect(() => {
    dispatch(getTestimonialDetails(id));
  }, [dispatch, id]);

  if (!testimonial?.id) {
    return <LoadingSpinner />;
  }

  return <CreateTestimonial testimonial={testimonial} isEdit />;
};

export default EditTestimonial;