import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

function NovelFinder() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // API base URL - adjust if your Django server runs on a different port
  const API_BASE_URL = "http://localhost:8000/api";

  const availableTags = [
    "Classic",
    "Mystery",
    "Bestseller",
    "Educational",
    "Adventure",
    "Self-Help",
    "Programming",
    "Romance",
    "New Release",
    "Award Winner",
  ];

  const handleTagToggle = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleClearFilters = () => {
    setSelectedTags([]);
    setSearchTerm("");
    setSelectedCategory("");
  };

  // Function to build query parameters for API call
  const buildQueryParams = () => {
    const params = new URLSearchParams();

    // Add search term if provided
    if (searchTerm.trim()) {
      params.append("search", searchTerm.trim());
    }

    // Add category filter if selected
    if (selectedCategory) {
      params.append("category__name", selectedCategory);
    }

    // Add tag filters if selected
    selectedTags.forEach((tag) => {
      params.append("tags__name", tag);
    });

    return params.toString();
  };

  // Function to fetch products from API
  const fetchProducts = async () => {
    setLoading(true);
    setError("");

    try {
      const queryParams = buildQueryParams();
      const url = `${API_BASE_URL}/products/${
        queryParams ? `?${queryParams}` : ""
      }`;
      const response = await axios.get(url);
      setProducts(response.data);
    } catch (err) {
      console.error("API Error:", err);
      setError(err.response?.data?.detail || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle search button click
  const handleSearch = () => {
    fetchProducts();
  };

  return (
    <Container>
      <Header>
        <HeaderIcon>📚</HeaderIcon>
        <HeaderTitle>Novel Finder (Product Finder)</HeaderTitle>
      </Header>

      <SearchSection>
        <SearchIcon>🔍</SearchIcon>
        <SearchBox>
          <SearchInput
            type="text"
            placeholder="Search by description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
        </SearchBox>
      </SearchSection>

      <FiltersSection>
        <FilterRow>
          <FilterGroup>
            <FilterIcon>📁</FilterIcon>
            <FilterLabel>Category:</FilterLabel>
            <Dropdown>
              <DropdownSelect
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="Fiction">Fiction</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Biography">Biography</option>
                <option value="Children">Children</option>
                <option value="Science & Technology">
                  Science & Technology
                </option>
              </DropdownSelect>
            </Dropdown>
          </FilterGroup>
        </FilterRow>

        <FilterRow>
          <FilterGroup>
            <FilterIcon>🏷️</FilterIcon>
            <FilterLabel>Tags:</FilterLabel>
            <TagsContainer>
              {availableTags.map((tag) => (
                <TagButton
                  key={tag}
                  selected={selectedTags.includes(tag)}
                  onClick={() => handleTagToggle(tag)}
                >
                  {tag}
                </TagButton>
              ))}
            </TagsContainer>
          </FilterGroup>
        </FilterRow>
      </FiltersSection>

      <ButtonSection>
        <SearchButton onClick={handleSearch} disabled={loading}>
          {loading ? "Searching..." : "Find Novel"}
        </SearchButton>
        <ClearButton onClick={handleClearFilters}>Clear Filters</ClearButton>
      </ButtonSection>

      <ResultsSection>
        <ResultsHeader>
          <ResultsIcon>📖</ResultsIcon>
          <ResultsTitle>Book Results ({products.length} found)</ResultsTitle>
        </ResultsHeader>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        {loading ? (
          <LoadingMessage>Loading products...</LoadingMessage>
        ) : (
          <BooksGrid>
            {products.length > 0
              ? products.map((product) => (
                  <BookCard key={product.identifier}>
                    <BookTitle>{product.name}</BookTitle>
                    <BookDescription>{product.description}</BookDescription>
                    <BookMeta>
                      <BookCategory>📁 {product.category?.name}</BookCategory>
                      {product.tags && product.tags.length > 0 && (
                        <BookTags>
                          🏷️ {product.tags.map((tag) => tag.name).join(", ")}
                        </BookTags>
                      )}
                    </BookMeta>
                  </BookCard>
                ))
              : !loading && (
                  <NoResultsMessage>
                    No products found. Try adjusting your filters.
                  </NoResultsMessage>
                )}
          </BooksGrid>
        )}
      </ResultsSection>
    </Container>
  );
}

export default NovelFinder;

const Container = styled.div`
  position: relative;
  padding: 20px;
  background-color: #1a1a1a;
  color: #ffffff;
  min-height: 100vh;
  font-family: "Courier New", monospace;
  max-width: 600px;
  margin: 0 auto;
  border: 2px solid #333;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px;
  background-color: #2a2a2a;
  border: 1px solid #444;
  margin-bottom: 15px;
`;

const HeaderIcon = styled.span`
  font-size: 20px;
`;

const HeaderTitle = styled.h1`
  margin: 0;
  font-size: 18px;
  color: #4ade80;
`;

const SearchSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
`;

const SearchIcon = styled.span`
  font-size: 18px;
  color: #60a5fa;
`;

const SearchBox = styled.div`
  flex: 1;
  background-color: #2a2a2a;
  border: 1px solid #444;
  padding: 2px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  background: transparent;
  border: none;
  color: #ffffff;
  font-family: "Courier New", monospace;
  font-size: 14px;
  outline: none;

  &::placeholder {
    color: #888;
  }
`;

const FiltersSection = styled.div`
  margin-bottom: 15px;
`;

const FilterRow = styled.div`
  margin-bottom: 10px;
`;

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FilterIcon = styled.span`
  font-size: 16px;
`;

const FilterLabel = styled.span`
  color: #fbbf24;
  font-size: 14px;
  min-width: 70px;
`;

const Dropdown = styled.div`
  flex: 1;
`;

const DropdownSelect = styled.select`
  width: 100%;
  padding: 6px 10px;
  background-color: #2a2a2a;
  border: 1px solid #444;
  color: #ffffff;
  font-family: "Courier New", monospace;
  font-size: 14px;
  outline: none;

  option {
    background-color: #2a2a2a;
    color: #ffffff;
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  flex: 1;
`;

const TagButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  font-family: "Courier New", monospace;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  ${(props) =>
    props.selected
      ? `
    background-color: #f59e0b;
    color: #000000;
    font-weight: bold;
  `
      : `
    background-color: #f5f5dc;
    color: #000000;
    
    &:hover {
      background-color: #e5e5cc;
    }
  `}
`;

const ButtonSection = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const SearchButton = styled.button`
  padding: 8px 16px;
  background-color: #2a2a2a;
  border: 1px solid #444;
  color: #ffffff;
  font-family: "Courier New", monospace;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #3a3a3a;
  }
`;

const ClearButton = styled.button`
  padding: 8px 16px;
  background-color: #2a2a2a;
  border: 1px solid #444;
  color: #ffffff;
  font-family: "Courier New", monospace;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #3a3a3a;
  }
`;

const ResultsSection = styled.div`
  border: 1px solid #444;
  padding: 15px;
`;

const ResultsHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
`;

const ResultsIcon = styled.span`
  font-size: 18px;
  color: #60a5fa;
`;

const ResultsTitle = styled.h2`
  margin: 0;
  font-size: 16px;
  color: #ffffff;
`;

const BooksGrid = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
`;

const BookCard = styled.div`
  padding: 15px;
  background-color: #2a2a2a;
  border: 1px solid #444;
  color: #ffffff;
  font-family: "Courier New", monospace;
  cursor: pointer;
  min-width: 280px;
  max-width: 320px;

  &:hover {
    background-color: #3a3a3a;
    border-color: #555;
  }
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  background-color: #2a1a1a;
  border: 1px solid #ef4444;
  padding: 10px;
  margin-bottom: 15px;
  font-family: "Courier New", monospace;
  font-size: 14px;
`;

const LoadingMessage = styled.div`
  color: #60a5fa;
  text-align: center;
  padding: 20px;
  font-family: "Courier New", monospace;
  font-size: 14px;
`;

const NoResultsMessage = styled.div`
  color: #888;
  text-align: center;
  padding: 20px;
  font-family: "Courier New", monospace;
  font-size: 14px;
`;

const BookTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 16px;
  color: #4ade80;
`;

const BookDescription = styled.p`
  margin: 0 0 12px 0;
  font-size: 14px;
  color: #ffffff;
  line-height: 1.4;
`;

const BookMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const BookCategory = styled.span`
  font-size: 12px;
  color: #fbbf24;
`;

const BookTags = styled.span`
  font-size: 12px;
  color: #60a5fa;
`;
