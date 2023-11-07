import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { stat } from "fs";
import { issueSchema } from "../../validationSchemas";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { message: "You must be signed in to create an issue" },
      { status: 401 }
    );
  }

  const body = await request.json();

  const validation = issueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.desc },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
