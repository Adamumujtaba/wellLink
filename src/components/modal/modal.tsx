import { ReactNode } from "react";
import styled, { CSSProperties } from "styled-components";

interface ModalProps {
  onClose: () => void;
  show: boolean;
  children: ReactNode;
  width?: string;
  style?: CSSProperties;
  title?: string;
}

function Modal({ onClose, title, show, children, width, style }: ModalProps) {
  return (
    <div>
      {show && (
        <ModalOverlay>
          <ModalContent width={width ?? ""} style={style}>
            <div className="modal_body">
              <ModalHeader>
                <h3>{title}</h3>
                <CloseButton onClick={onClose}>X</CloseButton>
              </ModalHeader>
              <ModalBody>{children}</ModalBody>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </div>
  );
}

export default Modal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
  overflow-y: scroll;
`;

const CloseButton = styled.button`
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  color: red;
  width: 30px;
  height: 30px;
  background: #dde1e7;
  box-shadow: -5px -5px 9px rgba(255, 255, 255, 0.45), 5px 5px 9px rgba(94, 104, 121, 0.3);
`;

interface ModalContentProps {
  width: string;
}
const ModalBody = styled.div`
  box-sizing: border-box;
`;
const ModalHeader = styled.div`
  padding: 10px 0px;
  display: flex;
  justify-content: space-between;
  height: 20px;
  margin-bottom: 1rem;
  align-items: center;
`;
const ModalContent = styled.div<ModalContentProps>`
  background-color: #fff;
  box-sizing: border-box;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  max-width: 500px;
  width: ${({ width }) => width || "95%"};
  padding: 20px 40px;

  .modal_body {
    width: 100%;
  }
  @media screen and (max-width: 760px) {
    padding: 15px 10px;

    .modal_body {
      width: 95%;
    }
  }
`;
