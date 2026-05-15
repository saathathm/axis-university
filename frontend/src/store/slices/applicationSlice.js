import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/services/api";

export const submitApplication = createAsyncThunk(
  "application/submitApplication",
  async (payload, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      Object.entries(payload).forEach(([key, value]) => {
        if (value === undefined || value === null || value === "") {
          return;
        }

        if (key === "attachments" && Array.isArray(value)) {
          value.forEach((file) => {
            formData.append("attachments[]", file);
          });
          return;
        }

        formData.append(key, value);
      });

      const response = await api.post("/applications", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to submit application.");
    }
  },
);

export const verifyCertificate = createAsyncThunk(
  "application/verifyCertificate",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.get("/certificates/verify", { params: payload });
      return response.data;
    } catch (error) {
      return error.response?.data?.status === "not_found"
        ? error.response.data
        : rejectWithValue(error.response?.data?.message || "Unable to verify certificate.");
    }
  },
);

export const fetchAdminApplications = createAsyncThunk(
  "application/fetchAdminApplications",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/applications");
      return response.data.data.data ?? response.data.data ?? [];
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to load applications.");
    }
  },
);

export const approveAdminApplication = createAsyncThunk(
  "application/approveAdminApplication",
  async (applicationId, { rejectWithValue }) => {
    try {
      const response = await api.post(`/admin/applications/${applicationId}/approve`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to approve application.");
    }
  },
);

export const rejectAdminApplication = createAsyncThunk(
  "application/rejectAdminApplication",
  async ({ applicationId, admin_note: adminNote }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/admin/applications/${applicationId}/reject`, { admin_note: adminNote });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to reject application.");
    }
  },
);

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    status: "idle",
    error: null,
    submitResult: null,
    verificationResult: null,
    adminApplications: [],
    adminApplicationsStatus: "idle",
  },
  reducers: {
    clearApplicationState(state) {
      state.status = "idle";
      state.error = null;
      state.submitResult = null;
      state.verificationResult = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitApplication.pending, (state) => {
        state.status = "submitting";
        state.error = null;
      })
      .addCase(submitApplication.fulfilled, (state, action) => {
        state.status = "submitted";
        state.submitResult = action.payload;
      })
      .addCase(submitApplication.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(verifyCertificate.pending, (state) => {
        state.status = "verifying";
        state.error = null;
      })
      .addCase(verifyCertificate.fulfilled, (state, action) => {
        state.status = "verified";
        state.verificationResult = action.payload;
      })
      .addCase(verifyCertificate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchAdminApplications.pending, (state) => {
        state.adminApplicationsStatus = "loading";
        state.error = null;
      })
      .addCase(fetchAdminApplications.fulfilled, (state, action) => {
        state.adminApplicationsStatus = "succeeded";
        state.adminApplications = action.payload;
      })
      .addCase(fetchAdminApplications.rejected, (state, action) => {
        state.adminApplicationsStatus = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(approveAdminApplication.fulfilled, (state, action) => {
        state.adminApplications = state.adminApplications.map((item) =>
          String(item.id) === String(action.payload.application.id) ? action.payload.application : item,
        );
      })
      .addCase(rejectAdminApplication.fulfilled, (state, action) => {
        state.adminApplications = state.adminApplications.map((item) =>
          String(item.id) === String(action.payload.id) ? action.payload : item,
        );
      });
  },
});

export const { clearApplicationState } = applicationSlice.actions;

export default applicationSlice.reducer;
