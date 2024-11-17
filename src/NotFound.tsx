import { Home } from "iconsax-react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9fafb;
`;

const Content = styled.div`
  text-align: center;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ErrorCode = styled.h1`
  font-size: 9rem;
  font-weight: bold;
  color: #1f2937;
  margin: 0;
  line-height: 1;
`;

const Title = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
  color: #4b5563;
  margin: 0.5rem 0 0 0;
`;

const Message = styled.p`
  color: #6b7280;
  max-width: 24rem;
  margin: 0 auto;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: none;
  outline: none;

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const BackButton = styled(Button)`
  background-color: #f3f4f6;
  color: #4b5563;

  &:hover {
    background-color: #e5e7eb;
  }
`;

const HomeButton = styled(Button)`
  background-color: #3e98c7;
  color: white;

  &:hover {
    background-color: #275e7c;
  }
`;

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Content>
        <div>
          <ErrorCode>404</ErrorCode>
          <Title>Page Not Found</Title>
        </div>

        <Message>Oops! The page you're looking for doesn't exist or has been moved.</Message>

        <ButtonContainer>
          <BackButton onClick={() => navigate(-1)}>Go Back</BackButton>

          <HomeButton onClick={() => navigate("/")}>
            <Home size={16} />
            Home Page
          </HomeButton>
        </ButtonContainer>
      </Content>
    </Container>
  );
};

export default NotFound;
