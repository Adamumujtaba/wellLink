import Button from "@/components/Button/button";
import Modal from "@/components/modal/modal";
import { DoctorsApprovalRequest } from "@/pages/patient/SymptomLogginApi";
import { OverallStatus } from "@/redux/symptoms/symptomSlice";
import styled from "styled-components";
import { Select } from "../DoctorsDashboard";

interface modalProps {
  toggleModal: () => void;
  isModalOpen: boolean;
  recordId: string;
  isLoading: boolean;
  handleUpdate: (recordId: string) => void;
  isApproving: boolean;
  handleApprovalChange: (value: string) => void;
  setOverallStatus: (overallStatus: OverallStatus) => void;
  doctorsApproval: ({ doctors_approval, recordId, overall_status }: DoctorsApprovalRequest) => void;
  approved: boolean;
  medication: string;
  overallStatus: OverallStatus;
}

function ReviewModal({
  doctorsApproval,
  recordId,
  toggleModal,
  isModalOpen,
  approved,
  overallStatus,
  handleApprovalChange,
  setOverallStatus,
  medication,
  isApproving,
}: modalProps) {
  return (
    <Modal
      onClose={toggleModal}
      title={`Review and Approved ${overallStatus}`}
      show={isModalOpen}
      style={{ background: "#dde1e7" }}
    >
      <div>
        <TextArea value={medication} placeholder="Medication" />
        <div>
          <Select
            style={{ width: "100%" }}
            value={overallStatus}
            onChange={(e) => setOverallStatus(e.target.value as OverallStatus)}
          >
            <option value="">All</option>
            <option value="Stable">Stable</option>
            <option value="Caution">Caution</option>
            <option value="High Risk">Hig Risk</option>
          </Select>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "1rem 0px",
            alignItems: "center",
          }}
        >
          Approved Medication:
          <div style={{ display: "flex", margin: "1rem 0px", width: "200px" }}>
            <label style={labelStyle}>
              <input
                type="radio"
                name="approval"
                value="true"
                checked={approved === true}
                onChange={(e) => handleApprovalChange(e.target.value)}
                style={radioStyle}
              />
              <span>Yes</span>
            </label>
            <label style={labelStyle}>
              <input
                type="radio"
                name="approval"
                value="false"
                checked={approved === false}
                onChange={(e) => handleApprovalChange(e.target.value)}
                style={radioStyle}
              />
              <span>No</span>
            </label>
          </div>
        </div>
      </div>

      <StyledButton
        title={isApproving ? "Updating..." : "Update"}
        onClick={() => {
          doctorsApproval({ doctors_approval: approved, recordId, overall_status: overallStatus });
        }}
      />
    </Modal>
  );
}

export default ReviewModal;

const labelStyle = {
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  marginRight: "16px",
};

const radioStyle = {
  marginRight: "8px",
};

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

const TextArea = styled.textarea`
  background: #dde1e7;
  box-shadow: -5px -5px 9px rgba(255, 255, 255, 0.45), 5px 5px 9px rgba(94, 104, 121, 0.3);
  border: none;
  padding: 10px 20px;
  height: 80px;
  border-radius: 4px;
  margin: 1rem auto;
  color: #000;
  outline: none;
  font-size: medium;
  width: 100%;
  box-sizing: border-box;
`;
