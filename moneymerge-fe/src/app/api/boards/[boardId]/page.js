"use client";
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/yd9zYS4V4tR
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import RootLayout from "../../../../components/layout.js";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
  DialogTrigger,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
  Dialog,
} from "@/components/ui/dialog";

export default function Component() {
  const params = useParams();
  const [board, setBoard] = useState({});
  const [likes, setLikes] = useState(0);
  const [comment, setComment] = useState({
    content: "",
  });
  const [commentLikes, setCommentLikes] = useState({});
  const [editStates, setEditStates] = useState({});
  const [editedContents, setEditedContents] = useState({});
  const [comments, setComments] = useState({});
  const [profile, setProfile] = useState(null);
  const [userData, setUserData] = useState(null);

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

  const fetchUserProfile = (userId) => {
    console.log(userId);
    fetch(`http://localhost:8080/api/users/${userId}`, {
      method: "GET",
      credentials: "include",
    })
      .then((result) => result.json())
      .then((result) => {
        setProfile(result.data);
        console.log(profile);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  };

  const handleEditButtonClick = (commentId) => {
    setEditStates((prevEditStates) => ({
      ...prevEditStates,
      [commentId]: true,
    }));

    setEditedContents((prevEditedContents) => ({
      ...prevEditedContents,
      [commentId]: comments.find(
        (comment) => comment.boardCommentId === commentId
      ).content,
    }));
  };

  const handleSaveButtonClick = (commentId) => {
    comment.content = editedContents[commentId];

    fetch(
      `http://localhost:8080/api/boards/${board.boardId}/comments/${commentId}`,
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
          window.location.href = `/api/boards/${board.boardId}`;
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
      [commentId]: comments.find(
        (comment) => comment.boardCommentId === commentId
      ).content,
    }));
  };

  const handleContentChange = (commentId, e) => {
    setEditedContents((prevEditedContents) => ({
      ...prevEditedContents,
      [commentId]: e.target.value,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComment({ [name]: value });
    console.log(comment);
  };

  useEffect(() => {
    fetch(`http://localhost:8080/api/boards/${params.boardId}`)
      .then((result) => result.json())
      .then((result) => {
        setBoard(result.data);
        setLikes(result.data.likes);
        console.log(result.data);
        if (result.data.commentGetResList) {
          const initialLikes = result.data.commentGetResList.reduce(
            (acc, comment) => {
              acc[comment.boardCommentId] = comment.likes;
              return acc;
            },
            {}
          );
          const initialComments = result.data.commentGetResList.reduce(
            (acc, comment) => {
              acc[comment.boardCommentId] = comment.content;
              return acc;
            },
            {}
          );
          setCommentLikes(initialLikes);
          setEditedContents(initialComments);
          setComments(result.data.commentGetResList);
        }
      });
  }, []);

  const HandleBoardLikeClick = () => {
    console.log(board.boardId);
    if (board !== null) {
      fetch(`http://localhost:8080/api/boards/${board.boardId}/likes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((result) => result.json())
        .then((result) => {
          if (result.data) {
            setLikes(result.data.likes);
            console.log(likes);
          }
        })
        .catch((error) => {
          console.error("Error clicking receipt like button:", error);
        });
    }
  };

  const handleDeleteClick = () => {
    const confirmDelete = window.confirm("게시물을 삭제하시겠습니까?");

    if (confirmDelete) {
      fetch(`http://localhost:8080/api/boards/${board.boardId}`, {
        method: "DELETE",
        credentials: "include",
      })
        .then((response) => {
          console.log(response);
          if (response.ok) {
            window.location.href = `/api/boards`;
          } else {
            alert("Error:" + response.status + "\n" + response.message);
          }
        })
        .catch((error) => {
          alert("Fetch error:" + error);
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (comment.content === "" || /^\s+$/.test(comment.content)) {
      alert("내용을 입력해주세요.");
      return;
    }

    fetch(`http://localhost:8080/api/boards/${board.boardId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(comment),
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          window.location.href = `/api/boards/${board.boardId}`;
        } else {
          alert("Error:" + response.status);
        }
      })
      .catch((error) => {
        alert("Fetch error:" + error);
      });
  };
  console.log("content");
  console.log(comment);

  const HandleCommentLikeClick = (commentId) => {
    if (commentId !== null) {
      fetch(
        `http://localhost:8080/api/boards/${board.boardId}/comments/${commentId}/likes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      )
        .then((result) => result.json())
        .then((result) => {
          if (result.data) {
            setCommentLikes((prevLikes) => ({
              ...prevLikes,
              [commentId]: result.data.likes,
            }));
            console.log(likes);
          }
        })
        .catch((error) => {
          console.error("Error clicking receipt like button:", error);
        });
    }
  };

  const handleCommentDeleteClick = (commentId) => {
    const confirmDelete = window.confirm("댓글을 삭제하시겠습니까?");

    if (confirmDelete) {
      fetch(
        `http://localhost:8080/api/boards/${board.boardId}/comments/${commentId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      )
        .then((response) => {
          console.log(response);
          if (response.ok) {
            window.location.href = `/api/boards/${board.boardId}`;
          } else {
            alert("Error:" + response.status + "\n" + response.message);
          }
        })
        .catch((error) => {
          alert("Fetch error:" + error);
        });
    }
  };

  return (
    <RootLayout>
      <div className="w-full h-full bg-[#fffbeb] text-[#333] w-full h-full flex flex-col overflow-auto">
        {/* <div
          className="fixed pt-4 px-4 flex items-center justify-between"
          style={{
            top: "200px",
          }}
        >
          <div className="fixed flex items-center gap-4">
            <Link className="flex items-center gap-2" href="/api/boards">
              <ArrowLeftIcon className="h-5 w-5" />
              <h1 className="text-2xl font-bold">커뮤니티</h1>
            </Link>
          </div>
        </div> */}
        <div className="px-4 flex items-center justify-between">
          <div
            className="flex items-center gap-4"
            style={{ position: "absolute", top: "-45px" }}
          >
            <Link className="flex items-center gap-2" href="/api/boards">
              <ArrowLeftIcon className="h-5 w-5" />
              <h1 className="text-2xl font-bold w-[100px]">커뮤니티</h1>
            </Link>
          </div>
        </div>
        <main>
          <div className="w-full h-full max-w-3xl mx-auto bg-white shadow-lg p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{board.title}</h2>
                <p className="text-sm text-gray-500">
                  {board.boardType} 게시판 | 작성자: {board.author} |{" "}
                  {board.createdAt}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={HandleBoardLikeClick}>
                  <HeartIcon className="h-5 w-5 mr-2" />
                  <span className="ml-2">{likes}</span>
                </Button>
              </div>
            </div>
            {board.image && (
              <div
                style={{
                  width: "550px",
                  height: "200px",
                  backgroundImage: `url(${board.image})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              ></div>
            )}
            <div className="prose prose-gray">
              <p>{board.content}</p>
            </div>
            {userData && board.userId === userData.userId && (
              <div className="flex justify-end gap-2">
                <Link href={`/api/boards/${board.boardId}/edit`}>
                  <Button size="sm" variant="outline">
                    수정
                  </Button>
                </Link>
                <Button variant="outline" onClick={handleDeleteClick}>
                  삭제
                </Button>
              </div>
            )}

            <div className="border-t pt-6">
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
              {board.commentGetResList &&
                board.commentGetResList.map((comment, index) => (
                  <div className="space-y-4" key={comment.boardCommentId}>
                    {editStates[comment.boardCommentId] ? (
                      <div className="mt-6">
                        <textarea
                          className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-[#333] focus:border-transparent"
                          placeholder="댓글을 입력하세요"
                          name="content"
                          value={editedContents[comment.boardCommentId]}
                          onChange={(e) =>
                            handleContentChange(comment.boardCommentId, e)
                          }
                        />

                        <div className="flex justify-end mt-2 gap-4">
                          <button
                            onClick={() =>
                              handleSaveButtonClick(comment.boardCommentId)
                            }
                          >
                            저장
                          </button>
                          <button
                            onClick={() =>
                              handleCancelButtonClick(comment.boardCommentId)
                            }
                          >
                            취소
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="gap-4 pt-4">
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div className="flex justify-between gap-2">
                              <Dialog>
                                <DialogTrigger>
                                  <div
                                    onClick={() =>
                                      fetchUserProfile(comment.userId)
                                    }
                                    style={{
                                      backgroundColor: "#ffe9e9",
                                      borderRadius: "13px",
                                      height: "26px",
                                      width: "26px",
                                      backgroundImage: `url(${comment.profileUrl})`,
                                      backgroundSize: "cover",
                                    }}
                                  />
                                </DialogTrigger>
                                <DialogContent
                                  style={{
                                    width: "450px",
                                    height: "500px",
                                    border: "1px solid black",
                                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                  }}
                                >
                                  <DialogHeader
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "center",
                                    }}
                                  >
                                    <DialogTitle
                                      style={{
                                        fontSize: "20px",
                                        paddingTop: "20px",
                                      }}
                                    >
                                      Profile
                                    </DialogTitle>
                                  </DialogHeader>
                                  {profile && (
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
                                          flexDirection: "column",
                                          alignItems: "center",
                                          gap: "10px",
                                        }}
                                      >
                                        <div
                                          style={{
                                            backgroundColor: "#ffe9e9",
                                            borderRadius: "100px",
                                            height: "200px",
                                            width: "200px",
                                            backgroundImage: `url(${profile.profileUrl})`,
                                            backgroundSize: "cover",
                                          }}
                                        />
                                        {profile.username}
                                      </div>
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "row",
                                          alignItems: "center",
                                          gap: "10px",
                                        }}
                                      >
                                        <div>
                                          소유 캐릭터: {profile.characterName}
                                        </div>
                                        <div
                                          style={{
                                            backgroundColor: "#ffe9e9",
                                            borderRadius: "25px",
                                            height: "50px",
                                            width: "50px",
                                            backgroundImage: `url(${profile.characterImage})`,
                                            backgroundSize: "cover",
                                          }}
                                        />
                                      </div>
                                    </div>
                                  )}
                                </DialogContent>
                              </Dialog>
                              <div className="font-medium">
                                {comment.username}
                              </div>
                            </div>
                            <div className="flex items-center">
                              <div className="text-sm text-gray-500  mr-4">
                                {comment.createdAt}
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  HandleCommentLikeClick(comment.boardCommentId)
                                }
                              >
                                <HeartIcon className="h-4 w-4" />
                                <span className="ml-2">
                                  {commentLikes[comment.boardCommentId]}
                                </span>
                              </Button>
                            </div>
                          </div>
                          <p className="mt-2">{comment.content}</p>
                          {userData && userData.userId === comment.userId && (
                            <div className="flex items-center gap-2 mt-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  handleEditButtonClick(comment.boardCommentId)
                                }
                              >
                                수정
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  handleCommentDeleteClick(
                                    comment.boardCommentId
                                  )
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

function HeartIcon(props) {
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
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}
