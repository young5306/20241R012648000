"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import "./style/sidebar.css";
import {
  DialogTrigger,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
  Dialog,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { SketchPicker } from "react-color";

const Sidebar = ({ data }) => {
  const router = useRouter();
  const [checkedBooks, setCheckBooks] = useState({});

  const handleCheckboxClick = (bookId) => {
    setCheckBooks((prev) => ({
      ...prev,
      [bookId]: !prev[bookId],
    }));
  };

  const handleLogout = async () => {
    const userConfirmed = window.confirm("로그아웃 하시겠습니까?");

    if (!userConfirmed) {
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        document.cookie =
          "AccessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          "RefreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        router.push("/api/login");
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="box">
      <div className="group">
        <div className="overlap-group">
          <div className="overlap">
            <div className="rectangle" />
            <div className="div" />
            <div className="moneymerge">
              <Link href="/">머니머지</Link>
            </div>
            {/* 프로필 */}
            <Link href="/api/profile">
              <div
                className="ellipse"
                style={{
                  backgroundImage: `url(${
                    data
                      ? data.profileUrl
                      : "https://moneymerge.s3.ap-northeast-2.amazonaws.com/profile/default_profile_image.jpg"
                  })`,
                  backgroundSize: "cover",
                }}
              />
              <div className="text-wrapper-5">
                {data ? data.username : "로그인 해주세요."}
              </div>
            </Link>
            <div className="text-wrapper-1">내 가계부</div>
            <Link href="/api/books/settings">
              <SettingsIcon className="text-wrapper-8" />
            </Link>
            <div className="book-list">
              {/* 서버에서 받은 bookList 데이터를 사용하여 가계부 목록 생성 */}
              {data &&
                data.bookList.map((book, index) => (
                  <div key={index} className="book-wrapper">
                    <Link href={`/api/books/${book.bookId}`}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <div
                          onClick={(e) => {
                            e.preventDefault();
                            handleCheckboxClick(book.bookId);
                          }}
                          style={{
                            backgroundColor: book.bookColor,
                            borderRadius: "3px",
                            height: "16px",
                            width: "16px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            cursor: "pointer",
                          }}
                        >
                          {checkedBooks[book.bookId] && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-check"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                        <div
                          style={{
                            fontSize: "12px",
                            width: "70px",
                          }}
                        >
                          {book.bookTitle}
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              <div className="book-wrapper">
                {/* 가계부 추가 Dialog */}
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="add-button cursor-pointer">+ 가계부 추가</div>
                  </DialogTrigger>
                  <BookForm />
                </Dialog>
              </div>
            </div>
          </div>
          <Link href="/api/boards">
            <div className="overlap-1">
              <div className="text-wrapper-6">커뮤니티</div>
            </div>
          </Link>
          <Link href="/api/points">
            <div className="overlap-2">
              <div className="text-wrapper-6">내 포인트</div>
            </div>
          </Link>
          <Link href="/api/receipts">
            <div className="overlap-3">
              <div className="text-wrapper-6">하루 영수증</div>
            </div>
          </Link>
          <div className="overlap-4 cursor-pointer" onClick={handleLogout}>
            <div className="text-wrapper-7">로그아웃</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

function BookForm() {
  const [book, setBook] = useState();
  const [bookColor, setBookColor] = useState("#5c6ac4");
  const [userColor, setUserColor] = useState("#5c6ac4");
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [searchList, setSearchList] = useState([]);
  const [email, setEmail] = useState();
  const [userList, setUserList] = useState([]);
  const [clickedButton, setClickedButton] = useState();

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

  const handleUserClick = (user, e) => {
    e.preventDefault(); // 기본 양식 제출 방지
    console.log(user);
    setUserList((prevUserList) => {
      if (
        prevUserList.some((existingUser) => existingUser.userId === user.userId)
      ) {
        console.log("User already exists");
        return prevUserList;
      }

      const newUserList = [...prevUserList, user];
      console.log(newUserList);
      return newUserList;
    });
  };

  const handleDeleteUser = (index) => {
    setUserList((prevUserList) => {
      const newUserList = prevUserList.filter((_, i) => i !== index);
      return newUserList;
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
    setBook((prevBook) => {
      const userIdList = userList.map((user) => user.userId);
      return {
        ...prevBook,
        userColor: userColor,
        bookColor: bookColor,
        userList: userIdList,
      };
    });
    console.log(book);
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBook = {
      ...book,
      userColor: userColor,
      bookColor: bookColor,
      userList: userList.map((user) => user.userId),
    };

    if (newBook.title === "" || /^\s+$/.test(newBook.title)) {
      alert("가계부 제목을 입력해주세요.");
      return;
    }

    fetch("http://localhost:8080/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(newBook),
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          window.location.reload();
        } else if (response.status === 403) {
          alert("모두 입력해주세요.");
        } else {
          alert("Error:" + response.status);
        }
      })
      .catch((error) => {
        alert("Fetch error:" + error);
      });
  };

  return (
    <>
      <DialogContent className="sm:max-w-[700px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>새 가계부 만들기</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="flex items-center justify-between gap-4 flex-nowrap">
              <Label htmlFor="ledgerName" className="whitespace-nowrap">
                가계부 이름
              </Label>
              <Input
                className="w-full"
                id="ledgerName"
                placeholder="Enter ledger name"
                type="text"
                name="title"
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm font-medium">가계부 색상</div>
              <div
                className="h-8 w-8 rounded-full"
                style={{ backgroundColor: bookColor }}
              />
              <Button size="sm" variant="outline" onClick={handleClick}>
                Change Book Color
              </Button>
              {displayColorPicker && clickedButton === "Change Book Color" ? (
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
                  <SketchPicker color={bookColor} onChange={handleBookChange} />
                </div>
              ) : null}
            </div>
            <input type="hidden" name="bookColor" value={bookColor} />

            <div className="flex items-center gap-4">
              <div className="text-sm font-medium">나의 색상</div>
              <div
                className="h-8 w-8 rounded-full"
                style={{ backgroundColor: userColor }}
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
                  <SketchPicker color={userColor} onChange={handleUserChange} />
                </div>
              ) : null}
            </div>
            <input type="hidden" name="userColor" value={userColor} />

            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">가계부 멤버 초대하기</div>
                <div>
                  {userList.length > 0 &&
                    userList.map((user, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "10px",
                        }}
                      >
                        <div>{user.username}</div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteUser(index)}
                        >
                          삭제
                        </Button>
                      </div>
                    ))}
                </div>
              </div>
              <Input
                className="w-full"
                id="email"
                placeholder="Enter email"
                type="text"
                name="email"
                value={email}
                onChange={handleSearchInput}
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
                      }}
                    >
                      <img
                        src={user.profileUrl}
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          marginRight: "10px",
                        }}
                      />
                      <button onClick={(e) => handleUserClick(user, e)}>
                        {user.username}
                      </button>
                    </div>
                  ))}
              </div>
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="startDate">가계부 시작일</Label>
                <Input
                  className="w-24"
                  id="startDate"
                  type="number"
                  name="startDate"
                  min="1"
                  max="31"
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="monthlyGoal">Monthly Goal</Label>
                <Input
                  className="w-24"
                  id="monthlyGoal"
                  type="number"
                  name="monthGoal"
                  min="0"
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="annualGoal">Annual Goal</Label>
                <Input
                  className="w-24"
                  id="annualGoal"
                  type="number"
                  name="yearGoal"
                  min="0"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </>
  );
}

function SettingsIcon(props) {
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
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
