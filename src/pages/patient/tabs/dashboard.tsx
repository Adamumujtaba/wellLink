import { TypeAnimation } from "react-type-animation";
import StatsCard from "../components/dashboardCard";
import styled from "styled-components";
import { useRecordsStatsQuery } from "../SymptomLogginApi";
import { useUserSlice } from "@/redux/auth/authSlice";
import Skeleton from "react-loading-skeleton";

function Dashboard() {
  const { user } = useUserSlice();
  const { data: stats, isLoading } = useRecordsStatsQuery({ id: user.id });

  return (
    <div>
      <Grid>
        {isLoading ? (
          [1, 2, 3, 4].map((el) => (
            <Skeleton
              key={el}
              count={1}
              baseColor="#cdd6de33"
              highlightColor="#5a626833"
              width="220px"
              height="189px"
            />
          ))
        ) : (
          <>
            <StatsCard title="Total" total={stats?.data?.totalRecords} type="total" />
            <StatsCard title="Stable" total={stats?.data?.statusCounts[1]?.count} type="stable" />
            <StatsCard title="Caution" total={stats?.data.statusCounts[0]?.count} type="caution" />
            <StatsCard title="Risk" total={stats?.data?.statusCounts[2]?.count} type="risk" />
          </>
        )}
      </Grid>
      <TypeAnimation
        sequence={[
          "Welcome to WellLink! Track your symptoms, get personalized health insights, and receive recommendations on how to manage your wellness.",
          1000, // wait 1s before changing to the next step
          "If needed, our AI will guide you on when to consult a doctor.",
          1000,
        ]}
        wrapper="span"
        speed={50}
        style={{ display: "inline-block" }}
        repeat={Infinity}
      />
    </div>
  );
}

export default Dashboard;

const Grid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
  width: 100%;
  padding: 1rem;
  margin: 0 auto;
`;
