import { useUserSlice } from "@/redux/auth/authSlice";
import { capitalizeFirstLetterOFEachWord } from "@/utils/utils";
import { User } from "iconsax-react";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useDebounce } from "react-use";
import styled from "styled-components";
import { useUsersQuery } from "../patient/SymptomLogginApi";

function AdminDashboard() {
  const [name, setName] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [searchName, setSearchName] = useState("");

  const { user } = useUserSlice();

  useDebounce(
    () => {
      setSearchName(name);
    },
    2000,
    [name]
  );
  const { data, isLoading } = useUsersQuery({ name: searchName, status: filterStatus });

  return (
    <div>
      <h4 style={{ marginBottom: "1rem" }}>Welcome {capitalizeFirstLetterOFEachWord(user.fullname)} </h4>
      <h5 style={{ marginBottom: "1rem" }}>Super Admin</h5>
      {isLoading ? (
        <Skeleton count={1} baseColor="#cdd6de33" highlightColor="#5a626833" width="500px" height="120px" />
      ) : (
        <Card>
          <User size={40} />
          <p>Total Users </p>
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
          <option value="doctor">Doctors</option>
          <option value="patient">Patient</option>
          <option value="admin">Admin</option>
        </Select>
      </FilterDiv>
      <>
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
          <Table>
            <thead>
              <tr>
                <th>S/N</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((user, index) => (
                <tr key={user._id}>
                  <td>{++index}</td>
                  <td>{capitalizeFirstLetterOFEachWord(user.fullname)}</td>
                  <td>{user.email}</td>
                  <td>{capitalizeFirstLetterOFEachWord(user.role)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <div style={{ textAlign: "center", padding: "50px", color: "#555" }}>
            <h2>No data available</h2>
          </div>
        )}
      </>
    </div>
  );
}

export default AdminDashboard;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #a2a0a03b;
  border-radius: 18px;
  thead tr th {
    background-color: #aeb6b62b;
    border: 1px solid #ddd;
    padding: 8px;
    color: #000;
    text-align: left;
  }
  tr td {
    border: 1px solid #3096652b;
    padding: 8px;
    text-align: left;
  }
`;

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
