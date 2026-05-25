import {
  createMessageRequest,
  createMessageSuccess,
  createMessageFailure,
  getMessagesRequest,
  getMessagesSuccess,
  getMessagesFailure,
  getMessageDetailsRequest,
  getMessageDetailsSuccess,
  getMessageDetailsFailure,
  updateMessageRequest,
  updateMessageSuccess,
  updateMessageFailure,
  deleteMessageRequest,
  deleteMessageSuccess,
  deleteMessageFailure,
} from "./messageSlice.js";

import axiosInstance from "../../services/axiosInstance.js";

export const createMessage = (messageData) => async (dispatch) => {
  try {
    dispatch(createMessageRequest());

    const { data } = await axiosInstance.post("/api/messages", messageData);

    dispatch(createMessageSuccess(data.message));
  } catch (error) {
    dispatch(
      createMessageFailure(
        error.response?.data?.message || "Failed to send message",
      ),
    );
  }
};

export const getMessages = () => async (dispatch) => {
  try {
    dispatch(getMessagesRequest());

    const { data } = await axiosInstance.get("/api/messages");

    dispatch(getMessagesSuccess(data.data.data || data.data));
  } catch (error) {
    dispatch(
      getMessagesFailure(
        error.response?.data?.message || "Failed to fetch messages",
      ),
    );
  }
};

export const getMessageDetails = (messageId) => async (dispatch) => {
  try {
    dispatch(getMessageDetailsRequest());

    const { data } = await axiosInstance.get(`/api/messages/${messageId}`);

    dispatch(getMessageDetailsSuccess(data.data));
  } catch (error) {
    dispatch(
      getMessageDetailsFailure(
        error.response?.data?.message || "Failed to fetch message details",
      ),
    );
  }
};

export const updateMessage = (messageId, messageData) => async (dispatch) => {
  try {
    dispatch(updateMessageRequest());

    const { data } = await axiosInstance.patch(
      `/api/messages/${messageId}`,
      messageData,
    );

    dispatch(updateMessageSuccess(data.message));
  } catch (error) {
    dispatch(
      updateMessageFailure(
        error.response?.data?.message || "Failed to update message",
      ),
    );
  }
};

export const deleteMessage = (messageId) => async (dispatch) => {
  try {
    dispatch(deleteMessageRequest());

    const { data } = await axiosInstance.delete(`/api/messages/${messageId}`);

    dispatch(deleteMessageSuccess(data.message));
  } catch (error) {
    dispatch(
      deleteMessageFailure(
        error.response?.data?.message || "Failed to delete message",
      ),
    );
  }
};
