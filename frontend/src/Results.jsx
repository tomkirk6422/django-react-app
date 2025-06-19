import styled from "styled-components";

function Results({ products, loading, error }) {
  return (
    <ResultsPanel>
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
    </ResultsPanel>
  );
}

export default Results;

const ResultsPanel = styled.div`
  flex: 1;
  height: 100%;
  width: 100%;
`;

const ResultsSection = styled.div`
  border: none;
  padding: 20px;
  background-color: #2a2a2a;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ResultsHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #444;
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
  flex-direction: column;
  gap: 15px;
  flex: 1;
  overflow-y: auto;
  padding-right: 10px;

  /* Custom scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #1a1a1a;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #444;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const BookCard = styled.div`
  padding: 15px;
  background-color: #1a1a1a;
  border: 1px solid #444;
  color: #ffffff;
  font-family: "Courier New", monospace;
  cursor: pointer;

  &:hover {
    background-color: #333;
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
