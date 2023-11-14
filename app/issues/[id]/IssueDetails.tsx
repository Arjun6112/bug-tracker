"use client";
import { IssueStatusBadge } from "@/app/components";
import { Issue, Status } from "@prisma/client";
import { Card, Flex, Heading, Select, Text } from "@radix-ui/themes";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex className="space-x-3" my="2">
        <ChangeStatus issue={issue} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose max-w-full mt-5">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
};

const ChangeStatus = ({ issue }: { issue: Issue }) => {
  const changeStatus = (status: String) => {
    axios
      .patch("/api/issues/" + issue.id, {
        status,
      })
      .catch((err) => {
        toast.error("Changes could not be saved");
      });
  };
  return (
    <Select.Root
      defaultValue={issue.status}
      onValueChange={(status) => changeStatus(status)}
    >
      <Select.Trigger />
      <Select.Content>
        {Object.values(Status).map((status) => (
          <Select.Item key={status} value={status}>
            <IssueStatusBadge status={status} />
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueDetails;
