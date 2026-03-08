import prisma from "../database/prisma";

type CreateWaitlistLeadData = {
  name?: string;
  email: string;
  interest?: string;
};

export function createWaitlistLead(data: CreateWaitlistLeadData) {
  return prisma.waitlistLead.create({
    data: {
      name: data.name || null,
      email: data.email,
      interest: data.interest || "PRO",
    },
  });
}

export function findWaitlistLeadByEmail(email: string) {
  return prisma.waitlistLead.findUnique({
    where: { email },
  });
}