import type { Metadata } from "next";
import { readDb } from "@/lib/db";

export async function generateMetadata(): Promise<Metadata> {
  let branchCount = 1;
  let branchNames: string[] = [];

  try {
    const db = readDb();
    if (db?.branches?.length) {
      branchCount = db.branches.length;
      branchNames = db.branches.map((b) => b.nameRu);
    }
  } catch {}

  const branchList = branchNames.length > 0 ? branchNames.join(", ") : "Бектурова 4Г";
  const title = `Филиалы и пункты выдачи PROkateka в Астане — ${branchCount} точки`;
  const description = `${branchCount} пунктов выдачи строительного инструмента PROkateka в Астане: ${branchList}. Адреса, телефоны, режим работы, ссылки на 2GIS. Ежедневно с 08:00 до 20:00 без перерывов.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: "https://prokateka.kz/branches",
    },
    alternates: {
      canonical: "https://prokateka.kz/branches",
    },
  };
}

export default function BranchesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
