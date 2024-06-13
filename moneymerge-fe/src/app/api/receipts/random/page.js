"use client";
import RootLayout from "../../../../components/layout.js";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Component() {
  const [receipts, setReceipts] = useState([]);

  useEffect(() => {
    let url = "http://localhost:8080/api/receipts/random";

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.statusCode === 0) {
          setReceipts(response.data.receiptIdList);
          console.log(response.data.receiptIdList);
        } else {
          const errorMessage = response.message;
          console.error(errorMessage);
          alert(errorMessage);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handlePickReceipt = (index) => {
    if (index > receipts.length) {
      alert("꽝~");
    }
    console.log(receipts[index - 1]);

    fetch("http://localhost:8080/api/receipts/random", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(receipts[index - 1]),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.statusCode === 0) {
          alert("익명의 영수증 도착!");
        } else {
          const errorMessage = response.message;
          console.error(errorMessage);
          alert(errorMessage);
        }
        window.location.href = "/";
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
            <Link className="flex items-center gap-2" href="/">
              <h1 className="text-2xl font-bold">영수증 뽑기</h1>
            </Link>
          </div>
        </div>
        <main
          className="bg-white flex"
          style={{
            justifyContent: "center",
            marginTop: "40px",
            height: "432px",
            overflow: "auto",
          }}
        >
          <div className="grid grid-cols-3 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8 ml-8 mr-8">
            <div
              className="cursor-pointer"
              onClick={() => handlePickReceipt(1)}
            >
              <PinkFolder />
            </div>
            <div
              className="cursor-pointer"
              onClick={() => handlePickReceipt(2)}
            >
              <BlueFolder />
            </div>
            <div
              className="cursor-pointer"
              onClick={() => handlePickReceipt(3)}
            >
              <PinkFolder />
            </div>
            <div
              className="cursor-pointer"
              onClick={() => handlePickReceipt(4)}
            >
              <BlueFolder />
            </div>
            <div
              className="cursor-pointer"
              onClick={() => handlePickReceipt(5)}
            >
              <PinkFolder />
            </div>
            <div
              className="cursor-pointer"
              onClick={() => handlePickReceipt(6)}
            >
              <BlueFolder />
            </div>
          </div>
        </main>
      </div>
    </RootLayout>
  );
}

function BlueFolder() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="146"
      height="125"
      fill="none"
    >
      <rect
        width="53.183"
        height="84.163"
        x="20.528"
        y="40.837"
        fill="#FFD84D"
        rx="10"
      />
      <rect
        width="112.431"
        height="65.344"
        x="20.528"
        y="59.656"
        fill="#FFD84D"
        rx="10"
      />
      <rect
        width="29.224"
        height="41.527"
        x="-.394"
        y="-.609"
        fill="#5698E2"
        stroke="#000"
        rx="4.5"
        transform="matrix(-.95907 -.21478 .17088 -1.00242 103.174 65.34)"
      />
      <rect
        width="43.273"
        height="41.052"
        x=".138"
        y="-.706"
        fill="#5698E2"
        stroke="#000"
        rx="4.5"
        transform="matrix(-.54354 -.83938 .82036 -.57185 70.878 89.48)"
      />
      <rect
        width="29.224"
        height="55.024"
        x=".565"
        y="-.394"
        fill="#5698E2"
        stroke="#000"
        rx="4.5"
        transform="matrix(.17088 -1.00242 .95907 .21478 76.04 59.957)"
      />
      <path
        stroke="#000"
        d="M0-.5h59.154"
        transform="matrix(.17088 -1.00242 .95907 .21478 70.134 89.412)"
      />
      <path
        stroke="#000"
        d="M0-.5h59.154"
        transform="matrix(.95907 .21478 -.17088 1.00242 47.083 53.26)"
      />
      <path
        fill="#FFD84D"
        d="m.001 75.338 20.994 47.31H110.1l-24.492-47.31 5.365-5.75H5.366C.701 69.385-.037 71.06.001 75.338Z"
      />
      <path
        fill="#F8C40F"
        d="M112.448 125 83.04 70.717h5.772L117.12 125h-4.672Z"
      />
      <path stroke="#F8C40F" strokeWidth="2" d="M20.528 69.634H90.04" />
    </svg>
  );
}

function PinkFolder() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="146"
      height="125"
      fill="none"
    >
      <rect
        width="53.183"
        height="84.163"
        x="20.528"
        y="40.837"
        fill="#FFD84D"
        rx="10"
      />
      <rect
        width="112.431"
        height="65.344"
        x="20.528"
        y="59.656"
        fill="#FFD84D"
        rx="10"
      />
      <rect
        width="29.224"
        height="41.527"
        x="-.394"
        y="-.609"
        fill="#FFAFBC"
        stroke="#000"
        rx="4.5"
        transform="matrix(-.95907 -.21478 .17088 -1.00242 103.174 65.34)"
      />
      <rect
        width="43.273"
        height="41.052"
        x=".138"
        y="-.706"
        fill="#FFAFBC"
        stroke="#000"
        rx="4.5"
        transform="matrix(-.54354 -.83938 .82036 -.57185 70.878 89.48)"
      />
      <rect
        width="29.224"
        height="55.024"
        x=".565"
        y="-.394"
        fill="#FFAFBC"
        stroke="#000"
        rx="4.5"
        transform="matrix(.17088 -1.00242 .95907 .21478 76.04 59.957)"
      />
      <path
        stroke="#000"
        d="M0-.5h59.154"
        transform="matrix(.17088 -1.00242 .95907 .21478 70.134 89.412)"
      />
      <path
        stroke="#000"
        d="M0-.5h59.154"
        transform="matrix(.95907 .21478 -.17088 1.00242 47.083 53.26)"
      />
      <path
        fill="#FFD84D"
        d="m.001 75.338 20.994 47.31H110.1l-24.492-47.31 5.365-5.75H5.366C.701 69.385-.037 71.06.001 75.338Z"
      />
      <path
        fill="#F8C40F"
        d="M112.448 125 83.04 70.717h5.772L117.12 125h-4.672Z"
      />
      <path stroke="#F8C40F" strokeWidth="2" d="M20.528 69.634H90.04" />
    </svg>
  );
}
