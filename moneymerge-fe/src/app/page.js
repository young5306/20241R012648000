"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import RootLayout from "../components/layout.js";

export default function Home() {
  const params = useParams();
  const [board, setBoard] = useState({});

  // useEffect(() => {
  //   console.log("useEffect called"); // 디버깅을 위한 콘솔 로그
  //   // fetch(`http://43.203.66.36:8080/api/boards/${params.boardId}`)
  //   fetch(`http://localhost:8080/api/boards/1`)
  //     .then((result) => result.json())
  //     .then((result) => setBoard(result.data));
  // }, []);

  return (
    <RootLayout/>
      // <div
      //   style={{
      //     position: "absolute",
      //     top: "50%",
      //     left: "50%",
      //     transform: "translate(-50%, -50%)",
      //   }}
      // >
      //   {/* <>{params.boardId}</> */}
      //   <li>id: {board.boardId}</li>
      //   <li>게시판: {board.boardType}</li>
      //   <li>제목: {board.title}</li>
      //   <li>내용: {board.content}</li>
      //   <li>이미지: {board.image}</li>
      //   <li>작성자: {board.author}</li>
      //   <li>작성일: {board.createdAt}</li>
      //   <li>수정일: {board.modifiedAt}</li>
      //   <li>좋아요: {board.likes}</li>
      // </div>
    // </RootLayout>
  );
}
