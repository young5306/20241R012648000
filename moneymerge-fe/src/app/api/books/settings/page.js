"use client";
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/0c9vh5jQgPE
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import RootLayout from "../../../../components/layout.js";
import { useState, useEffect } from "react";

export default function Component() {
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/books", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((result) => result.json())
      .then((result) => {
        console.log("Received book data:", result.data);
        setBookList(result.data);
      })
      .catch((error) => console.error("Error fetching book data:", error));
  }, []);

  return (
    <RootLayout>
      <div className="bg-[#ffffff] text-[#333] w-full h-full flex flex-col overflow-auto">
        <div className="px-4 flex items-center justify-between">
          <div
            className="flex items-center gap-4"
            style={{ position: "absolute", top: "-45px" }}
          >
            <h1 className="text-2xl font-bold">가계부 환경설정</h1>
          </div>
        </div>
        <main
          className="bg-white"
          style={{
            marginTop: "13px",
            height: "432px",
            overflow: "auto",
          }}
        >
          <div className="grid gap-6 max-w-6xl w-full mx-auto">
            {bookList &&
              bookList.map((row) => (
                <Card>
                  <CardContent>
                    <div className="flex items-center justify-between mt-4">
                      <CardTitle>{row.bookTitle}</CardTitle>
                      <Link
                        className="text-primary"
                        href={`/api/books/${row.bookId}/settings`}
                      >
                        <PencilIcon className="w-5 h-5" />
                        <span className="sr-only">Edit Personal Budget</span>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </main>
      </div>
    </RootLayout>
  );
}

function FrameIcon(props) {
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
      <line x1="22" x2="2" y1="6" y2="6" />
      <line x1="22" x2="2" y1="18" y2="18" />
      <line x1="6" x2="6" y1="2" y2="22" />
      <line x1="18" x2="18" y1="2" y2="22" />
    </svg>
  );
}

function PencilIcon(props) {
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
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
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
