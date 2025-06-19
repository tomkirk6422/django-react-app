import axios from "axios";

// API base URL - adjust if your Django server runs on a different port
const API_BASE_URL = "http://localhost:8000/api";

// Function to build query parameters for API call
const buildQueryParams = (searchTerm, selectedCategory, selectedTags) => {
  const params = new URLSearchParams();

  // Add search term if provided
  if (searchTerm && searchTerm.trim()) {
    params.append("search", searchTerm.trim());
  }

  // Add category filter if selected
  if (selectedCategory) {
    params.append("category__name", selectedCategory);
  }

  // Add tag filters if selected
  if (selectedTags && selectedTags.length > 0) {
    selectedTags.forEach((tag) => {
      params.append("tags__name", tag);
    });
  }

  return params.toString();
};

// Function to fetch products from API
export const fetchProducts = async (
  searchTerm = "",
  selectedCategory = "",
  selectedTags = []
) => {
  try {
    const queryParams = buildQueryParams(
      searchTerm,
      selectedCategory,
      selectedTags
    );
    const url = `${API_BASE_URL}/products/${
      queryParams ? `?${queryParams}` : ""
    }`;

    console.log("Fetching from:", url); // For debugging

    const response = await axios.get(url);
    return {
      success: true,
      data: response.data,
      error: null,
    };
  } catch (err) {
    console.error("API Error:", err);
    return {
      success: false,
      data: [],
      error: err.response?.data?.detail || "Failed to fetch products",
    };
  }
};

// Function to fetch all products (no filters)
export const fetchAllProducts = async () => {
  return fetchProducts("", "", []);
};

// Function to search products by term
export const searchProducts = async (searchTerm) => {
  return fetchProducts(searchTerm, "", []);
};

// Function to filter products by category
export const filterProductsByCategory = async (category) => {
  return fetchProducts("", category, []);
};

// Function to filter products by tags
export const filterProductsByTags = async (tags) => {
  return fetchProducts("", "", tags);
};

// Function to filter products with multiple criteria
export const filterProducts = async (filters) => {
  const { searchTerm = "", category = "", tags = [] } = filters;
  return fetchProducts(searchTerm, category, tags);
};

// Export API base URL in case it's needed elsewhere
export { API_BASE_URL };
