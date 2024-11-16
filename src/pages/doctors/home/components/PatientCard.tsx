import StatusCard from "@/components/statusPill/status-pill";
import { Patient } from "@/pages/patient/SymptomLogginApi";
import { OverallStatus } from "@/redux/symptoms/symptomSlice";
import { formatDateTime, getUserInitials } from "@/utils/utils";
import styled from "styled-components";

interface props {
  patient: Patient;
  setRecordId: (recordId: string) => void;
  toggleModal?: () => void;
  setApproved?: (isApproved: boolean) => void;
  setOverallStatus?: (overallStatus: OverallStatus) => void;
  setMedication?: (data: string) => void;
}

function PatientCard({ patient, setOverallStatus, setApproved, setMedication, setRecordId, toggleModal }: props) {
  const isApproved = String(patient.latestRecord?.response.doctor_approved).toLowerCase() === "true";
  const createdAt = patient.latestRecord?.createdAt;
  const lastRecordStatus = patient.latestRecord?.response.overall_status;
  return (
    <Card
      onClick={() => {
        setRecordId(patient?.latestRecord?._id ?? "");
        if (toggleModal) {
          toggleModal();
        }
        if (setApproved) {
          setApproved(isApproved);
        }
        if (setOverallStatus) {
          setOverallStatus(patient.latestRecord?.response.overall_status ?? "Caution");
        }
        if (setMedication) {
          setMedication(patient.latestRecord?.response.prescribe_medication ?? "");
        }
      }}
      key={patient._id}
    >
      <UserWrapper>
        <div className="initials">{getUserInitials(patient.fullname)}</div>
      </UserWrapper>
      <Info status={patient.latestRecord?.response.overall_status ?? ""}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>{patient.fullname}</p>
          <p>{<StatusCard status={isApproved} />}</p>
        </div>
        <p>Email: {patient.email}</p>
        <p className="status">Last Status: {lastRecordStatus ?? "NILL"}</p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <p>{formatDateTime(createdAt ?? "NILL")}</p>
        </div>
      </Info>
    </Card>
  );
}

export default PatientCard;

const UserWrapper = styled.div`
  width: 15%;
  padding-bottom: 15%; // This maintains the aspect ratio
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  background: #dde1e7;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  max-height: 120px;
  .initials {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: clamp(0.8rem, 2vw, 1.2rem); // Responsive font size
    font-weight: bold;
  }
`;

const Card = styled.div`
  display: flex;
  align-items: center;
  /* margin: 10px; */

  box-shadow: -5px -5px 9px rgba(255, 255, 255, 0.45), 5px 5px 9px rgba(94, 104, 121, 0.3);
  &:hover {
    border: none;
    box-shadow: inset -5px -5px 9px rgba(255, 255, 255, 0.45), inset 5px 5px 9px rgba(94, 104, 121, 0.3);
  }

  background: #dde1e7;
  /* box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px; */
  gap: 10px;
  padding: 10px 10px;
  height: 120px;
  max-width: 500px;
  border-radius: 5px;
  &:hover {
    border: none;
    box-shadow: inset -5px -5px 9px rgba(255, 255, 255, 0.45), inset 5px 5px 9px rgba(94, 104, 121, 0.3);
  }
  p {
    margin: 0px;
    padding: 0px;
    font-size: medium;
  }

  @media screen and (max-width: 768px) {
    p {
      font-size: 12px;
    }
  }
`;

interface InfoProps {
  status: string;
}
const Info = styled.div<InfoProps>`
  width: 80%;

  .status {
    ${({ status }) => {
      switch (status) {
        case "Caution":
          return `
              color: #856404;
            `;
        case "Stable":
          return `
              color: #0F5132;
            `;
        case "High Risk":
          return `
              color: #842029;
            `;
        default:
          return "";
      }
    }}
  }
`;
