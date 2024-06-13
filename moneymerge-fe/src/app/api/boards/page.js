"use client";
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/ybBhE9BgaOZ
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  PaginationPrevious,
  PaginationNext,
  PaginationItem,
  PaginationLink,
  PaginationContent,
  Pagination,
} from "@/components/ui/pagination";
import RootLayout from "../../../components/layout.js";
import { useState, useEffect } from "react";

export default function Component() {
  const [boards, setBoards] = useState([]);
  const [boardType, setBoardType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    let url = "http://localhost:8080/api/boards";
    let countUrl = "http://localhost:8080/api/boards/count";

    if (currentPage) {
      url += `?page=${currentPage}`;
    }
    if (boardType) {
      url += `&boardType=${boardType}`;
      countUrl += `?boardType=${boardType}`;
    }
    fetch(url)
      .then((result) => result.json())
      .then((result) => {
        setBoards(result.data);
      });

    fetch(countUrl)
      .then((result) => result.json())
      .then((result) => {
        setTotalPages(Math.ceil(result / 10));
      });
  }, [boardType, currentPage]);

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
              <h1 className="text-2xl font-bold w-[100px]">커뮤니티</h1>
            </Link>
          </div>
        </div>
        <main className="bg-white"
          style={{
            marginTop: "13px",
            height: "432px",
            overflow: "auto",
          }}>
          <div className="max-w-3xl p-4 space-y-6">
            <div>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  onClick={() => {
                    setBoardType(null);
                    handlePageChange(1);
                  }}
                >
                  {/* <ListIcon className="h-5 w-5 mr-2" /> */}
                  전체
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setBoardType("INFORMATION");
                    handlePageChange(1);
                  }}
                >
                  {/* <SignpostIcon className="h-5 w-5 mr-2" /> */}
                  정보 나눔
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setBoardType("CERTIFICATION");
                    handlePageChange(1);
                  }}
                >
                  인증
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setBoardType("FREE");
                    handlePageChange(1);
                  }}
                >
                  {/* <FileQuestionIcon className="h-5 w-5 mr-2" /> */}
                  자유
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Input
                    className="w-[200px]"
                    placeholder="검색어를 입력하세요"
                    type="text"
                  />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        <FilterIcon className="h-5 w-5 mr-2" />
                        검색 범위
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                      <DropdownMenuRadioGroup value="all">
                        <DropdownMenuRadioItem value="all">
                          전체
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="title">
                          제목
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="content">
                          내용
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="author">
                          작성자
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        <ArrowUpIcon className="h-5 w-5 mr-2" />
                        정렬
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                      <DropdownMenuRadioGroup value="latest">
                        <DropdownMenuRadioItem value="latest">
                          최신순
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="oldest">
                          오래된순
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="popular">
                          좋아요순
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="views">
                          댓글순
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button size="sm">검색</Button>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="px-4 py-3 text-left font-medium text-xs">
                      제목
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-xs">
                      종류
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-xs">
                      작성자
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-xs">
                      작성일
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-xs">
                      좋아요
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-xs">
                      댓글 수
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {boards &&
                    boards.map((row) => (
                      <tr className="border-b">
                        <td className="px-4 py-3">
                          <Link
                            className="font-medium hover:text-[#333] text-xs"
                            href={`/api/boards/${row.boardId}`}
                          >
                            {row.title}
                          </Link>
                        </td>
                        <td className="px-4 py-3">
                          <Badge
                            className="bg-[#f9f5e7] text-[#333] text-xs"
                            variant="secondary"
                          >
                            {row.boardType}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-xs">{row.author}</td>
                        <td className="px-4 py-3 text-xs">{row.createdAt}</td>
                        <td className="px-4 py-3 text-xs">{row.likes}</td>
                        <td className="px-4 py-3 text-xs">{row.comments}</td>
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
        <div
          className="absolute"
          style={{
            bottom: "-40px",
            right: "-40px",
          }}
        >
          <Link
            className="inline-flex h-12 items-center justify-center rounded-full bg-gray-900 px-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            href="/api/boards/create"
          >
            <PlusIcon className="h-5 w-5 mr-2" />글 작성
          </Link>
        </div>
      </div>
    </RootLayout>
  );
}

function ArrowLeftIcon(props) {
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
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

function ArrowUpIcon(props) {
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
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
  );
}

function ContactIcon(props) {
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
      <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <circle cx="12" cy="10" r="2" />
      <line x1="8" x2="8" y1="2" y2="4" />
      <line x1="16" x2="16" y1="2" y2="4" />
    </svg>
  );
}

function FileQuestionIcon(props) {
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
      <path d="M12 17h.01" />
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" />
      <path d="M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3" />
    </svg>
  );
}

function FilterIcon(props) {
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
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

function ListIcon(props) {
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
      <line x1="8" x2="21" y1="6" y2="6" />
      <line x1="8" x2="21" y1="12" y2="12" />
      <line x1="8" x2="21" y1="18" y2="18" />
      <line x1="3" x2="3.01" y1="6" y2="6" />
      <line x1="3" x2="3.01" y1="12" y2="12" />
      <line x1="3" x2="3.01" y1="18" y2="18" />
    </svg>
  );
}

function SignpostIcon(props) {
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
      <path d="M12 3v3" />
      <path d="M18.5 13h-13L2 9.5 5.5 6h13L22 9.5Z" />
      <path d="M12 13v8" />
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
