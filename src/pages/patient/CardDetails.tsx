import styled from "styled-components";
import { useSymptomsSlice } from "@/redux/symptoms/symptomSlice";

function CardDetails() {
  const { prescribe_medication, next_steps, overall_status, recommendations } = useSymptomsSlice();

  return (
    <div>
      <Card>
        <CardHeader status={overall_status}>
          {overall_status === "Caution" && "Needs Attention"}
          {overall_status === "Stable" && "Healthy"}
          {overall_status === "High Risk" && "Urgent"}
        </CardHeader>
        <div className="main">
          <p className="title">Recommendation</p>
          {recommendations}
        </div>
        <hr />
        <div className="main">
          <p className="title">Medication</p>
          {prescribe_medication}
        </div>
        <hr />
        <div className="main">
          <p className="title">Next Steps</p>
          {next_steps}
        </div>
      </Card>
    </div>
  );
}

export default CardDetails;

interface HeaderProps {
  status: "Caution" | "Stable" | "High Risk";
}

const CardHeader = styled.div<HeaderProps>`
  padding: 10px;
  border-radius: 3px;
  margin-bottom: 10px;

  ${({ status }) => {
    switch (status) {
      case "Caution":
        return `
            background-color: #FFF5D9;
            color: #856404;
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
const Card = styled.div`
  background: #fff;
  max-width: 500px;
  /* border: 1px solid black; */
  padding: 10px;
  font-size: small;

  border-radius: 4px;
  margin: 40px auto;
  text-align: justify;
  .main {
    padding: 20px 10px 5px 10px;
    position: relative;
  }
  .title {
    position: absolute;
    top: 0px;
    left: 10px;
    font-size: small;
    background: lightgray;
    border-radius: 4px;
    margin: 0px;
    text-align: center;
    padding: 0px 4px;
  }
`;
