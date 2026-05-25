import {
  createNewsletterSubscriptionRequest,
  createNewsletterSubscriptionSuccess,
  createNewsletterSubscriptionFailure,
  getNewsletterSubscriptionsRequest,
  getNewsletterSubscriptionsSuccess,
  getNewsletterSubscriptionsFailure,
  getNewsletterSubscriptionDetailsRequest,
  getNewsletterSubscriptionDetailsSuccess,
  getNewsletterSubscriptionDetailsFailure,
  updateNewsletterSubscriptionRequest,
  updateNewsletterSubscriptionSuccess,
  updateNewsletterSubscriptionFailure,
  deleteNewsletterSubscriptionRequest,
  deleteNewsletterSubscriptionSuccess,
  deleteNewsletterSubscriptionFailure,
} from "./newsletterSlice.js";

import axiosInstance from "../../services/axiosInstance.js";

export const createNewsletterSubscription = (email) => async (dispatch) => {
  try {
    dispatch(createNewsletterSubscriptionRequest());

    const { data } = await axiosInstance.post("/api/newsletter-subscriptions", {
      email,
    });

    dispatch(createNewsletterSubscriptionSuccess(data.message));
  } catch (error) {
    dispatch(
      createNewsletterSubscriptionFailure(
        error.response?.data?.message || "Failed to subscribe newsletter",
      ),
    );
  }
};

export const getNewsletterSubscriptions = () => async (dispatch) => {
  try {
    dispatch(getNewsletterSubscriptionsRequest());

    const { data } = await axiosInstance.get("/api/newsletter-subscriptions");

    dispatch(getNewsletterSubscriptionsSuccess(data.data.data || data.data));
  } catch (error) {
    dispatch(
      getNewsletterSubscriptionsFailure(
        error.response?.data?.message ||
          "Failed to fetch newsletter subscriptions",
      ),
    );
  }
};

export const getNewsletterSubscriptionDetails =
  (subscriptionId) => async (dispatch) => {
    try {
      dispatch(getNewsletterSubscriptionDetailsRequest());

      const { data } = await axiosInstance.get(
        `/api/newsletter-subscriptions/${subscriptionId}`,
      );

      dispatch(getNewsletterSubscriptionDetailsSuccess(data.data));
    } catch (error) {
      dispatch(
        getNewsletterSubscriptionDetailsFailure(
          error.response?.data?.message ||
            "Failed to fetch newsletter subscription details",
        ),
      );
    }
  };

export const updateNewsletterSubscription =
  (subscriptionId, subscriptionData) => async (dispatch) => {
    try {
      dispatch(updateNewsletterSubscriptionRequest());

      const { data } = await axiosInstance.patch(
        `/api/newsletter-subscriptions/${subscriptionId}`,
        subscriptionData,
      );

      dispatch(updateNewsletterSubscriptionSuccess(data.message));
    } catch (error) {
      dispatch(
        updateNewsletterSubscriptionFailure(
          error.response?.data?.message ||
            "Failed to update newsletter subscription",
        ),
      );
    }
  };

export const deleteNewsletterSubscription =
  (subscriptionId) => async (dispatch) => {
    try {
      dispatch(deleteNewsletterSubscriptionRequest());

      const { data } = await axiosInstance.delete(
        `/api/newsletter-subscriptions/${subscriptionId}`,
      );

      dispatch(deleteNewsletterSubscriptionSuccess(data.message));
    } catch (error) {
      dispatch(
        deleteNewsletterSubscriptionFailure(
          error.response?.data?.message ||
            "Failed to delete newsletter subscription",
        ),
      );
    }
  };
