import StatusCard from "@/components/statusPill/status-pill";
import styled from "styled-components";
import { ResponseResult, useDeleteRecordMutation, useUpdateStatusMutation } from "../SymptomLogginApi";
import { formatDateTime } from "@/utils/utils";
import { useEffect, useState } from "react";
import { OverallStatus } from "@/redux/symptoms/symptomSlice";
import ModalStatus from "./modals/modalStatus";
import Button from "@/components/Button/button";

interface HistoryProps {
  data: ResponseResult;
}

function History({ data }: HistoryProps) {
  const [updateStatus, { isLoading, isSuccess }] = useUpdateStatusMutation();
  const [deleteRecord, { isLoading: isDeleting }] = useDeleteRecordMutation();
  const [feelings, setFeelings] = useState<OverallStatus>("Stable");
  const [recordId, setRecordId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const handleUpdate = (id: string) => {
    console.log(id);
    updateStatus({
      recordId,
      overall_status: feelings,
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
              <StatusCard status={record.response.doctor_approved} />
            </div>
            <p>Symptoms: {record.response.symptoms}</p>
            <p>Prescribed Medication: {record.response.prescribe_medication}</p>
            <p>Status: {record.response.overall_status}</p>
            <p>Date: {formatDateTime(record.updatedAt)}</p>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                onClick={() => deleteRecord({ id: record._id })}
                title={isDeleting ? "Deleting..." : "Delete"}
                style={{ width: "100px", color: "red" }}
              />
              <Button
                onClick={() => {
                  toggleModal();
                  setFeelings(record.response.overall_status);
                  setRecordId(record._id);
                }}
                title="Update"
                style={{ width: "100px" }}
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
  padding: 1rem;
  margin: 0 auto;
`;
interface CardProps {
  status: "Caution" | "Stable" | "High Risk";
}
const CardHistory = styled.div<CardProps>`
  /* background: red; */
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  width: 300px;
  padding: 10px;
  margin: 0px;
  border-radius: 4px;
  cursor: pointer;

  ${({ status }) => {
    switch (status) {
      case "Caution":
        return `
            // background-color: #FFF5D9;
            border:3px solid #856404;
            background: #eeee;
            // color: #856404;
          `;
      case "Stable":
        return `
            background-color: #D1E7DD;
            color: #0F5132;
          `;
      case "High Risk":
        return `
            background-color: #F8D7DA;
            color: #842029;
            
          `;
      default:
        return "";
    }
  }}
`;
