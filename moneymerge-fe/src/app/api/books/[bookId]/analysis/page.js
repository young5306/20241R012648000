"use client";
import Link from "next/link";
import RootLayout from "../../../../../components/layout.js";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
//npm install @emotion/react @emotion/styled
//npm i @mui/x-charts"

export default function Component() {
  const params = useParams();
  const bookId = params.bookId;
  const [barData, setBarData] = useState([
    // username : "",
    // monthAmount : "",
    //
  ]);
  const [pieData, setPieData] = useState([]);

  // 막대

  useEffect(() => {
    fetch(`http://localhost:8080/api/books/${params.bookId}/records/2024/6`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((result) => result.json())
      .then((result) => {
        console.log("Received user data:", result.data);
        setBarData(result.data);
        setPieData(result.data);
        console.log(result.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const chartSetting = {
    yAxis: [
      {
        label: "rainfall (mm)", // income, expense
      },
    ],
    width: 500,
    height: 300,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: "translate(-20px, 0)",
      },
    },
  };

  const dataset = [
    // barData
    {
      london: 59, // 멤버 이름: 수입 합
      paris: 57,
      newYork: 86,
      seoul: 21,
      month: "Jan", // 월
    },
    {
      london: 50,
      paris: 52,
      newYork: 78,
      seoul: 28,
      month: "Fev",
    },
    {
      london: 47,
      paris: 53,
      newYork: 106,
      seoul: 41,
      month: "Mar",
    },
    {
      london: 54,
      paris: 56,
      newYork: 92,
      seoul: 73,
      month: "Apr",
    },
    {
      london: 57,
      paris: 69,
      newYork: 92,
      seoul: 99,
      month: "May",
    },
    {
      london: 60,
      paris: 63,
      newYork: 103,
      seoul: 144,
      month: "June",
    },
    {
      london: 59,
      paris: 60,
      newYork: 105,
      seoul: 319,
      month: "July",
    },
    {
      london: 65,
      paris: 60,
      newYork: 106,
      seoul: 249,
      month: "Aug",
    },
    {
      london: 51,
      paris: 51,
      newYork: 95,
      seoul: 131,
      month: "Sept",
    },
    {
      london: 60,
      paris: 65,
      newYork: 97,
      seoul: 55,
      month: "Oct",
    },
    {
      london: 67,
      paris: 64,
      newYork: 76,
      seoul: 48,
      month: "Nov",
    },
    {
      london: 61,
      paris: 70,
      newYork: 103,
      seoul: 25,
      month: "Dec",
    },
  ];

  // const valueFormatter = (value: number | null) => `${value}mm`;
  const valueFormatter = (value) => `${value}mm`;

  // 원형
  const data = [
    { value: 5, label: "A" }, // value : 카테고리별 amount, label : category
    { value: 10, label: "B" },
    { value: 15, label: "C" },
    { value: 20, label: "D" },
  ];

  const size = {
    width: 400,
    height: 200,
  };

  return (
    <RootLayout>
      <div className="bg-[#ffffff] text-[#333] w-full h-full flex flex-col overflow-auto">
        <div className="px-2 flex items-center justify-between">
          <div
            className="flex items-center gap-4"
            style={{ position: "absolute", top: "-50px" }}
          >
            <Link
              className="flex items-center bg-[#ffffff] pl-2 pr-2 pt-2 rounded-t-xl"
              href={`/api/books/${bookId}`}
            >
              <h1 className="text-xl font-bold w-[100px]">달력</h1>
            </Link>
            <Link
              className="flex items-center bg-[#ffffff] pl-2 pr-2 pt-2 rounded-t-xl"
              href={`/api/books/${bookId}/table`}
            >
              <h1 className="text-xl font-bold w-[100px]">표</h1>
            </Link>
            <Link
              className="flex items-center bg-[#f1ff9c] pl-2 pr-2 pt-2 rounded-t-xl"
              href={`/api/books/${bookId}/analysis`}
            >
              <h1 className="text-xl font-bold w-[100px]">소비 분석</h1>
            </Link>
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
          <BarChart
            dataset={dataset}
            xAxis={[{ scaleType: "band", dataKey: "month" }]}
            series={[
              { dataKey: "london", label: "London", valueFormatter },
              { dataKey: "paris", label: "Paris", valueFormatter },
              { dataKey: "newYork", label: "New York", valueFormatter },
              { dataKey: "seoul", label: "Seoul", valueFormatter },
            ]}
            {...chartSetting}
          />

          <PieChart
            series={[
              {
                arcLabel: (item) => `${item.label} (${item.value})`,
                arcLabelMinAngle: 45,
                data,
              },
            ]}
            sx={{
              [`& .${pieArcLabelClasses.root}`]: {
                fill: "white",
                fontWeight: "bold",
              },
            }}
            {...size}
          />
        </main>
      </div>
    </RootLayout>
  );
}
