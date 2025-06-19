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
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
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
  border-bottom: 2px solid rgba(99, 102, 241, 0.1);
`;

const ResultsIcon = styled.span`
  font-size: 18px;
  color: #6366f1;
`;

const ResultsTitle = styled.h2`
  margin: 0;
  font-size: 16px;
  color: #2d3748;
  font-weight: 600;
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
    background: rgba(226, 232, 240, 0.5);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(99, 102, 241, 0.3);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(99, 102, 241, 0.5);
  }
`;

const BookCard = styled.div`
  padding: 20px;
  background: #ffffff;
  border: none;
  border-radius: 16px;
  color: #2d3748;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    sans-serif;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`;

const ErrorMessage = styled.div`
  color: #e53e3e;
  background: rgba(254, 226, 226, 0.8);
  border: 1px solid rgba(252, 129, 129, 0.3);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 15px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    sans-serif;
  font-size: 14px;
  font-weight: 500;
`;

const LoadingMessage = styled.div`
  color: #6366f1;
  text-align: center;
  padding: 40px 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    sans-serif;
  font-size: 16px;
  font-weight: 500;
`;

const NoResultsMessage = styled.div`
  color: #718096;
  text-align: center;
  padding: 40px 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    sans-serif;
  font-size: 16px;
`;

const BookTitle = styled.h3`
  margin: 0 0 12px 0;
  font-size: 18px;
  color: #2d3748;
  font-weight: 700;
  line-height: 1.3;
`;

const BookDescription = styled.p`
  margin: 0 0 16px 0;
  font-size: 14px;
  color: #4a5568;
  line-height: 1.6;
`;

const BookMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const BookCategory = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #6366f1;
  font-weight: 600;
  background: rgba(99, 102, 241, 0.1);
  padding: 4px 8px;
  border-radius: 6px;
  width: fit-content;
`;

const BookTags = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #805ad5;
  font-weight: 500;
  background: rgba(128, 90, 213, 0.1);
  padding: 4px 8px;
  border-radius: 6px;
  width: fit-content;
`;
