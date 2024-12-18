import { Patient, useDoctorsApprovalMutation, usePatientsQuery } from "@/pages/patient/SymptomLogginApi";
import { useUserSlice } from "@/redux/auth/authSlice";
import { capitalizeFirstLetterOFEachWord } from "@/utils/utils";
import { User } from "iconsax-react";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useDebounce } from "react-use";
import styled from "styled-components";
import PatientCard from "./components/PatientCard";
import { OverallStatus } from "@/redux/symptoms/symptomSlice";
import ReviewModal from "./modals/reviewModal";

function DoctorsDashboard() {
  const [name, setName] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [searchName, setSearchName] = useState("");
  const [recordId, setRecordId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const [approved, setApproved] = useState<boolean>(false);
  const [medication, setMedication] = useState("");
  const [patientRecord, setPatientRecord] = useState<Patient | null>(null);
  const [overallStatus, setOverallStatus] = useState<OverallStatus>("Caution");
  const { user } = useUserSlice();

  useDebounce(
    () => {
      setSearchName(name);
    },
    2000,
    [name]
  );
  const { data, isLoading, refetch } = usePatientsQuery({ search: searchName, status: filterStatus });
  const [doctorsApproval, { isLoading: isApproving, isSuccess: isApprovedSuccess }] = useDoctorsApprovalMutation();
  const handleApprovalChange = (value: string) => {
    setApproved(value === "true");
  };

  useEffect(() => {
    if (isApprovedSuccess) {
      toggleModal();
      refetch();
    }
  }, [isApprovedSuccess]);

  return (
    <div>
      <h4 style={{ marginBottom: "1rem" }}>Welcome {capitalizeFirstLetterOFEachWord(user.fullname)} </h4>
      <h5 style={{ marginBottom: "1rem" }}>{capitalizeFirstLetterOFEachWord("Doctors")} </h5>

      {isLoading ? (
        <Skeleton count={1} baseColor="#cdd6de33" highlightColor="#5a626833" width="500px" height="120px" />
      ) : (
        <Card>
          <User size={40} />
          <p>Total Patients </p>
          <p className="number">{data?.data?.length ?? 0}</p>
        </Card>
      )}

      <FilterDiv>
        <Input placeholder="Search by name or email" onChange={(e) => setName(e.target.value)} />
        <Select onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="">
            All
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              style={{ marginLeft: "5px", verticalAlign: "middle" }}
            >
              <path fill="red" d="M7 10l5 5 5-5z" />
            </svg>
          </option>
          <option value="Stable">Healthy</option>
          <option value="Caution">Needs Attention</option>
          <option value="High Risk">Urgent</option>
        </Select>
      </FilterDiv>
      <Grid>
        {isLoading ? (
          [1, 2, 3, 4].map((el) => (
            <Skeleton
              key={el}
              count={1}
              baseColor="#cdd6de33"
              highlightColor="#5a626833"
              width="500px"
              height="120px"
            />
          ))
        ) : data?.data.length ? (
          data?.data?.map((patient) => {
            return (
              <PatientCard
                toggleModal={toggleModal}
                setRecordId={setRecordId}
                patient={patient}
                setApproved={setApproved}
                setMedication={setMedication}
                setOverallStatus={setOverallStatus}
                setPatientRecord={setPatientRecord}
              />
            );
          })
        ) : (
          <>
            <div style={{ textAlign: "center", padding: "50px", color: "#555" }}>
              <h2>No data available</h2>
            </div>
          </>
        )}
      </Grid>
      <div>
        <ReviewModal
          approved={approved}
          recordId={recordId}
          medication={medication}
          setMedication={setMedication}
          toggleModal={toggleModal}
          isModalOpen={isModalOpen}
          overallStatus={overallStatus}
          handleApprovalChange={handleApprovalChange}
          setOverallStatus={setOverallStatus}
          doctorsApproval={doctorsApproval}
          isLoading={false}
          patient={patientRecord}
          handleUpdate={function (): void {
            throw new Error("Function not implemented.");
          }}
          isApproving={isApproving}
        />
      </div>
    </div>
  );
}

export default DoctorsDashboard;

const FilterDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 1rem 0px;
`;
const Card = styled.div`
  max-width: 240px;
  padding: 1rem;
  border-radius: 5px;
  background: #dde1e7;
  border: 1px solid rgba(94, 104, 121, 0.3);
  /* box-shadow: -5px -5px 9px rgba(255, 255, 255, 0.45), 5px 5px 9px rgba(94, 104, 121, 0.3); */
  .number {
    font-size: x-large;
    font-weight: 600;
  }
`;
const Grid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
  justify-content: space-around;
  width: 100%;
  padding: 1rem 0px;
  margin: 0 auto;
`;

export const Input = styled.input`
  background: #dde1e7;
  /* box-shadow: -5px -5px 9px rgba(255, 255, 255, 0.45), 5px 5px 9px rgba(94, 104, 121, 0.3); */
  box-shadow: inset -5px -5px 9px rgba(255, 255, 255, 0.45), inset 5px 5px 9px rgba(94, 104, 121, 0.3);

  border: none;
  padding: 10px 20px;
  height: 30px;
  border-radius: 4px;
  color: #000;
  outline: none;
  font-size: medium;
  width: 60%;
`;
// export const Select = styled.select`
//   background: #dde1e7;
//   box-shadow: -5px -5px 9px rgba(255, 255, 255, 0.45), 5px 5px 9px rgba(94, 104, 121, 0.3);
//   appearance: none;
//   -webkit-appearance: none;
//   -moz-appearance: none;
//   &:hover {
//     border: none;
//     box-shadow: inset -5px -5px 9px rgba(255, 255, 255, 0.45), inset 5px 5px 9px rgba(94, 104, 121, 0.3);
//   }
//   border: none;
//   padding: 10px;
//   border-radius: 5px;
//   outline: none;
//   color: #000;
// `;

export const Select = styled.select`
  background: #dde1e7;
  box-shadow: -5px -5px 9px rgba(255, 255, 255, 0.45), 5px 5px 9px rgba(94, 104, 121, 0.3);
  &:hover {
    border: none;
    box-shadow: inset -5px -5px 9px rgba(255, 255, 255, 0.45), inset 5px 5px 9px rgba(94, 104, 121, 0.3);
  }
  border: none;
  padding: 10px;
  border-radius: 5px;
  outline: none;
  color: #000;
`;
