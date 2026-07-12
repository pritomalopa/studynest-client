export const SUBJECTS = [
  "Computer Science",
  "Business",
  "Engineering",
  "Medical",
  "Language",
  "Law",
  "Mathematics",
  "Social Science",
];

export const RESOURCE_TYPES: { value: string; label: string }[] = [
  { value: "notes", label: "Notes" },
  { value: "book", label: "Book" },
  { value: "slides", label: "Slides" },
  { value: "video", label: "Video" },
];

export const PRICE_TYPES: { value: string; label: string }[] = [
  { value: "free", label: "Free" },
  { value: "paid", label: "Paid" },
];

export const SORT_OPTIONS: { value: string; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "rating", label: "Highest Rated" },
  { value: "popular", label: "Most Downloaded" },
];
