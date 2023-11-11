import prisma from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";

export default async function Home() {
  const openIssues = await prisma.issue.count({
    where: {
      status: "OPEN",
    },
  });

  const closedIssues = await prisma.issue.count({
    where: {
      status: "DONE",
    },
  });

  const inProgressIssues = await prisma.issue.count({
    where: {
      status: "IN_PROGRESS",
    },
  });

  return (
    <>
      <Grid gap="5" columns={{ initial: "1", md: "2" }} className="m-5 mb-5">
        <Flex gap="5" direction="column">
          <IssueSummary
            open={openIssues}
            closed={closedIssues}
            inProgress={inProgressIssues}
          />

          <IssueChart
            open={openIssues}
            closed={closedIssues}
            inProgress={inProgressIssues}
          />
        </Flex>
        <LatestIssues />
      </Grid>
    </>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "Overview and insights",
};

export const dynamic = "force-dynamic";
