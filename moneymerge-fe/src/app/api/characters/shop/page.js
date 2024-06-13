/**
 * v0 by Vercel.
 * @see https://v0.dev/t/fxAJad4S0X2
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";
import Link from "next/link";
import RootLayout from "../../../../components/layout.js";
import { useState, useEffect } from "react";
import {
  PaginationPrevious,
  PaginationNext,
  PaginationItem,
  PaginationLink,
  PaginationContent,
  Pagination,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";

export default function Component() {
  const [character, setCharacter] = useState({});
  const [myCharacterList, setMyCharacterList] = useState([]);
  const [characterList, setCharacterList] = useState([]);
  const [point, setPoint] = useState(0);
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
    let url = "http://localhost:8080/api/characters/shop";

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
        console.log("characterList" + result.data);
        setCharacterList(result.data.content);
        setTotalPages(result.data.totalPages);
      });
  }, [currentPage]);

  useEffect(() => {
    let url = "http://localhost:8080/api/characters/own";

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((result) => result.json())
      .then((result) => {
        console.log("myCharacterList" + result.data);
        setMyCharacterList(result.data.characterList);
      });
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

  const PerchaseCharacter = (characterId) => {
    if (myCharacterList.includes(characterId)) {
      alert("이미 소유 중인 캐릭터입니다.");
      return;
    }

    fetch("http://localhost:8080/api/characters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ characterId }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.statusCode === 0) {
          window.location.reload();
        } else {
          const errorMessage = response.message;
          console.error(errorMessage);
          alert(errorMessage);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <RootLayout>
      <div className="bg-[#ffffff] text-[#333] w-full h-full flex flex-col overflow-auto">
        <div className="px-4 flex items-center justify-between">
          <div
            className="flex items-center gap-4"
            style={{ position: "absolute", top: "-45px" }}
          >
            <Link className="flex items-center gap-2" href="/api/characters">
              <h1 className="text-2xl font-bold">캐릭터 상점</h1>
            </Link>
          </div>
        </div>
        <main
          style={{
            height: "432px",
            width: "100%",
          }}
        >
          <div>
            <div className="flex flex-col w-full justify-center items-center gap-4">
              <div className="flex flex-col items-center mb-8">
                <img
                  alt="Product Image"
                  className="object-cover rounded-full mb-4 mt-4"
                  height="200px"
                  src={character.image}
                  width="200px"
                />
                <p>현재 캐릭터: {character.name}</p>
                <p>포인트: {point}p</p>
              </div>
              <div className="flex w-full justify-center">
                <div className="mt-4">캐릭터 내역</div>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-4 ml-8 mr-8">
                {characterList &&
                  characterList.map((row) => (
                    <div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
                      <img
                        alt="Product 1"
                        className="aspect-[4/4] object-cover w-full"
                        src={row.image}
                      />
                      <div className="bg-white p-4 dark:bg-gray-950">
                        <h3 className="font-bold text-lg">{row.name}</h3>
                        <h3 className="font-bold text-lg">{row.points}p</h3>
                        <Button
                          className="mt-2 bg-[#ffafbc] hover:bg-[#facc15] text-[#1f1f1f] dark:bg-[#fde047] dark:hover:bg-[#facc15] dark:text-[#1f1f1f]"
                          size="sm"
                          onClick={() => PerchaseCharacter(row.characterId)}
                        >
                          {myCharacterList.includes(row.characterId)
                            ? "소유 중"
                            : "구매"}
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
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
