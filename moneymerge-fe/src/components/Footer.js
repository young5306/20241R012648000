"use client";
import Link from "next/link";
import {
  DialogTrigger,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
  Dialog,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const Footer = ({ data }) => {
  const [receipt, setReceipt] = useState(null);
  const [character, setCharacter] = useState({});
  const [total, setTotal] = useState(0);
  const [likes, setLikes] = useState(0);

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

  const handlePostClick = () => {
    if (data && data.receivedReceiptId !== null) {
      fetch(`http://localhost:8080/api/receipts/${data.receivedReceiptId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((result) => result.json())
        .then((result) => {
          setReceipt(result.data);
          if (result.data) {
            setReceipt(result.data);
            setTotal(result.data.positive + result.data.negative);
            setLikes(result.data.likeCount);
          }
        })
        .catch((error) => {
          console.error("Error fetching receipt data:", error);
        });
    } else {
      setReceipt(null);
    }
  };

  const HandleReceiptLikeClick = () => {
    if (data && data.receivedReceiptId !== null) {
      fetch(
        `http://localhost:8080/api/receipts/${data.receivedReceiptId}/likes`,
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
            setLikes(result.data.likeCount);
          }
        })
        .catch((error) => {
          console.error("Error clicking receipt like button:", error);
        });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "25px",
      }}
    >
      {/* 다마고치 */}
      <Link href="/api/characters">
        <div style={{ position: "relative" }}>
          <div
            style={{
              position:
                "absolute" /* 절대 위치로 설정하여 두 번째 div 위에 겹치도록 함 */,
              top: "62%" /* 부모 요소의 50% 위치에 맞춤 */,
              left: "50%" /* 부모 요소의 50% 위치에 맞춤 */,
              transform: "translate(-50%, -50%)" /* 가운데 정렬 */,
              width: "89px",
              height: "79px",
              borderRadius: "9px",
              backgroundImage: `url(${
                character
                  ? character.image
                  : "https://moneymerge.s3.ap-northeast-2.amazonaws.com/character/%EC%84%9C%EC%9E%88%EB%8A%94%EC%88%AD%EC%9D%B4.png"
              })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="189"
              height="266"
              fill="none"
            >
              <path
                fill="#FFD7DD"
                stroke="#000"
                d="M187.584 165.633c0 54.636-41.906 98.879-93.542 98.879S.5 220.269.5 165.633s41.906-98.88 93.542-98.88 93.542 44.244 93.542 98.88Z"
              />
              <ellipse
                cx="94.347"
                cy="167.811"
                fill="#FFAFBC"
                rx="85.825"
                ry="92.3"
              />
              <g filter="url(#a)">
                <path
                  fill="#fff"
                  d="M28.608 203.586C3.796 144.338 73.632 84.223 93.13 83.951c19.497-.273 87.237 52.004 67.024 119.635-17.992 60.204-106.733 59.248-131.545 0Z"
                />
              </g>
              <g filter="url(#b)">
                <rect
                  width="91.303"
                  height="81.682"
                  x="48.695"
                  y="122.886"
                  fill="#D9D9D9"
                  rx="10"
                />
              </g>
              <rect
                width="90.303"
                height="80.682"
                x="49.195"
                y="123.386"
                stroke="#000"
                rx="9.5"
              />
              <g filter="url(#c)">
                <ellipse
                  cx="129.034"
                  cy="225.996"
                  fill="#FFAFBC"
                  rx="10.935"
                  ry="11.042"
                />
                <path
                  stroke="#000"
                  d="M139.469 225.996c0 5.827-4.676 10.543-10.435 10.543-5.758 0-10.435-4.716-10.435-10.543 0-5.826 4.677-10.542 10.435-10.542 5.759 0 10.435 4.716 10.435 10.542Z"
                />
              </g>
              <g filter="url(#d)">
                <ellipse
                  cx="96.958"
                  cy="230.413"
                  fill="#FFAFBC"
                  rx="10.935"
                  ry="11.042"
                />
                <path
                  stroke="#000"
                  d="M107.393 230.413c0 5.827-4.676 10.542-10.435 10.542-5.758 0-10.435-4.715-10.435-10.542s4.677-10.542 10.435-10.542c5.759 0 10.435 4.715 10.435 10.542Z"
                />
              </g>
              <g filter="url(#e)">
                <ellipse
                  cx="64.882"
                  cy="225.996"
                  fill="#FFAFBC"
                  rx="10.935"
                  ry="11.042"
                />
                <path
                  stroke="#000"
                  d="M75.317 225.996c0 5.827-4.677 10.543-10.435 10.543-5.759 0-10.436-4.716-10.436-10.543 0-5.826 4.677-10.542 10.436-10.542 5.758 0 10.435 4.716 10.435 10.542Z"
                />
              </g>
              <path
                fill="#fff"
                fill-opacity=".72"
                d="M146.042 89.818c-3.758-3.938-8.876-3.696-6.403 3.436 14.417 14.852 19.458 23.677 26.624 39.716 4.105 2.356 6.967 1.601 6.403-3.435-8.544-17.768-14.192-26.686-26.624-39.717Z"
              />
              <rect
                width="25.476"
                height="10.676"
                x="-.317"
                y=".634"
                fill="#fff"
                stroke="#000"
                rx="5.338"
                transform="matrix(.31323 .94968 -.94783 .31877 85.808 37.54)"
              />
              <rect
                width="25.496"
                height="10.667"
                x="-.568"
                y=".42"
                fill="#fff"
                stroke="#000"
                rx="5.333"
                transform="rotate(98.41 57.25 59.544) skewX(-.163)"
              />
              <rect
                width="25.48"
                height="10.674"
                x="-.621"
                y=".334"
                fill="#fff"
                stroke="#000"
                rx="5.337"
                transform="matrix(-.28507 .9585 -.95696 -.29021 118.845 44.166)"
              />
              <rect
                width="25.486"
                height="10.671"
                x="-.365"
                y=".607"
                fill="#fff"
                stroke="#000"
                rx="5.335"
                transform="matrix(.23952 .9709 -.96979 .24395 77.24 6.703)"
              />
              <path
                fill="#fff"
                stroke="#000"
                d="M70.943 2.208c0 .949-.76 1.709-1.687 1.709s-1.687-.76-1.687-1.709c0-.948.76-1.708 1.687-1.708s1.687.76 1.687 1.708ZM79.69 36.071c0 .948-.759 1.709-1.686 1.709-.927 0-1.687-.76-1.687-1.709 0-.948.76-1.708 1.687-1.708s1.687.76 1.687 1.708ZM91.355 65.517c0 .948-.76 1.708-1.687 1.708s-1.687-.76-1.687-1.708.76-1.708 1.687-1.708 1.687.76 1.687 1.708ZM114.683 37.543c0 .949-.76 1.709-1.687 1.709s-1.687-.76-1.687-1.709c0-.948.76-1.708 1.687-1.708s1.687.76 1.687 1.708ZM120.515 3.68c0 .949-.76 1.71-1.687 1.71s-1.687-.761-1.687-1.71c0-.947.76-1.708 1.687-1.708s1.687.76 1.687 1.709Z"
              />
              <defs>
                <filter
                  id="a"
                  width="140.536"
                  height="168.432"
                  x="23.341"
                  y="83.95"
                  color-interpolation-filters="sRGB"
                  filterUnits="userSpaceOnUse"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feBlend
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feColorMatrix
                    in="SourceAlpha"
                    result="hardAlpha"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite
                    in2="hardAlpha"
                    k2="-1"
                    k3="1"
                    operator="arithmetic"
                  />
                  <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                  <feBlend in2="shape" result="effect1_innerShadow_350_1335" />
                </filter>
                <filter
                  id="b"
                  width="91.303"
                  height="85.682"
                  x="48.695"
                  y="122.886"
                  color-interpolation-filters="sRGB"
                  filterUnits="userSpaceOnUse"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feBlend
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feColorMatrix
                    in="SourceAlpha"
                    result="hardAlpha"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite
                    in2="hardAlpha"
                    k2="-1"
                    k3="1"
                    operator="arithmetic"
                  />
                  <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                  <feBlend in2="shape" result="effect1_innerShadow_350_1335" />
                </filter>
                <filter
                  id="c"
                  width="29.87"
                  height="30.084"
                  x="114.099"
                  y="214.954"
                  color-interpolation-filters="sRGB"
                  filterUnits="userSpaceOnUse"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    result="hardAlpha"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                  <feBlend
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_350_1335"
                  />
                  <feBlend
                    in="SourceGraphic"
                    in2="effect1_dropShadow_350_1335"
                    result="shape"
                  />
                </filter>
                <filter
                  id="d"
                  width="29.87"
                  height="30.084"
                  x="82.023"
                  y="219.371"
                  color-interpolation-filters="sRGB"
                  filterUnits="userSpaceOnUse"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    result="hardAlpha"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                  <feBlend
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_350_1335"
                  />
                  <feBlend
                    in="SourceGraphic"
                    in2="effect1_dropShadow_350_1335"
                    result="shape"
                  />
                </filter>
                <filter
                  id="e"
                  width="29.87"
                  height="30.084"
                  x="49.947"
                  y="214.954"
                  color-interpolation-filters="sRGB"
                  filterUnits="userSpaceOnUse"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    result="hardAlpha"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                  <feBlend
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_350_1335"
                  />
                  <feBlend
                    in="SourceGraphic"
                    in2="effect1_dropShadow_350_1335"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </div>
        </div>
      </Link>
      {/* 알림 */}
      <Link href="/api/notifications">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="143"
            height="115"
            fill="none"
          >
            <path
              fill="#fff"
              stroke="#000"
              d="m33.012 22.917 25.532-19.18C62.189.506 77.855.048 82.586 2.833c.796.469 1.434 1.176 2.189 1.71l26.02 18.383a8 8 0 0 1 3.384 6.534V78.2a8 8 0 0 1-8 8H37.817a8 8 0 0 1-8-8V29.312a8 8 0 0 1 3.195-6.396Z"
            />
            <path
              fill="#F6C0FF"
              stroke="#000"
              d="M36.863 16.329h68.817v74.345H36.863z"
            />
            <path
              fill="#fff"
              stroke="#000"
              d="m81.051 53.132 27.503-27.07c4.742-4.666 12.761-1.307 12.761 5.346v54.139c0 6.653-8.019 10.012-12.761 5.345l-27.503-27.07a7.5 7.5 0 0 1 0-10.69ZM61.49 63.823l-27.502 27.07c-4.742 4.666-12.761 1.307-12.761-5.346V31.408c0-6.653 8.019-10.012 12.76-5.345l27.504 27.07a7.5 7.5 0 0 1 0 10.69Z"
            />
            <path
              fill="#fff"
              stroke="#000"
              d="m76.283 45.882 40.845 36.689c5.116 4.595 1.865 13.08-5.012 13.08h-81.69c-6.877 0-10.128-8.485-5.012-13.08L66.26 45.88a7.5 7.5 0 0 1 10.024 0Z"
            />
          </svg>
        </div>
      </Link>
      {/* 우체통 */}
      <Dialog>
        <DialogTrigger onClick={handlePostClick}>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="121"
              height="108"
              fill="none"
            >
              <path
                fill="#EE3737"
                stroke="#000"
                d="M11.039 31.357h99.679V107.5H11.039z"
              />
              <path
                fill="#EE3737"
                d="m60.38 3.149 51.797 29.282H8.584L60.381 3.15Z"
              />
              <path
                fill="#EE3737"
                d="M61.08 3.903 63.05.667l57.25 31.321-1.972 3.237z"
              />
              <path
                fill="#EE3737"
                d="M61.08 3.903 63.05.667l57.25 31.321-1.972 3.237z"
              />
              <path
                stroke="#000"
                d="M.699-.187h3.79v65.258H.699z"
                transform="matrix(.5203 -.85398 .87729 .47997 60.88 4.59)"
              />
              <path
                fill="#EE3737"
                d="m57.95.669 1.971 3.237-57.25 31.321L.7 31.991z"
              />
              <path
                fill="#EE3737"
                d="m57.95.669 1.971 3.237-57.25 31.321L.7 31.991z"
              />
              <path
                stroke="#000"
                d="M-.178.667h3.79v65.258h-3.79z"
                transform="matrix(.5203 .85398 -.87729 .47997 58.627 .5)"
              />
              <path
                fill="#EE3737"
                stroke="#000"
                d="M15.359 31.357h91.04v68.271h-91.04z"
              />
              <path
                fill="#EE3737"
                stroke="#000"
                d="M17.02 32.617h86.721v25.449H17.02z"
              />
              <path
                fill="#fff"
                d="M35.716 88.271V73.726h4.915c1.141 0 2.074.206 2.798.618.73.407 1.27.959 1.62 1.655.35.696.525 1.472.525 2.33 0 .856-.175 1.635-.525 2.336-.346.7-.881 1.26-1.605 1.676-.725.412-1.653.618-2.785.618h-3.522v-1.563h3.466c.78 0 1.408-.135 1.882-.405.473-.27.816-.634 1.03-1.093a3.65 3.65 0 0 0 .326-1.57c0-.582-.109-1.103-.327-1.562a2.331 2.331 0 0 0-1.036-1.08c-.479-.265-1.113-.398-1.904-.398h-3.096v12.983h-1.762ZM60.684 81c0 1.534-.277 2.86-.83 3.977-.555 1.117-1.315 1.979-2.28 2.585-.966.606-2.07.91-3.31.91-1.24 0-2.344-.304-3.31-.91-.966-.606-1.726-1.468-2.28-2.585-.554-1.118-.83-2.443-.83-3.977 0-1.535.276-2.86.83-3.978.554-1.117 1.314-1.979 2.28-2.585.966-.606 2.07-.91 3.31-.91 1.24 0 2.343.304 3.31.91.965.606 1.725 1.468 2.28 2.585.553 1.118.83 2.443.83 3.978Zm-1.704 0c0-1.26-.211-2.323-.632-3.19-.417-.866-.983-1.522-1.698-1.967a4.401 4.401 0 0 0-2.386-.667c-.88 0-1.679.222-2.394.667-.71.445-1.276 1.101-1.697 1.968-.417.866-.625 1.929-.625 3.189 0 1.259.208 2.322.625 3.188.421.867.987 1.523 1.697 1.968a4.438 4.438 0 0 0 2.394.667c.88 0 1.676-.222 2.386-.667.715-.445 1.28-1.101 1.698-1.968.421-.866.632-1.929.632-3.188Zm12.62-3.637a2.23 2.23 0 0 0-1.036-1.676c-.607-.398-1.35-.597-2.23-.597-.645 0-1.208.105-1.691.313-.478.208-.852.495-1.122.86a2.06 2.06 0 0 0-.398 1.242c0 .388.093.722.277 1.002.19.274.431.504.725.689.293.18.6.329.923.447.322.114.618.206.888.277l1.477.398c.379.1.8.236 1.264.412.469.175.916.414 1.342.717.431.298.786.682 1.066 1.15.28.47.419 1.045.419 1.726 0 .786-.206 1.497-.618 2.131-.407.635-1.004 1.139-1.79 1.513-.781.374-1.73.56-2.848.56-1.041 0-1.944-.167-2.706-.503-.757-.337-1.354-.805-1.79-1.407-.43-.6-.674-1.3-.731-2.095h1.818c.047.55.232 1.004.554 1.364a3 3 0 0 0 1.236.795c.502.17 1.041.256 1.62.256.672 0 1.275-.109 1.81-.327.535-.222.959-.53 1.272-.923.312-.398.468-.862.468-1.392 0-.483-.135-.876-.405-1.179a2.97 2.97 0 0 0-1.065-.739c-.44-.189-.916-.355-1.427-.497l-1.79-.511c-1.137-.327-2.036-.793-2.7-1.4-.662-.605-.993-1.398-.993-2.379 0-.814.22-1.524.66-2.13.445-.611 1.042-1.085 1.79-1.42.753-.342 1.593-.512 2.521-.512.938 0 1.771.168 2.5.504.73.332 1.307.786 1.733 1.364.431.578.658 1.233.682 1.967H71.6Zm4.004-2.074v-1.562h10.91v1.562H81.94v12.983h-1.762V75.288h-4.574Z"
              />
              <g filter="url(#a)">
                <path
                  fill="#D9D9D9"
                  d="M64.7 92.414c0 1.652-1.413 2.991-3.157 2.991-1.743 0-3.156-1.339-3.156-2.991 0-1.652 1.413-2.991 3.156-2.991 1.744 0 3.157 1.339 3.157 2.991Z"
                />
                <path
                  stroke="#000"
                  d="M64.2 92.414c0 1.35-1.164 2.491-2.657 2.491s-2.656-1.14-2.656-2.491c0-1.35 1.163-2.491 2.656-2.491s2.657 1.14 2.657 2.491Z"
                />
              </g>
              <path fill="#000" d="M16.852 52.583h87.056v5.668H16.852z" />
              <path
                fill="#fff"
                stroke="#000"
                d="M36.292 24.43h48.509v33.321H36.292z"
              />
              <path stroke="#000" d="M78.656 30.542H85.3l-6.645-6.297v6.297Z" />
              <path
                fill="#EE3737"
                d="m73.34 18.966 3.71-3.517 12.218 11.578-3.71 3.517z"
              />
              <defs>
                <filter
                  id="a"
                  width="14.313"
                  height="13.982"
                  x="54.387"
                  y="89.423"
                  color-interpolation-filters="sRGB"
                  filterUnits="userSpaceOnUse"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    result="hardAlpha"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                  <feBlend
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_350_1361"
                  />
                  <feBlend
                    in="SourceGraphic"
                    in2="effect1_dropShadow_350_1361"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </div>
        </DialogTrigger>
        <DialogContent
          style={{
            width: "450px",
            height: "700px",
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
              [ 누군가의 하루 영수증 ]
            </DialogTitle>
            <div>MoneyMerge</div>
          </DialogHeader>
          {receipt === null && (
            <div
              className="grid gap-6 py-4"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div>---------------------------------</div>
              <div className="flex items-center justify-between gap-4 flex-nowrap">
                <Label htmlFor="ledgerName" className="whitespace-nowrap">
                  받은 영수증이 없습니다.
                </Label>
              </div>
              <Link
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  paddingBottom: "30px",
                }} href="/api/receipts/random"
              >
                <Button>영수증 뽑기</Button>
              </Link>
            </div>
          )}
          {receipt !== null && (
            <div
              className="grid gap-6 py-4"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div>---------------------------------</div>
              <div>
                <div
                  style={{
                    width: "300px",
                  }}
                >
                  발행일: {receipt.date}
                </div>
                <div
                  style={{
                    width: "300px",
                  }}
                >
                  하루 내역:
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "300px",
                  paddingBottom: "30px",
                  fontSize: "15px",
                }}
              >
                {receipt.content}
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "300px",
                  }}
                >
                  <div>긍정적 기분</div>
                  <div>{receipt.positive}</div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "300px",
                  }}
                >
                  <div>부정적 기분</div>
                  <div>{receipt.negative}</div>
                </div>
              </div>
              <div>---------------------------------</div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "300px",
                  paddingBottom: "30px",
                }}
              >
                <div>합계:</div>
                <div>{total}</div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  paddingBottom: "30px",
                }}
              >
                <Button onClick={HandleReceiptLikeClick}>{likes} 좋아요</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Footer;
