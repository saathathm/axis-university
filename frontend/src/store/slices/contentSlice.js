import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/services/api";

const normalizeFaculty = (faculty) => ({
  id: faculty.slug || String(faculty.id),
  name: faculty.name,
  description: faculty.description || "",
  icon: faculty.icon || null,
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
  description: program.description,
  overview: program.overview,
  curriculum: program.curriculum || [],
  requirements: program.requirements || [],
});

const normalizeNews = (item) => ({
  id: String(item.id),
  title: item.title,
  excerpt: item.excerpt,
  date: item.date,
});

const normalizeDownload = (item) => ({
  id: String(item.id),
  category: item.category,
  items: [{ title: item.title, size: item.size, url: item.url || item.path || null }],
});

const normalizeTestimonial = (item) => ({
  id: String(item.id),
  name: item.name,
  program: item.program,
  quote: item.quote,
});

export const fetchContent = createAsyncThunk("content/fetchContent", async () => {
  const [facultiesRes, programsRes, testimonialsRes, newsRes, downloadsRes] = await Promise.all([
    api.get("/faculties"),
    api.get("/programs"),
    api.get("/testimonials"),
    api.get("/news"),
    api.get("/downloads"),
  ]);

  return {
    faculties: (facultiesRes.data.data ?? []).map(normalizeFaculty),
    programs: (programsRes.data.data?.data ?? programsRes.data.data ?? []).map(normalizeProgram),
    testimonials: (testimonialsRes.data.data ?? []).map(normalizeTestimonial),
    news: (newsRes.data.data ?? []).map(normalizeNews),
    downloads: (downloadsRes.data.data ?? []).reduce((groups, item) => {
      const group = groups.find((entry) => entry.category === item.category);
      const mappedItem = { title: item.title, size: item.size, url: item.url || item.path || null };

      if (group) {
        group.items.push(mappedItem);
      } else {
        groups.push({ category: item.category, items: [mappedItem] });
      }

      return groups;
    }, []),
    programsPagination: programsRes.data.data?.meta ?? null,
  };
});

export const fetchProgramById = createAsyncThunk("content/fetchProgramById", async (programId) => {
  const response = await api.get(`/programs/${programId}`);
  return normalizeProgram(response.data.data);
});

const contentSlice = createSlice({
  name: "content",
  initialState: {
    faculties: [],
    programs: [],
    testimonials: [],
    news: [],
    downloads: [],
    selectedProgram: null,
    programsPagination: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContent.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.faculties = action.payload.faculties;
        state.programs = action.payload.programs;
        state.testimonials = action.payload.testimonials;
        state.news = action.payload.news;
        state.downloads = action.payload.downloads;
        state.programsPagination = action.payload.programsPagination;
      })
      .addCase(fetchContent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Unable to load content.";
      })
      .addCase(fetchProgramById.fulfilled, (state, action) => {
        state.selectedProgram = action.payload;
      });
  },
});

export default contentSlice.reducer;