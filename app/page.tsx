import prisma from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";

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
    <IssueSummary
      open={openIssues}
      closed={closedIssues}
      inProgress={inProgressIssues}
    />
  );
}
