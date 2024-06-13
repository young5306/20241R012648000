"use client";
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/99Qgkbq6jqE
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button";
import Link from "next/link";
import RootLayout from "../../../components/layout.js";
import { useState, useEffect } from "react";
import {
  PaginationPrevious,
  PaginationNext,
  PaginationItem,
  PaginationLink,
  PaginationContent,
  Pagination,
} from "@/components/ui/pagination";

export default function Component() {
  const [character, setCharacter] = useState({});
  const [point, setPoint] = useState(0);
  const [pointLog, setPointLog] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetch("http://localhost:8080/api/users/character", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((result) => result.json())
      .then((result) => {
        console.log("Received character data:", result.data);
        setCharacter(result.data);
      })
      .catch((error) => console.error("Error fetching character data:", error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/users/point", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((result) => result.json())
      .then((result) => {
        console.log("Received point data:", result.data);
        setPoint(result.data.points);
      })
      .catch((error) => console.error("Error fetching point data:", error));
  }, []);

  useEffect(() => {
    let url = "http://localhost:8080/api/points";

    if (currentPage) {
      url += `?page=${currentPage}`;
    }

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((result) => result.json())
      .then((result) => {
        console.log(result.data);
        setPointLog(result.data.content);
        setTotalPages(result.data.totalPages);
      });
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <RootLayout>
      <div className="bg-[#ffffff] text-[#333] w-full h-full flex flex-col overflow-auto">
        <div className="px-4 flex items-center justify-between">
          <div
            className="flex items-center gap-4"
            style={{ position: "absolute", top: "-45px" }}
          >
            <Link className="flex items-center gap-2" href="/api/boards">
              <h1 className="text-2xl font-bold w-[100px]">내 포인트</h1>
            </Link>
          </div>
        </div>
        <main
          style={{
            height: "432px",
            width: "100%",
          }}
        >
          <div className="flex w-full justify-center">
            <img
              className="w-[200px] h-[200px] rounded-full mt-4"
              src={character.image}
            />
          </div>
          <div
            className="flex w-full justify-center gap-4"
            style={{ marginTop: 40 }}
          >
            <p style={{ marginTop: 5 }}>내 캐릭터: {character.name}</p>
            <Link className="flex items-center gap-2" href="/api/characters">
              <Button size="sm" variant="outline">
                변경
              </Button>
            </Link>
            <Link
              className="flex items-center gap-2"
              href="/api/characters/shop"
            >
              <Button size="sm" variant="outline">
                구매
              </Button>
            </Link>
          </div>
          <div className="flex w-full justify-center">
            <div className="mt-4">내 포인트: {point}</div>
          </div>
          <div className="mt-8 w-full">
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="px-4 py-3 text-left font-medium text-xs">
                      날짜
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-xs">
                      포인트
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-xs">
                      내역
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pointLog &&
                    pointLog.map((row) => (
                      <tr className="border-b">
                        <td className="px-4 py-3 text-xs">{row.createdAt}</td>
                        <td className="px-4 py-3 text-xs">{row.points}</td>
                        <td className="px-4 py-3 text-xs">{row.detail}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <PaginationItem key={i + 1}>
                      <PaginationLink
                        href="#"
                        isActive={currentPage === i + 1} // 현재 페이지 버튼 활성화
                        onClick={() => handlePageChange(i + 1)}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </main>
      </div>
    </RootLayout>
  );
}

function ClockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function MinusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
    </svg>
  );
}

function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function RocketIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}
