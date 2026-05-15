import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/services/api";

const collection = (response) => response.data.data?.data ?? response.data.data ?? [];

const normalizeFaculty = (faculty) => ({
  id: faculty.slug || String(faculty.id),
  backendId: faculty.id,
  name: faculty.name,
  description: faculty.description || "",
  icon: faculty.icon || "GraduationCap",
  color: faculty.color || "text-primary",
  slug: faculty.slug,
});

const normalizeProgram = (program) => ({
  id: program.code ? String(program.code).toLowerCase() : String(program.id),
  backendId: program.id,
  faculty: program.faculty?.slug || String(program.faculty_id),
  facultyName: program.faculty?.name || "",
  title: program.title,
  level: program.level,
  duration: program.duration,
  description: program.description || "",
  overview: program.overview || "",
  curriculum: program.curriculum || [],
  requirements: program.requirements || [],
});

const normalizeNews = (item) => ({
  id: String(item.id),
  title: item.title,
  excerpt: item.excerpt || "",
  body: item.body || "",
  date: item.date || "",
});

const normalizeTestimonial = (item) => ({
  id: String(item.id),
  name: item.name,
  program: item.program,
  quote: item.quote,
});

const normalizeRecognition = (item) => ({
  id: String(item.id),
  name: item.name,
  desc: item.description || item.desc || "",
});

const groupDownloads = (items) =>
  items.reduce((groups, item) => {
    const group = groups.find((entry) => entry.category === item.category);
    const mappedItem = { title: item.title, size: item.size, url: item.url || item.path || null };

    if (group) {
      group.items.push(mappedItem);
    } else {
      groups.push({ category: item.category, items: [mappedItem] });
    }

    return groups;
  }, []);

const shouldFetch = (key) => (_, { getState }) => {
  const status = getState().content.status[key];
  return status !== "loading" && status !== "succeeded";
};

export const fetchFaculties = createAsyncThunk(
  "content/fetchFaculties",
  async () => {
    const response = await api.get("/faculties");
    return collection(response).map(normalizeFaculty);
  },
  { condition: shouldFetch("faculties") },
);

export const fetchPrograms = createAsyncThunk(
  "content/fetchPrograms",
  async () => {
    const response = await api.get("/programs");

    return {
      items: collection(response).map(normalizeProgram),
      pagination: response.data.data?.meta ?? null,
    };
  },
  { condition: shouldFetch("programs") },
);

export const fetchProgramById = createAsyncThunk("content/fetchProgramById", async (programId) => {
    const response = await api.get(`/programs/${programId}`);
    return normalizeProgram(response.data.data);
  },
  {
    condition: (programId, { getState }) => {
      const { selectedProgram, status } = getState().content;
      return (
        status.selectedProgram !== "loading" &&
        String(selectedProgram?.id || "") !== String(programId)
      );
    },
  },
);

export const fetchTestimonials = createAsyncThunk(
  "content/fetchTestimonials",
  async () => {
    const response = await api.get("/testimonials");
    return collection(response).map(normalizeTestimonial);
  },
  { condition: shouldFetch("testimonials") },
);

export const fetchNews = createAsyncThunk(
  "content/fetchNews",
  async () => {
    const response = await api.get("/news");
    return collection(response).map(normalizeNews);
  },
  { condition: shouldFetch("news") },
);

export const fetchDownloads = createAsyncThunk(
  "content/fetchDownloads",
  async () => {
    const response = await api.get("/downloads");
    return groupDownloads(collection(response));
  },
  { condition: shouldFetch("downloads") },
);

export const fetchRecognitions = createAsyncThunk(
  "content/fetchRecognitions",
  async () => {
    const response = await api.get("/recognitions");
    return collection(response).map(normalizeRecognition);
  },
  { condition: shouldFetch("recognitions") },
);
