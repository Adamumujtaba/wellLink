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
            <StatsCard title="Healthy" total={stats?.data?.statusCounts[1]?.count} type="stable" />
            <StatsCard title="Need Attention" total={stats?.data.statusCounts[0]?.count} type="caution" />
            <StatsCard title="Urgent" total={stats?.data?.statusCounts[2]?.count} type="risk" />
          </>
        )}
      </Grid>
    </div>
  );
}

export default Dashboard;

const Grid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 100px), 1fr));
  width: 100%;
  margin: 2rem auto;
  box-sizing: border-box;

  @media (max-width: 657px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 321px) {
    grid-template-columns: 1fr;
  }
`;
