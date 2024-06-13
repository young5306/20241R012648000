/**
 * v0 by Vercel.
 * @see https://v0.dev/t/h9gCZf21D09
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import RootLayout from "../../../../../../components/layout.js";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

import Link from "next/link";

export default function Records() {
  const params = useParams();
  const router = useRouter();
  console.log(params);
  // const bookId = params.bookId;
  // const recordId = params.recordId;
  const [records, setRecords] = useState([]);
  const [likes, setLikes] = useState(0);
  const [userColor, setUserColor] = useState("");
  const [dislikes, setDislikes] = useState(0);
  const [userData, setUserData] = useState(null);
  const [comments, setComments] = useState({});
  const [comment, setComment] = useState({
    content: "",
  });
  const [editStates, setEditStates] = useState({});
  const [editedContents, setEditedContents] = useState({});

  useEffect(() => {
    fetch("http://localhost:8080/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((result) => result.json())
      .then((result) => {
        console.log("Received user data:", result.data);
        setUserData(result.data);
        console.log(result.data);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8080/api/books/${params.bookId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((result) => result.json())
      .then((result) => {
        const user = result.data.userList.find(
          (user) => user.userId === userData.userId
        );
        setUserColor(user.userColor);
        console.log(result.data);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, [userData, params.bookId]);

  useEffect(() => {
    if (params.recordId) {
      fetch(
        `http://localhost:8080/api/books/${params.bookId}/records/${params.recordId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      )
        .then((result) => result.json())
        .then((result) => {
          setRecords(result.data);
          setComments(result.data.commentList);
        })
        .catch((error) => {
          console.error("Error fetching record:", error);
        });
    }
  }, [params.bookId, params.recordId]);
  console.log(records);

  const handleDeleteClick = (recordId) => {
    const confirmDelete = window.confirm("레코드를 삭제하시겠습니까?");

    if (confirmDelete) {
      // fetch(`http://localhost:8080/api/books/1/records/15`, {
      fetch(
        `http://localhost:8080/api/books/${params.bookId}/records/${recordId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      )
        .then((response) => {
          console.log(response);
          if (response.ok) {
            window.location.href = `/api/books/${params.bookId}`;
          } else {
            alert("Error:" + response.status + "\n" + response.message);
          }
        })
        .catch((error) => {
          alert("Fetch error:" + error);
        });
    }
  };

  const HandleRecordLikeClick = () => {
    if (records !== null) {
      fetch(
        `http://localhost:8080/api/books/${params.bookId}/records/${records.recordId}/likes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      )
        .then(() => {
          fetch(
            `http://localhost:8080/api/books/${params.bookId}/records/${records.recordId}/likes`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            }
          )
            .then((result) => result.json())
            .then((result) => {
              setLikes(result.data.likes);
            })
            .catch((error) => {
              console.error("Error fetching record likes:", error);
            });
        })
        .catch((error) => {
          console.error("Error clicking records like button:", error);
        });
    }
  };

  const HandleRecordDislikeClick = () => {
    if (records !== null) {
      fetch(
        `http://localhost:8080/api/books/${params.bookId}/records/${records.recordId}/dislikes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      )
        .then(() => {
          fetch(
            `http://localhost:8080/api/books/${params.bookId}/records/${params.recordId}/dislikes`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            }
          )
            .then((result) => result.json())
            .then((result) => {
              setDislikes(result.data.dislikes);
            })
            .catch((error) => {
              console.error("Error fetching record likes:", error);
            });
        })
        .catch((error) => {
          console.error("Error clicking records like button:", error);
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (comment.content === "" || /^\s+$/.test(comment.content)) {
      alert("내용을 입력해주세요.");
      return;
    }

    fetch(
      `http://localhost:8080/api/books/${params.bookId}/records/${params.recordId}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(comment),
      }
    )
      .then((response) => {
        console.log(response);
        if (response.ok) {
          window.location.href = `/api/books/${params.bookId}/records/${params.recordId}`;
        } else {
          alert("Error:" + response.status);
        }
      })
      .catch((error) => {
        alert("Fetch error:" + error);
      });
  };

  ///////////////////////////
  console.log("commment");
  console.log(comment);
  console.log(comment.content);
  console.log(comment.comment);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComment({ [name]: value });
    console.log(comment);
  };

  const handleEditButtonClick = (commentId) => {
    setEditStates((prevEditStates) => ({
      ...prevEditStates,
      [commentId]: true,
    }));

    setEditedContents((prevEditedContents) => ({
      ...prevEditedContents,
      [commentId]: comments.find((comment) => comment.commentId === commentId)
        .content,
    }));
  };
  const handleCommentDeleteClick = (commentId) => {
    const confirmDelete = window.confirm("댓글을 삭제하시겠습니까?");

    if (confirmDelete) {
      fetch(
        `http://localhost:8080/api/books/${params.bookId}/records/${params.recordId}/comments/${commentId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      )
        .then((response) => {
          console.log(response);
          if (response.ok) {
            window.location.href = `/api/books/${params.bookId}/records/${params.recordId}`;
          } else {
            alert("Error:" + response.status + "\n" + response.message);
          }
        })
        .catch((error) => {
          alert("Fetch error:" + error);
        });
    }
  };

  const handleSaveButtonClick = (commentId) => {
    comment.content = editedContents[commentId];

    fetch(
      `http://localhost:8080/api/books/${params.bookId}/records/${params.recordId}/comments/${commentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
        credentials: "include",
      }
    )
      .then((response) => {
        if (response.ok) {
          window.location.href = `/api/books/${params.bookId}/records/${params.recordId}`;
        } else {
          alert("Error:" + response.status);
        }
      })
      .catch((error) => {
        console.error("Error updating comment:", error);
      });

    setEditStates((prevEditStates) => ({
      ...prevEditStates,
      [commentId]: false,
    }));
  };

  const handleCancelButtonClick = (commentId) => {
    setEditStates((prevEditStates) => ({
      ...prevEditStates,
      [commentId]: false,
    }));

    setEditedContents((prevEditedContents) => ({
      ...prevEditedContents,
      [commentId]: comments.find((comment) => comment.commentId === commentId)
        .content,
    }));
  };

  const handleContentChange = (commentId, e) => {
    setEditedContents((prevEditedContents) => ({
      ...prevEditedContents,
      [commentId]: e.target.value,
    }));
  };

  return (
    <RootLayout>
      <div className="w-full h-full max-w-6xl mx-auto pb-8 overflow-auto bg-[#ffffff]">
        <div className="px-4 flex items-center justify-between">
          <div
            className="flex items-center gap-4"
            style={{ position: "absolute", top: "-45px" }}
          >
            <Link
              className="flex items-center gap-2"
              href={`/api/books/${params.bookId}`}
            >
              <ArrowLeftIcon className="h-5 w-5" />
              <h1 className="text-2xl font-bold w-[100px]">레코드</h1>
            </Link>
          </div>
        </div>
        <main>
          <div className="w-full h-full max-w-3xl mx-auto bg-white p-3 space-y-6">
            <div className="grid gap-8">
              <Card className="shadow-none">
                <CardHeader>
                  <CardTitle>{records.date}</CardTitle>
                  <CardDescription>
                    {records.recordType} : {records.amount} 원
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="flex gap-8">
                      <div className="font-medium">자산</div>
                      <div className="text-gray-500">{records.assetType}</div>
                    </div>
                    <div className="flex gap-8">
                      <div className="font-medium">카테고리</div>
                      <div className="text-gray-500">
                        {records.categoryName}
                      </div>
                    </div>
                    <div className="">
                      <div className="font-medium">내용</div>
                      <div className="border rounded-md p-4">
                        <div className="text-gray-500">{records.content}</div>
                      </div>
                    </div>
                    <div className="">
                      <div className="font-medium">메모</div>
                      <div className="border rounded-md p-4">
                        <div className="text-gray-500">{records.memo}</div>
                      </div>
                    </div>

                    <div>
                      <div className="mt-3 font-medium">사진</div>
                      <img
                        alt="Transaction Photo"
                        className="rounded-md"
                        src={records.image}
                        style={{
                          width: "200px",
                          height: "200px",
                          backgroundImage: `url(${records.image})`,
                          backgroundSize: "contain",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                        }}
                      />
                    </div>
                    <div className="flex mt-3">
                      <div>가계부</div>

                      {records.bookList &&
                        records.bookList.map((book) => (
                          <div
                            key={book.bookId}
                            className="ml-3 flex items-center justify-between"
                          >
                            {/* <input type="checkbox"></input> */}
                            <div
                              style={{
                                width: "10px",
                                height: "10px",
                                borderRadius: "5px",
                                // backgroundColor:,
                              }}
                            ></div>
                            <span className="font-medium">
                              {book.bookTitle}
                            </span>
                          </div>
                        ))}
                    </div>
                    <div className="mt-3 flex gap-8">
                      <div className="font-medium">기록한 사람</div>
                      <div className="text-gray-500">{records.username}</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex justify-between w-full">
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="p-[0px]"
                        onClick={HandleRecordLikeClick}
                      >
                        <ThumbsUpIcon className="w-4 h-4" />
                        <span className="sr-only">Like</span>
                      </Button>
                      <div className="text-gray-500">{likes}</div>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={HandleRecordDislikeClick}
                      >
                        <ThumbsDownIcon className="w-4 h-4" />
                        <span className="sr-only">Dislike</span>
                      </Button>
                      <div className="text-gray-500">{dislikes}</div>
                    </div>
                    {userData && records.userId === userData.userId && (
                      <div className="flex items-center gap-4">
                        <Link
                          href={`/api/books/${params.bookId}/records/${records.recordId}/edit`}
                        >
                          <Button size="icon" variant="ghost">
                            <span className="">수정</span>
                            <PencilIcon className="w-5 h-5" />
                            <span className="sr-only ">Edit</span>
                          </Button>
                        </Link>

                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleDeleteClick(records.recordId)}
                        >
                          삭제
                          <TrashIcon className="w-5 h-5" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    )}
                  </div>
                </CardFooter>
              </Card>
            </div>
            {/* 댓글 */}

            <div className="border-t pt-6 m-5">
              <h3 className="text-lg font-bold mb-4">댓글</h3>
              <form className="mt-6" onSubmit={handleSubmit}>
                <Textarea
                  className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-[#333] focus:border-transparent"
                  placeholder="댓글을 입력하세요"
                  name="content"
                  onChange={handleChange}
                />
                <div className="flex justify-end mt-2">
                  <Button variant="outline">저장</Button>
                </div>
              </form>

              {records.commentList &&
                records.commentList.map((comment, index) => (
                  <div className="space-y-4" key={comment.commentId}>
                    {editStates[comment.commentId] ? (
                      <div className="mt-6">
                        <Textarea
                          className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-[#333] focus:border-transparent"
                          placeholder="댓글을 입력하세요"
                          name="content"
                          value={editedContents[comment.commentId]}
                          onChange={(e) =>
                            handleContentChange(comment.commentId, e)
                          }
                        />

                        <div className="flex justify-end mt-2 gap-4">
                          <button
                            onClick={() =>
                              handleSaveButtonClick(comment.commentId)
                            }
                          >
                            저장
                          </button>
                          <button
                            onClick={() =>
                              handleCancelButtonClick(comment.commentId)
                            }
                          >
                            취소
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="gap-4 pt-4">
                        <div className="flex-1 pb-4">
                          <div className="flex justify-between">
                            <div className="flex justify-between gap-2">
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  gap: "40px",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",

                                    alignItems: "center",
                                    gap: "10px",
                                  }}
                                >
                                  <div
                                    style={{
                                      backgroundColor: `${userColor}`, //user의 color...
                                      borderRadius: "50%",
                                      height: "20px",
                                      width: "20px",
                                    }}
                                  />
                                  {comment.username}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <div className="text-sm text-gray-500  mr-4">
                                {comment.createdAt}
                              </div>
                            </div>
                          </div>
                          <p className="mt-2">{comment.content}</p>
                          {userData && userData.userId === comment.userId && (
                            <div className="flex items-center gap-2 mt-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  handleEditButtonClick(comment.commentId)
                                }
                              >
                                수정
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  handleCommentDeleteClick(comment.commentId)
                                }
                              >
                                삭제
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </main>
      </div>
    </RootLayout>
  );
}

function DeleteIcon(props) {
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
      <path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" />
      <line x1="18" x2="12" y1="9" y2="15" />
      <line x1="12" x2="18" y1="9" y2="15" />
    </svg>
  );
}

function ReplyIcon(props) {
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
      <polyline points="9 17 4 12 9 7" />
      <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
    </svg>
  );
}

function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

function ThumbsUpIcon(props) {
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
      <path d="M7 10v12" />
      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
    </svg>
  );
}

function ThumbsDownIcon(props) {
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
      <path d="M17 14V2" />
      <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
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
