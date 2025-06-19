import { useState } from "react";
import styled from "styled-components";

function NovelFinder() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [isTagsDropdownOpen, setIsTagsDropdownOpen] = useState(false);

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

  return (
    <Container>
      <Header>
        <HeaderIcon>📚</HeaderIcon>
        <HeaderTitle>Novel Finder</HeaderTitle>
      </Header>

      <SearchSection>
        <SearchIcon>🔍</SearchIcon>
        <SearchBox>
          <SearchInput
            type="text"
            placeholder="Search Box"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
                <option value="fiction">Fiction</option>
                <option value="non-fiction">Non-Fiction</option>
                <option value="science">Biography</option>
                <option value="non-fiction">children</option>
                <option value="science">Science & Technology</option>
              </DropdownSelect>
            </Dropdown>
          </FilterGroup>
        </FilterRow>

        <FilterRow>
          <FilterGroup>
            <FilterIcon>🏷️</FilterIcon>
            <FilterLabel>Tags:</FilterLabel>
            <MultiSelect>
              <MultiSelectContainer>
                <MultiSelectInput
                  placeholder={
                    selectedTags.length > 0
                      ? `${selectedTags.length} selected`
                      : "[Multi-select]"
                  }
                  readOnly
                  onClick={() => setIsTagsDropdownOpen(!isTagsDropdownOpen)}
                />
                <DropdownArrow
                  onClick={() => setIsTagsDropdownOpen(!isTagsDropdownOpen)}
                >
                  {isTagsDropdownOpen ? "▲" : "▼"}
                </DropdownArrow>
                {isTagsDropdownOpen && (
                  <TagsDropdown>
                    {availableTags.map((tag) => (
                      <TagOption key={tag}>
                        <TagCheckbox
                          type="checkbox"
                          checked={selectedTags.includes(tag)}
                          onChange={() => handleTagToggle(tag)}
                        />
                        <TagLabel>{tag}</TagLabel>
                      </TagOption>
                    ))}
                  </TagsDropdown>
                )}
              </MultiSelectContainer>
              {selectedTags.length > 0 && (
                <SelectedTagsDisplay>
                  {selectedTags.map((tag) => (
                    <SelectedTag key={tag}>
                      {tag}
                      <RemoveTagButton onClick={() => handleTagToggle(tag)}>
                        ×
                      </RemoveTagButton>
                    </SelectedTag>
                  ))}
                </SelectedTagsDisplay>
              )}
            </MultiSelect>
          </FilterGroup>
        </FilterRow>
      </FiltersSection>

      <ButtonSection>
        <SearchButton>Find Novel</SearchButton>
        <ClearButton>Clear Filters</ClearButton>
      </ButtonSection>
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

const MultiSelect = styled.div`
  flex: 1;
`;

const MultiSelectContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const MultiSelectInput = styled.input`
  width: 100%;
  padding: 6px 10px;
  background-color: #2a2a2a;
  border: 1px solid #444;
  color: #ffffff;
  font-family: "Courier New", monospace;
  font-size: 14px;
  outline: none;
  cursor: pointer;

  &::placeholder {
    color: #888;
  }
`;

const DropdownArrow = styled.div`
  position: absolute;
  right: 10px;
  cursor: pointer;
  color: #888;
  user-select: none;
`;

const TagsDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #2a2a2a;
  border: 1px solid #444;
  border-top: none;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
`;

const TagOption = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;

  &:hover {
    background-color: #3a3a3a;
  }
`;

const TagCheckbox = styled.input`
  margin-right: 8px;
  cursor: pointer;
`;

const TagLabel = styled.span`
  color: #ffffff;
  font-family: "Courier New", monospace;
  font-size: 14px;
  cursor: pointer;
`;

const SelectedTagsDisplay = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 8px;
`;

const SelectedTag = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 4px 8px;
  background-color: #4ade80;
  color: #000000;
  font-family: "Courier New", monospace;
  font-size: 12px;
  border-radius: 3px;
`;

const RemoveTagButton = styled.button`
  background: none;
  border: none;
  color: #000000;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  padding: 0;

  &:hover {
    color: #666;
  }
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
  padding: 15px 20px;
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
