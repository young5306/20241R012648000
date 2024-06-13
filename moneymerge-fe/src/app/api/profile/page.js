/**
 * v0 by Vercel.
 * @see https://v0.dev/t/CILi7LoDbXy
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import RootLayout from "../../../components/layout.js";
import { useState, useEffect } from "react";
import { DialogTrigger, DialogContent, Dialog } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function Component() {
  const [profile, setProfile] = useState({});
  const [alarmEnabled, setAlarmEnabled] = useState();
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState();
  const [previewFile, setPreviewFile] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/users/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((result) => result.json())
      .then((result) => {
        console.log("Received profile data:", result.data);
        setProfile(result.data);
        setAlarmEnabled(result.data.alarm);
      })
      .catch((error) => console.error("Error fetching profile data:", error));
  }, []);

  // 프로필 사진 변경
  const handleFileChange = (event) => {
    event.preventDefault();
    const f = event.target.files[0];
    setFile(f);
    // FileReader 객체 생성
    const reader = new FileReader();

    // 파일을 읽고 URL 형태로 변환하여 미리보기에 사용
    reader.onload = () => {
      setPreviewFile(reader.result);
    };

    reader.readAsDataURL(f); // 파일을 읽음
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("multipartFile", file);

    fetch("http://localhost:8080/api/users/profile-image", {
      method: "PATCH",
      body: formData,
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          window.location.reload();
        } else {
          alert("변경할 프로필 사진을 입력해주세요.");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // 닉네임 변경
  const handleChange = (event) => {
    event.preventDefault();
    setUsername(event.target.value);
  };

  const handleUpdateName = () => {
    fetch("http://localhost:8080/api/users/username", {
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

  // 알람 설정
  const toggleAlarm = () => {
    fetch("http://localhost:8080/api/users/alarm", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          setAlarmEnabled(!alarmEnabled);
        } else {
          console.error("Failed to update alarm setting");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // 로그아웃
  const handleLogout = () => {
    const userConfirmed = window.confirm("로그아웃 하시겠습니까?");

    if (!userConfirmed) {
      return;
    }

    fetch("http://localhost:8080/api/users/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          document.cookie =
            "AccessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          document.cookie =
            "RefreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          window.location.href = "/api/login";
        } else {
          console.error("Failed to log out");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // 회원탈퇴
  const handleWithdrawal = () => {
    const userConfirmed = window.confirm("회원탈퇴 하시겠습니까?");

    if (!userConfirmed) {
      return;
    }

    fetch("http://localhost:8080/api/users", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          document.cookie =
            "AccessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          document.cookie =
            "RefreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          window.location.href = "/api/login";
        } else {
          console.error("Failed to withdrawal");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <RootLayout>
      <div className="w-full h-full bg-[#fffbeb] text-[#333] w-full h-full flex flex-col overflow-auto">
        <div className="bg-white rounded-3xl shadow-lg w-full max-w-2xl p-8">
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-40 h-40 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
                <img
                  alt="Profile"
                  className="w-full h-full object-cover"
                  src={profile.profileUrl}
                />
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <button className="absolute bottom-0 left-32 bg-gray-900 dark:bg-gray-50 text-white dark:text-gray-900 rounded-full w-10 h-10 flex items-center justify-center">
                    <PencilIcon className="w-5 h-5" />
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <Label htmlFor="image">사진 첨부</Label>
                  <Input
                    id="image"
                    type="file"
                    name="multipartFile"
                    onChange={handleFileChange}
                    style={{
                      height: "35px",
                    }}
                  />
                  {previewFile && (
                    <div className="flex flex-col items-center">
                      <img
                        src={previewFile}
                        alt="File Preview"
                        className="w-40 h-40 rounded-full"
                      />
                    </div>
                  )}
                  <button onClick={handleUpload}>수정</button>
                </DialogContent>
              </Dialog>
            </div>
            <div className="mt-8 text-center">
              <h2 className="text-3xl font-bold">{profile.username}</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <button className="mt-4 bg-gray-900 dark:bg-gray-50 text-white dark:text-gray-900 rounded-full px-6 py-2 text-sm font-medium">
                    닉네임 수정
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <Label>닉네임 수정</Label>
                  <Input
                    id="username"
                    type="text"
                    name="username"
                    onChange={handleChange}
                    style={{
                      height: "35px",
                    }}
                  />
                  <button onClick={handleUpdateName}>수정</button>
                </DialogContent>
              </Dialog>
            </div>
            <div className="mt-8 w-full">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 dark:text-gray-400 text-lg">
                  포인트
                </span>
                <span className="font-bold text-lg">{profile.points}</span>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-gray-500 dark:text-gray-400 text-lg">
                  알림 설정
                </span>
                <Switch checked={alarmEnabled} onClick={toggleAlarm} />
              </div>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-gray-500 dark:text-gray-400 text-lg">
                  로그아웃
                </span>
                <Button size="icon" variant="ghost" onClick={handleLogout}>
                  <LogOutIcon className="w-6 h-6" />
                </Button>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-gray-500 dark:text-gray-400 text-lg">
                  계정 탈퇴
                </span>
                <Button size="icon" variant="ghost" onClick={handleWithdrawal}>
                  <TrashIcon className="w-6 h-6" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  );
}

function LogOutIcon(props) {
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
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
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

function TrashIcon(props) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
