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
    // Clear all results
    setProducts([]);
    setError("");
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
  padding: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #2d3748;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    sans-serif;
  width: 100vw;
  max-width: none;
  margin: 0;
  border: none;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px 20px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  margin: 0;
`;

const HeaderIcon = styled.span`
  font-size: 20px;
`;

const HeaderTitle = styled.h1`
  margin: 0;
  font-size: 18px;
  color: #4c51bf;
  font-weight: 600;
`;

const MainContent = styled.div`
  display: flex;
  gap: 0;
  align-items: flex-start;
  height: calc(100vh - 70px);
`;

const SearchPanel = styled.div`
  flex: 0 0 450px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  padding: 20px;
  height: 100%;
  overflow-y: auto;
`;

const SearchSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
`;

const SearchIcon = styled.span`
  font-size: 18px;
  color: #6366f1;
`;

const SearchBox = styled.div`
  flex: 1;
  background: #ffffff;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 2px;
  transition: all 0.2s ease;

  &:focus-within {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  background: transparent;
  border: none;
  color: #2d3748;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    sans-serif;
  font-size: 14px;
  outline: none;
  border-radius: 10px;

  &::placeholder {
    color: #a0aec0;
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
  color: #4c51bf;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const Dropdown = styled.div`
  width: 100%;
`;

const DropdownSelect = styled.select`
  width: 100%;
  padding: 12px 16px;
  background: #ffffff;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  color: #2d3748;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    sans-serif;
  font-size: 14px;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }

  option {
    background: #ffffff;
    color: #2d3748;
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const TagButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    sans-serif;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  ${(props) =>
    props.selected
      ? `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #ffffff;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  `
      : `
    background: #ffffff;
    color: #4a5568;
    
    &:hover {
      background: #f7fafc;
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }
  `}
`;

const ButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SearchButton = styled.button`
  padding: 12px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 12px;
  color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    sans-serif;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ClearButton = styled.button`
  padding: 12px 20px;
  background: #ffffff;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  color: #4a5568;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    sans-serif;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f7fafc;
    border-color: #cbd5e0;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;
