import Button from "@/components/Button/button";
import Modal from "@/components/modal/modal";
import { useEffect } from "react";
import styled from "styled-components";

interface modalProps {
  toggleModal: () => void;
  isModalOpen: boolean;
  isLoading: boolean;
  deleteRecord: ({ id }: { id: string }) => void;
  recordId: string;
  isSuccess: boolean;
}

function DeleteModal({ toggleModal, isSuccess, deleteRecord, isModalOpen, recordId, isLoading }: modalProps) {
  useEffect(() => {
    if (isSuccess) {
      toggleModal();
    }
  }, [isSuccess]);

  return (
    <Modal onClose={toggleModal} title="Delete Medical Records" show={isModalOpen} style={{ background: "#dde1e7" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <p>Are you sure you want to delete your medical records? This action cannot be undone.</p>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around", gap: 20 }}>
        <StyledButton
          title={isLoading ? "Deleting..." : "Delete"}
          style={{ color: "red" }}
          disabled={isLoading}
          onClick={() => deleteRecord({ id: recordId })}
        />
        <StyledButton title="Cancel" onClick={toggleModal} />
      </div>
    </Modal>
  );
}

export default DeleteModal;

const StyledButton = styled(Button)`
  background: #dde1e7;
  /* width: 100; */
  margin: 2rem 0px;
  color: #3e98c7;
  box-shadow: -5px -5px 9px rgba(255, 255, 255, 0.45), 5px 5px 9px rgba(94, 104, 121, 0.3);

  &:hover {
    border: none;
    box-shadow: inset -5px -5px 9px rgba(255, 255, 255, 0.45), inset 5px 5px 9px rgba(94, 104, 121, 0.3);
  }
`;
