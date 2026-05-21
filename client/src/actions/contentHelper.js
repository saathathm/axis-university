export const getError = (error, message = "Something went wrong.") => {
  return error.response?.data?.message || error.message || message;
};

export const getCollection = (response) => {
  return response.data.data?.data ?? response.data.data ?? [];
};

export const normalizeFaculty = (faculty) => ({
  id: faculty.slug || String(faculty.id),
  backendId: faculty.id,
  name: faculty.name,
  description: faculty.description || "",
  icon: faculty.icon || "GraduationCap",
  color: faculty.color || "text-primary",
  slug: faculty.slug,
});

export const normalizeProgram = (program) => ({
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

export const normalizeNews = (item) => ({
  id: String(item.id),
  title: item.title,
  excerpt: item.excerpt || "",
  body: item.body || "",
  date: item.date || "",
});

export const normalizeTestimonial = (item) => ({
  id: String(item.id),
  name: item.name,
  program: item.program,
  quote: item.quote,
});

export const normalizeRecognition = (item) => ({
  id: String(item.id),
  name: item.name,
  desc: item.description || item.desc || "",
  image: item.image || item.logo || null,
});

export const groupDownloads = (items) => {
  return items.reduce((groups, item) => {
    const group = groups.find((entry) => entry.category === item.category);
    const file = {
      title: item.title,
      size: item.size,
      url: item.url || item.path || null,
    };

    if (group) {
      group.items.push(file);
    } else {
      groups.push({ category: item.category, items: [file] });
    }

    return groups;
  }, []);
};
