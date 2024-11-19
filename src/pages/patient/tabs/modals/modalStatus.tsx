import Button from "@/components/Button/button";
import Modal from "@/components/modal/modal";
import { OverallStatus } from "@/redux/symptoms/symptomSlice";
import styled from "styled-components";

interface modalProps {
  toggleModal: () => void;
  isModalOpen: boolean;
  feelings: OverallStatus;
  recordId: string;
  isLoading: boolean;
  handleUpdate: (recordId: string) => void;
  setFeelings: (feelings: OverallStatus) => void;
  setBookSession: (feelings: boolean) => void;
  bookSession: boolean;
}

function ModalStatus({
  toggleModal,
  isModalOpen,
  feelings,
  recordId,
  isLoading,
  handleUpdate,
  setFeelings,
  setBookSession,
  bookSession,
}: modalProps) {
  return (
    <Modal onClose={toggleModal} title="Update Your Condition" show={isModalOpen} style={{ background: "#dde1e7" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <label style={{ display: "flex", alignItems: "center" }}>
          <input
            type="radio"
            name="status"
            value="Stable"
            checked={feelings === "Stable"}
            onChange={(e) => setFeelings(e.target.value as OverallStatus)}
          />
          <span style={{ marginLeft: "0.5rem" }}>Healthy</span>
        </label>
        <label style={{ display: "flex", alignItems: "center" }}>
          <input
            type="radio"
            name="status"
            value="Caution"
            checked={feelings === "Caution"}
            onChange={(e) => setFeelings(e.target.value as OverallStatus)}
          />
          <span style={{ marginLeft: "0.5rem" }}>Needs Attention</span>
        </label>
        <label style={{ display: "flex", alignItems: "center" }}>
          <input
            type="radio"
            name="status"
            value="High Risk"
            checked={feelings === "High Risk"}
            onChange={(e) => setFeelings(e.target.value as OverallStatus)}
          />
          <span style={{ marginLeft: "0.5rem" }}>Urgent</span>
        </label>
        <hr />
        <label style={{ display: "flex", alignItems: "center" }}>
          <input
            type="checkbox"
            name="status"
            checked={bookSession}
            onChange={(e) => setBookSession(e.target.checked)}
          />
          <span style={{ marginLeft: "0.5rem" }}>Book a session</span>
        </label>
      </div>
      <StyledButton title="Update" disabled={isLoading} onClick={() => handleUpdate(recordId)} />
    </Modal>
  );
}

export default ModalStatus;

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
