import StatusCard from "@/components/statusPill/status-pill";
import styled from "styled-components";
import { ResponseResult, useDeleteRecordMutation, useUpdateStatusMutation } from "../SymptomLogginApi";
import { formatDateTime } from "@/utils/utils";
import { useEffect, useState } from "react";
import { OverallStatus } from "@/redux/symptoms/symptomSlice";
import ModalStatus from "./modals/modalStatus";
import Button from "@/components/Button/button";
import DeleteModal from "./modals/deleteModal";

interface HistoryProps {
  data: ResponseResult;
}

const truncateText = (text: string) => {
  if (!text) return "";
  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  const maxLength = isMobile ? 35 : 45;

  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

function History({ data }: HistoryProps) {
  const [updateStatus, { isLoading, isSuccess }] = useUpdateStatusMutation();
  const [deleteRecord, { isLoading: isDeleting, isSuccess: isDeleted }] = useDeleteRecordMutation();
  const [feelings, setFeelings] = useState<OverallStatus>("Stable");
  const [recordId, setRecordId] = useState("");
  const [bookSession, setBookSession] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleDeleteModal = () => setIsDeleteModalOpen(!isDeleteModalOpen);
  const handleUpdate = (id: string) => {
    console.log(id);
    updateStatus({
      recordId,
      overall_status: feelings,
      isScheduled: bookSession,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toggleModal();
    }
  }, [isSuccess]);

  return (
    <div>
      <Grid>
        {data?.data?.map((record, index) => (
          <CardHistory status={record.response.overall_status} key={record._id}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3>Record {++index}</h3>
              <StatusCard status={String(record.response.doctor_approved) === "true"} />
            </div>
            <p>
              <strong>Symptoms:</strong>
              {record.response.symptoms}
            </p>
            {/* <p className="medication"> Prescribed Medication: {record.response.prescribe_medication}</p> */}
            <p className="medication">
              <strong>Medication:</strong>

              {truncateText(record.response.prescribe_medication)}
            </p>
            <p>
              <strong>Status:</strong>
              {record.response.overall_status === "Caution" && "Needs Attention"}
              {record.response.overall_status === "Stable" && "Healthy"}
              {record.response.overall_status === "High Risk" && "Urgent"}
            </p>
            <p>
              <strong>Date:</strong>
              {formatDateTime(record.updatedAt)}
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                // onClick={() => deleteRecord({ id: record._id })}
                onClick={() => {
                  toggleDeleteModal();
                  setRecordId(record._id);
                }}
                title={isDeleting ? "Deleting..." : "Delete"}
                style={{
                  width: "100px",
                  background: "#dde1e7",
                  boxShadow: " -5px -5px 9px rgba(255, 255, 255, 0.45), 5px 5px 9px rgba(29, 29, 29, 0.3)",
                  color: "red",
                }}
              />

              <Button
                onClick={() => {
                  toggleModal();
                  setFeelings(record.response.overall_status);
                  setRecordId(record._id);
                }}
                title="Update"
                style={{
                  width: "100px",
                  background: "#dde1e7",
                  boxShadow: " -5px -5px 9px rgba(255, 255, 255, 0.45), 5px 5px 9px rgba(94, 104, 121, 0.3)",
                }}
              />
            </div>
          </CardHistory>
        ))}
      </Grid>

      <ModalStatus
        feelings={feelings}
        handleUpdate={handleUpdate}
        recordId={recordId}
        setFeelings={setFeelings}
        toggleModal={toggleModal}
        isLoading={isLoading}
        isModalOpen={isModalOpen}
        setBookSession={setBookSession}
        bookSession={bookSession}
      />
      <DeleteModal
        isLoading={isDeleting}
        deleteRecord={deleteRecord}
        recordId={recordId}
        isSuccess={isDeleted}
        isModalOpen={isDeleteModalOpen}
        toggleModal={toggleDeleteModal}
      />
    </div>
  );
}

export default History;

const Grid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
  width: 100%;
  padding: 2rem 0px;
  margin: 0 auto;
`;
interface CardProps {
  status: "Caution" | "Stable" | "High Risk";
}
const CardHistory = styled.div<CardProps>`
  background: #dde1e7;
  box-shadow: -5px -5px 9px rgba(255, 255, 255, 0.45), 5px 5px 9px rgba(94, 104, 121, 0.3);
  max-width: 500px;
  padding: 10px;
  margin: 0px;
  border-radius: 4px;
  position: relative;
  text-align: justify;
  cursor: pointer;
  min-height: 170px;
  .medication {
    /* background: red; */
    /* max-height: 50px; */
  }
  strong {
    padding: 0px 10px 0px 0px;
  }

  h3 {
    ${({ status }) => {
      switch (status) {
        case "Caution":
          return `
            // background-color: #FFF5D9;
            // border:3px solid #856404;
            // background: #eeee;
            color: #856404;
          `;
        case "Stable":
          return `
            // background-color: #D1E7DD;
            color: #0F5132;
          `;
        case "High Risk":
          return `
            // background-color: #F8D7DA;
            color: #842029;
            
          `;
        default:
          return "";
      }
    }}
  }
  @media screen and (max-width: 600px) {
    height: auto;
  }
`;
