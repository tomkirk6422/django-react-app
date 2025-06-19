import { useState } from "react";
import styled from "styled-components";
import { fetchProducts } from "./api.js";
import Results from "./Results.jsx";

function NovelFinder() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  const handleClearFilters = async () => {
    setSelectedTags([]);
    setSearchTerm("");
    setSelectedCategory("");
    // Fetch all products after clearing filters
    await loadProducts();
  };

  // Function to load products using the API
  const loadProducts = async (
    searchTerm = "",
    selectedCategory = "",
    selectedTags = []
  ) => {
    setLoading(true);
    setError("");

    const result = await fetchProducts(
      searchTerm,
      selectedCategory,
      selectedTags
    );

    if (result.success) {
      setProducts(result.data);
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  // Function to handle search button click
  const handleSearch = () => {
    loadProducts(searchTerm, selectedCategory, selectedTags);
  };

  return (
    <Container>
      <Header>
        <HeaderIcon>📚</HeaderIcon>
        <HeaderTitle>Novel Finder (Product Finder)</HeaderTitle>
      </Header>

      <MainContent>
        <SearchPanel>
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
                <FilterLabel>
                  <FilterIcon>📁</FilterIcon>
                  Category:
                </FilterLabel>
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
                <FilterLabel>
                  <FilterIcon>🏷️</FilterIcon>
                  Tags:
                </FilterLabel>
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
              Find Novels
            </SearchButton>
            <ClearButton onClick={handleClearFilters}>
              Clear Filters
            </ClearButton>
          </ButtonSection>
        </SearchPanel>

        <Results products={products} loading={loading} error={error} />
      </MainContent>
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
  max-width: 1400px;
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

const MainContent = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-start;
`;

const SearchPanel = styled.div`
  flex: 0 0 400px;
  background-color: #2a2a2a;
  border: 1px solid #444;
  padding: 20px;
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
  background-color: #1a1a1a;
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
  margin-bottom: 15px;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FilterIcon = styled.span`
  font-size: 16px;
`;

const FilterLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fbbf24;
  font-size: 14px;
  margin-bottom: 8px;
`;

const Dropdown = styled.div`
  width: 100%;
`;

const DropdownSelect = styled.select`
  width: 100%;
  padding: 8px 10px;
  background-color: #1a1a1a;
  border: 1px solid #444;
  color: #ffffff;
  font-family: "Courier New", monospace;
  font-size: 14px;
  outline: none;

  option {
    background-color: #1a1a1a;
    color: #ffffff;
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const TagButton = styled.button`
  padding: 6px 12px;
  border: none;
  border-radius: 15px;
  font-family: "Courier New", monospace;
  font-size: 12px;
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
  flex-direction: column;
  gap: 10px;
`;

const SearchButton = styled.button`
  padding: 10px 16px;
  background-color: #1a1a1a;
  border: 1px solid #444;
  color: #ffffff;
  font-family: "Courier New", monospace;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ClearButton = styled.button`
  padding: 10px 16px;
  background-color: #1a1a1a;
  border: 1px solid #444;
  color: #ffffff;
  font-family: "Courier New", monospace;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }
`;
