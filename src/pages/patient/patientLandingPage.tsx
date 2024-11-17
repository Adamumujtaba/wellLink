import Modal from "@/components/modal/modal";
import { useState } from "react";
import SymptomsForm from "./symptomsForm";
import { usePostSymptomMutation, useRecordsQuery } from "./SymptomLogginApi";
import CardDetails from "./CardDetails";
import { useUserSlice } from "@/redux/auth/authSlice";
import styled from "styled-components";
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/loading.json";
import { TabButton, TabContainer, TabPanel } from "@/components/tab";
import Dashboard from "./tabs/dashboard";
import History from "./tabs/history";
import Skeleton from "react-loading-skeleton";
import { capitalizeFirstLetterOFEachWord } from "@/utils/utils";

function Landing() {
  const { user } = useUserSlice();
  const [formModal, setFormModal] = useState(false);
  const [handlePostSymptoms, { isLoading, isSuccess }] = usePostSymptomMutation();
  const { data, isLoading: isLoadingRecord } = useRecordsQuery({ id: user.id, status: "all" });
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleTabSwitch = (val: string) => setActiveTab(val);
  const toggleFormModal = () => {
    setFormModal(!formModal);
  };

  return (
    <div>
      <h2>Welcome {capitalizeFirstLetterOFEachWord(user.fullname)}</h2>
      <CallToActionButton onClick={toggleFormModal}>Check-in </CallToActionButton>
      <TabContainer>
        <TabButton active={activeTab === "dashboard"} onClick={() => handleTabSwitch("dashboard")}>
          Dashboard
        </TabButton>
        <TabButton active={activeTab === "history"} onClick={() => handleTabSwitch("history")}>
          History
        </TabButton>
      </TabContainer>
      {isLoadingRecord || isLoading ? (
        <div>
          <Skeleton count={1} width="100%" height="70vh" />
        </div>
      ) : data?.data.length ? (
        <>
          <TabPanel active={activeTab === "dashboard"}>
            <Dashboard />
          </TabPanel>

          <TabPanel active={activeTab === "history"}>
            {isLoadingRecord ? (
              <>
                <div>
                  <Lottie animationData={loadingAnimation} style={{ height: "50vh" }} loop={true} />
                </div>
              </>
            ) : (
              <History data={data} />
            )}
          </TabPanel>
        </>
      ) : (
        <div
          style={{
            maxWidth: "500px",
            width: "90%",
            margin: "3rem auto",
            padding: "2rem",
            background: "#dde1e7",
            borderRadius: "5px",
            boxShadow: " rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px ",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>
            Welcome to our health assistant app! This app helps you track your symptoms and receive AI-generated health
            insights, including possible medication suggestions. Any suggested medication will be reviewed by our
            doctors, who can update and approve it to ensure safety. Please wait for a doctor’s approval before
            following any medication advice.
            <br />
            <br />
          </p>
        </div>
      )}

      <Modal
        onClose={toggleFormModal}
        style={{ background: "#dde1e7" }}
        title={isSuccess ? "Result" : "Health Status "}
        show={formModal}
      >
        {isSuccess ? (
          <CardDetails />
        ) : (
          <SymptomsForm isSuccess={isSuccess} isLoading={isLoading} handlePostSymptoms={handlePostSymptoms} />
        )}
      </Modal>
    </div>
  );
}

export default Landing;

const CallToActionButton = styled.button`
  all: unset;
  padding: 10px;
  border-radius: 4px;
  background: #dde1e7;
  box-shadow: -5px -5px 9px rgba(255, 255, 255, 0.45), 5px 5px 9px rgba(94, 104, 121, 0.3);
  font-weight: 800;
  color: #3e98c7;
  float: right;
  margin-bottom: 1rem;
  &:hover {
    border: none;
    box-shadow: inset -5px -5px 9px rgba(255, 255, 255, 0.45), inset 5px 5px 9px rgba(94, 104, 121, 0.3);
  }
`;
