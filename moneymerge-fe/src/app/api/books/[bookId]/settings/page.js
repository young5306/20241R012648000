"use client";
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/0c9vh5jQgPE
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import RootLayout from "../../../../../components/layout.js";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Dialog, DialogTrigger, DialogContent } from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";
import { SketchPicker } from "react-color";

export default function Component() {
  const params = useParams();
  const bookId = params.bookId;
  const [book, setBook] = useState({});
  const [deleteAgreeNum, setDeleteAgreeNum] = useState(0);
  const [memberNum, setMemberNum] = useState(0);
  const [userMonthGoal, setUserMonthGoal] = useState(0);
  const [userYearGoal, setUserYearGoal] = useState(0);
  const [deleteEnabled, setDeleteEnabled] = useState();
  const [yearGoal, setYearGoal] = useState(0);
  const [monthGoal, setMonthGoal] = useState(0);
  const [email, setEmail] = useState();
  const [searchList, setSearchList] = useState([]);
  const [username, setUsername] = useState();
  const [bookTitle, setBookTitle] = useState();
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [bookColor, setBookColor] = useState();
  const [userColor, setUserColor] = useState();
  const [clickedButton, setClickedButton] = useState();

  function formatNumberWithCommas(number) {
    console.log(number);
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  useEffect(() => {
    fetch(`http://localhost:8080/api/books/${bookId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((result) => result.json())
      .then((result) => {
        console.log("Received book data:", result.data);
        setBook(result.data);
        setMemberNum(result.data.userList.length);
        setUserMonthGoal(result.data.monthGoal);
        setUserYearGoal(result.data.yearGoal);
        setDeleteEnabled(result.data.myAgree);
        setDeleteAgreeNum(result.data.deleteAgreeNum);
        setBookColor(result.data.bookColor);
        setUserColor(result.data.myColor);
      })
      .catch((error) => console.error("Error fetching book data:", error));
  }, []);

  // 가계부 제목 변경
  const handleTitleChange = (event) => {
    event.preventDefault();
    setBookTitle(event.target.value);
  };

  const handleUpdateTitle = () => {
    fetch(`http://localhost:8080/api/books/${bookId}/book-title`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ bookTitle }),
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

  // 색상 변경
  const handleClick = (e) => {
    e.preventDefault(); // 기본 양식 제출 방지
    setDisplayColorPicker(!displayColorPicker);
    setClickedButton(e.target.innerText);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleBookChange = (color) => {
    setBookColor(color.hex);
    console.log(bookColor);
  };

  const handleUserChange = (color) => {
    setUserColor(color.hex);
    console.log(userColor);
  };

  const handleBookColor = () => {
    fetch(`http://localhost:8080/api/books/${bookId}/book-color`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ bookColor }),
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

  const handleUserColor = () => {
    fetch(`http://localhost:8080/api/books/${bookId}/user-color`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ userColor }),
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

  // 닉네임 변경
  const handleNameChange = (event) => {
    event.preventDefault();
    setUsername(event.target.value);
  };

  const handleUpdateName = () => {
    fetch(`http://localhost:8080/api/books/${bookId}/user-name`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ username }),
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

  // 멤버 초대
  const handleSearchInput = (e) => {
    const value = e.target.value;
    setEmail(value);
    handleSearchClick(value);
  };

  const handleSearchClick = (email) => {
    if (email) {
      fetch(`http://localhost:8080/api/users/search?email=${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((result) => result.json())
        .then((result) => {
          console.log(result.data);
          setSearchList(result.data.userSearchList);
        })
        .catch((error) => {
          console.error("Error fetching receipt data:", error);
        });
    }
  };

  const handleUserClick = (invitedUserId, e) => {
    e.preventDefault(); // 기본 양식 제출 방지
    console.log(invitedUserId);

    fetch(`http://localhost:8080/api/books/${bookId}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ invitedUserId }),
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

  // 이번달 목표 수정
  const handleMonthGoalChange = (event) => {
    event.preventDefault();
    setMonthGoal(event.target.value);
    console.log(monthGoal);
  };

  const handleUpdateMonthGoal = () => {
    const userConfirmed = window.confirm(
      "목표 수정 시 500 포인트가 차감됩니다! 그래도 수정하시겠습니까?"
    );

    if (!userConfirmed) {
      return;
    }

    fetch(`http://localhost:8080/api/books/${bookId}/month-goal`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ monthGoal }),
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

  // 올해 목표 수정
  const handleYearGoalChange = (event) => {
    event.preventDefault();
    setYearGoal(event.target.value);
  };

  const handleUpdateYearGoal = () => {
    const userConfirmed = window.confirm(
      "목표 수정 시 1000 포인트가 차감됩니다! 그래도 수정하시겠습니까?"
    );

    if (!userConfirmed) {
      return;
    }

    fetch(`http://localhost:8080/api/books/${bookId}/year-goal`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ yearGoal }),
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

  // 삭제 동의
  const toggleDelete = () => {
    fetch(`http://localhost:8080/api/books/${bookId}/agree`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          if (deleteEnabled) {
            setDeleteAgreeNum(deleteAgreeNum - 1);
          } else {
            setDeleteAgreeNum(deleteAgreeNum + 1);
          }
          setDeleteEnabled(!deleteEnabled);
        } else {
          console.error("Failed to update delete agree setting");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // 가계부 삭제
  const handleDelete = () => {
    const userConfirmed = window.confirm("가계부를 삭제 하시겠습니까?");

    if (!userConfirmed) {
      return;
    }

    fetch(`http://localhost:8080/api/books/${bookId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.statusCode === 0) {
          window.location.href = "/";
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
            <Link
              className="flex items-center gap-2"
              href="/api/books/settings"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              <h1 className="text-2xl font-bold">환경설정</h1>
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
          <div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg mb-4">
              <div className="flex flex-col gap-4 pt-4 pb-4">
                <div className="flex items-center gap-4">
                  <h2 className="text-lg font-bold mb-2">제목</h2>
                  <div className="text-sm font-medium">{book.bookTitle}</div>
                  <Dialog>
                    <DialogTrigger>
                      <PencilIcon className="text-gray-500 h-5 w-5" />
                      <span className="sr-only">Edit</span>
                    </DialogTrigger>
                    <DialogContent className="flex gap-2">
                      <Input
                        id="title"
                        type="text"
                        name="title"
                        onChange={handleTitleChange}
                        style={{
                          height: "35px",
                        }}
                      />
                      <button
                        style={{
                          width: "50px",
                        }}
                        onClick={() => handleUpdateTitle()}
                      >
                        수정
                      </button>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="flex items-center gap-4">
                  <h2 className="text-lg font-bold mb-2">가계부 색상</h2>
                  <div
                    className="h-8 w-8 rounded-full"
                    style={{
                      backgroundColor: bookColor,
                    }}
                  />
                  <Button size="sm" variant="outline" onClick={handleClick}>
                    Change Book Color
                  </Button>
                  {displayColorPicker &&
                  clickedButton === "Change Book Color" ? (
                    <div style={{ position: "absolute", zIndex: 2 }}>
                      <div
                        style={{
                          position: "fixed",
                          top: 0,
                          right: 0,
                          bottom: 0,
                          left: 0,
                        }}
                        onClick={handleClose}
                      />
                      <SketchPicker
                        color={bookColor}
                        onChange={handleBookChange}
                      />
                    </div>
                  ) : null}
                  <input type="hidden" name="bookColor" value={bookColor} />
                  <Button onClick={() => handleBookColor()}>저장</Button>
                </div>

                <div className="flex items-center gap-4">
                  <h2 className="text-lg font-bold mb-2">나의 색상</h2>
                  <div
                    className="h-8 w-8 rounded-full"
                    style={{
                      backgroundColor: userColor,
                    }}
                  />
                  <Button size="sm" variant="outline" onClick={handleClick}>
                    Change My Color
                  </Button>
                  {displayColorPicker && clickedButton === "Change My Color" ? (
                    <div style={{ position: "absolute", zIndex: 2 }}>
                      <div
                        style={{
                          position: "fixed",
                          top: 0,
                          right: 0,
                          bottom: 0,
                          left: 0,
                        }}
                        onClick={handleClose}
                      />
                      <SketchPicker
                        color={userColor}
                        onChange={handleUserChange}
                      />
                    </div>
                  ) : null}
                  <input type="hidden" name="userColor" value={userColor} />
                  <Button onClick={() => handleUserColor()}>저장</Button>
                </div>

                <div className="flex items-center gap-4">
                  <h2 className="text-lg font-bold mb-2">나의 닉네임</h2>
                  <div className="text-sm font-medium">{book.myName}</div>
                  <Dialog>
                    <DialogTrigger>
                      <PencilIcon className="text-gray-500 h-5 w-5" />
                      <span className="sr-only">Edit</span>
                    </DialogTrigger>
                    <DialogContent className="flex gap-2">
                      <Input
                        id="username"
                        type="text"
                        name="username"
                        onChange={handleNameChange}
                        style={{
                          height: "35px",
                        }}
                      />
                      <button
                        style={{
                          width: "50px",
                        }}
                        onClick={() => handleUpdateName()}
                      >
                        수정
                      </button>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center gap-4">
                  <h2 className="text-lg font-bold mb-2">멤버</h2>
                  <Dialog>
                    <DialogTrigger>
                      <div className="rounded border border-gray-300 p-4 h-4 flex items-center">
                        초대하기
                      </div>
                    </DialogTrigger>
                    <DialogContent>
                      <Input
                        className="w-full"
                        id="email"
                        placeholder="Enter email"
                        type="text"
                        name="email"
                        onChange={handleSearchInput}
                        style={{
                          height: "35px",
                        }}
                      />
                      <div>
                        {searchList.length > 0 &&
                          searchList.map((user, index) => (
                            <div
                              key={index}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom: "10px",
                                marginTop: "10px",
                                gap: "10px",
                              }}
                            >
                              <div className="flex items-center">
                                <img
                                  src={user.profileUrl}
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                    borderRadius: "50%",
                                    marginRight: "10px",
                                  }}
                                />
                                <div>{user.username}</div>
                              </div>
                              <Button
                                variant="ghost"
                                onClick={(e) => handleUserClick(user.userId, e)}
                              >
                                초대
                              </Button>
                            </div>
                          ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {book.userList &&
                    book.userList.map((row) => (
                      <div className="flex items-center gap-2">
                        <div
                          className="h-8 w-8 rounded-full"
                          style={{
                            backgroundColor: row.userColor,
                          }}
                        />
                        <div className="text-sm">{row.userName}</div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg mb-4">
              <h2 className="text-lg font-bold mb-2">목표</h2>
              <div className="items-center justify-between">
                <div className="text-gray-500 dark:text-gray-400 mb-1">
                  이번 달
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-2xl font-bold">
                    {formatNumberWithCommas(userMonthGoal)}
                  </div>
                  <Dialog className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                    <DialogTrigger>
                      <PencilIcon className="h-5 w-5" />
                      <span className="sr-only">Edit</span>
                    </DialogTrigger>
                    <DialogContent className="flex gap-2">
                      <Input
                        id="monthGoal"
                        type="number"
                        name="monthGoal"
                        onChange={handleMonthGoalChange}
                        style={{
                          height: "35px",
                        }}
                      />
                      <button
                        style={{
                          width: "50px",
                        }}
                        onClick={() => handleUpdateMonthGoal()}
                      >
                        수정
                      </button>
                    </DialogContent>
                    <div className="flex items-center justify-between"></div>
                  </Dialog>
                </div>
                <div className="text-gray-500 dark:text-gray-400 mb-1">
                  연간
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-2xl font-bold">
                    {formatNumberWithCommas(userYearGoal)}
                  </div>
                  <Dialog className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                    <DialogTrigger>
                      <PencilIcon className="h-5 w-5" />
                      <span className="sr-only">Edit</span>
                    </DialogTrigger>
                    <DialogContent className="flex gap-2">
                      <Input
                        id="yearGoal"
                        type="number"
                        name="yearGoal"
                        onChange={handleYearGoalChange}
                        style={{
                          height: "35px",
                        }}
                      />
                      <button
                        style={{
                          width: "50px",
                        }}
                        onClick={() => handleUpdateYearGoal()}
                      >
                        수정
                      </button>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h2 className="text-lg font-bold mb-2">가계부 삭제</h2>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500 dark:text-gray-400">
                    삭제 동의
                  </span>
                  <p>
                    {deleteAgreeNum}/{memberNum}
                  </p>
                  <Switch checked={deleteEnabled} onClick={toggleDelete} />
                </div>
                <Button variant="destructive" onClick={handleDelete}>
                  삭제
                </Button>
              </div>
            </div>
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
