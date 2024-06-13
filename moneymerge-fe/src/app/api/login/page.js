/**
 * v0 by Vercel.
 * @see https://v0.dev/t/iLCVnsGv0vz
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import styled from "styled-components";

export default function LoginPage() {
  const router = useRouter();

  const handleKakaoLogin = () => {
    router.push(
      "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=6ae799c21398028744a91ebd1035fc7a&redirect_uri=http://localhost:8080/auth/kakao/callback"
    );
  };

  const handleNaverLogin = () => {
    router.push(
      "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=h9r5xd35tpbGhFazlIvP&redirect_uri=http://localhost:8080/auth/naver/callback&state=test"
    );
  };

  return (
    <html lang="en">
      <head></head>
      <body
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#FFF",
        }}
      >
        <div
          style={{
            width: "1150px",
            height: "640px",
            backgroundColor: "#316094",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div style={{ width: 400, height: 463, position: "relative" }}>
            {/* 로그인 */}
            <Kakao onClick={handleKakaoLogin} style={{ opacity: 0 }}>
              카카오
            </Kakao>
            <Naver onClick={handleNaverLogin} style={{ opacity: 0 }}>
              네이버
            </Naver>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="400"
              height="463"
              fill="none"
            >
              <rect
                width="398"
                height="461"
                x="1"
                y="1"
                fill="#FF8195"
                rx="40"
              />
              <rect
                width="398"
                height="181.354"
                x="1"
                y="1"
                fill="#FF8195"
                rx="10"
              />
              <rect
                width="256.918"
                height="181.354"
                x="1"
                y="280.646"
                fill="#FF8195"
                rx="10"
              />
              <rect
                width="381.554"
                height="444.482"
                x="1"
                y="1"
                fill="#FFAFBC"
                rx="40"
              />
              <rect
                width="381.554"
                height="174.856"
                x="1"
                y="1"
                fill="#FFAFBC"
                rx="10"
              />
              <rect
                width="246.301"
                height="174.856"
                x="1"
                y="270.626"
                fill="#FFAFBC"
                rx="10"
              />
              <rect
                width="320.334"
                height="198.882"
                x="32.322"
                y="31.7"
                fill="#fff"
                rx="20"
              />
              <rect
                width="320.334"
                height="136.148"
                x="32.322"
                y="31.7"
                fill="#fff"
                rx="10"
              />
              <rect
                width="155.184"
                height="136.148"
                x="32.322"
                y="94.435"
                fill="#fff"
                rx="10"
              />
              <g fill="#316094" stroke="#000" filter="url(#a)">
                <path d="M290.937 271.293c0 8.909-7.713 16.185-17.297 16.185-9.583 0-17.296-7.276-17.296-16.185 0-8.909 7.713-16.185 17.296-16.185 9.584 0 17.297 7.276 17.297 16.185ZM290.937 340.702c0 8.908-7.713 16.184-17.297 16.184-9.583 0-17.296-7.276-17.296-16.184 0-8.909 7.713-16.185 17.296-16.185 9.584 0 17.297 7.276 17.297 16.185ZM255.344 307.332c0 8.909-7.713 16.185-17.297 16.185-9.583 0-17.296-7.276-17.296-16.185 0-8.908 7.713-16.185 17.296-16.185 9.584 0 17.297 7.277 17.297 16.185ZM326.529 307.332c0 8.909-7.713 16.185-17.296 16.185-9.584 0-17.296-7.276-17.296-16.185 0-8.908 7.712-16.185 17.296-16.185 9.583 0 17.296 7.277 17.296 16.185Z" />
              </g>
              <g fill="#F8F8F8" stroke="#000" filter="url(#b)">
                <rect
                  width="47.406"
                  height="11.013"
                  x="168.074"
                  y="409.943"
                  rx="1.5"
                />
                <rect
                  width="47.406"
                  height="11.013"
                  x="104.007"
                  y="409.943"
                  rx="1.5"
                />
                <rect
                  width="47.406"
                  height="11.013"
                  x="232.141"
                  y="409.943"
                  rx="1.5"
                />
              </g>
              <path
                stroke="#030303"
                d="M15.906 1c11.201 0 351.016.692 366.697.692C398.284 1.692 399 12.056 399 12.056V425.5c-5.5 21.986-16.397 32.5-38.5 36.5H12.2C6.664 461.741 1 457.155 1 447.486V12.056S4.706 1 15.906 1Z"
              />
              <path
                stroke="#030303"
                d="M15.237 1c10.698 0 335.255.667 350.232.667 14.977 0 17.031 9.993 17.031 9.993V406.5c-3 27-13.5 38.982-39 38.982H11.698C6.408 445.232 1 440.81 1 431.488V11.66S4.54 1 15.237 1Z"
              />
              <g filter="url(#c)">
                <path
                  stroke="#000"
                  d="M32.322 41.71c3.791-8.235 7.009-10.343 14.237-10.677h291.148c10.331 1.344 12.978 4.075 14.949 10.678V213c-2.156 10-4.253 16.334-19.156 16.915H46.559s-14.237 0-14.237-10.678V41.711Z"
                />
              </g>
              <path
                fill="#000"
                d="M124.632 125.655a3 3 0 0 1 4.796 0l14.363 19.103c1.487 1.978.076 4.803-2.398 4.803h-28.726c-2.474 0-3.884-2.825-2.398-4.803l14.363-19.103ZM196.257 132.28h1.628v6.798h1.122v-1.364h1.342v-1.364h1.364v-1.364h1.364v-1.364h1.364v-1.342h1.584v1.584h-1.364v1.364h-1.342v1.364h-1.364v1.364h-1.364v1.342h-1.364v2.486h1.364v1.364h1.364v1.364h1.364v2.728h1.342v1.342h1.364v1.628h-1.584v-1.386h-1.364v-1.364h-1.364v-2.706h-1.364v-1.364h-1.342v-1.364h-1.122v8.184h-1.628v-17.93Zm11 13.596h1.386v-5.456h1.364v-4.07h1.342v-4.07h1.606v4.07h1.364v4.07h1.342v5.456h1.364v4.334h-1.584v-4.114h-6.556v4.114h-1.628v-4.334Zm6.82-1.364v-3.85h-1.364v-4.07h-1.122v4.07h-1.364v3.85h3.85Zm4.18-12.232h1.628v6.798h1.122v-1.364h1.342v-1.364h1.364v-1.364h1.364v-1.364h1.364v-1.342h1.584v1.584h-1.364v1.364h-1.342v1.364h-1.364v1.364h-1.364v1.342h-1.364v2.486h1.364v1.364h1.364v1.364h1.364v2.728h1.342v1.342h1.364v1.628h-1.584v-1.386h-1.364v-1.364h-1.364v-2.706h-1.364v-1.364h-1.342v-1.364h-1.122v8.184h-1.628v-17.93Zm11 13.596h1.386v-5.456h1.364v-4.07h1.342v-4.07h1.606v4.07h1.364v4.07h1.342v5.456h1.364v4.334h-1.584v-4.114h-6.556v4.114h-1.628v-4.334Zm6.82-1.364v-3.85h-1.364v-4.07h-1.122v4.07h-1.364v3.85h3.85Zm5.566 2.948h-1.386v-12.474h1.386v-1.364h1.364v-1.342h4.312v1.342h1.342v1.364h1.364v12.474h-1.364v1.364h-1.342v1.386h-4.312v-1.386h-1.364v-1.364Zm1.584-.22v1.342h3.85v-1.342h1.364v-12.012h-1.364v-1.364h-3.85v1.364h-1.342v12.012h1.342ZM129.428 196.693a3 3 0 0 1-4.796 0l-14.363-19.104c-1.487-1.977-.076-4.803 2.398-4.803h28.726c2.474 0 3.885 2.826 2.398 4.803l-14.363 19.104ZM196.257 173.569h1.628v2.706h1.342v2.728h1.364v2.706h1.364v2.728h1.364v2.728h1.122v-13.596h1.584v17.93h-1.584v-1.386h-1.364v-2.728h-1.364v-2.706h-1.364v-2.728h-1.342v-2.706h-1.122v12.254h-1.628v-17.93Zm11 13.596h1.386v-5.456h1.364v-4.07h1.342v-4.07h1.606v4.07h1.364v4.07h1.342v5.456h1.364v4.334h-1.584v-4.114h-6.556v4.114h-1.628v-4.334Zm6.82-1.364v-3.85h-1.364v-4.07h-1.122v4.07h-1.364v3.85h3.85Zm6.93-1.122h-1.364v-5.434h-1.386v-5.676h1.628v5.434h1.342v5.434h1.364v4.092h1.122v-4.092h1.364v-5.434h1.364v-5.434h1.584v5.676h-1.364v5.434h-1.342v4.07h-1.364v2.75h-1.606v-2.75h-1.342v-4.07Zm8.25-11.11h9.768v1.584h-8.14v6.556h6.776v1.606h-6.776v6.556h8.14v1.628h-9.768v-17.93Zm11 0h7.062v1.342h1.342v1.364h1.364v4.312h-1.364v1.364h-1.342v1.122h1.342v4.092h1.364v4.334h-1.584v-4.114h-1.364v-4.07h-5.192v8.184h-1.628v-17.93Zm6.82 8.14v-1.342h1.364v-3.85h-1.364v-1.364h-5.192v6.556h5.192ZM107.594 73.969h7.383v1.403h1.403v1.426h1.426v5.934h-1.426v1.426h-1.403v1.426h-5.681v7.13h-1.702V73.969Zm7.13 9.936v-1.426h1.426V77.05h-1.426v-1.426h-5.428v8.28h5.428Zm8.625-8.533h1.679v17.342h-1.679V75.372Zm8.694 14.467h-1.449v-7.36h1.449v-1.403h1.426V79.65h4.508v1.426h1.403v1.403h1.426v4.53h-8.51v2.6h1.403v1.403h4.025v-1.403h1.426v-1.426h1.656v1.656h-1.426v1.426h-1.403v1.449h-4.508v-1.45h-1.426V89.84Zm7.107-4.508v-2.6h-1.426v-1.425h-4.025v1.426h-1.403v2.599h6.854Zm2.944 1.426h1.449V85.33h5.681v-4.025h-5.428v2.852h-1.702v-3.082h1.449V79.65h5.934v1.426h1.403v9.936h1.426v1.702h-1.656v-1.45h-2.599v1.45h-4.508v-1.45h-1.449v-4.507Zm5.704 4.255v-1.403h1.426v-2.6h-5.428v4.003h4.002Zm5.796-2.83h1.702v2.83h6.854V87.01h-7.107v-1.426h-1.449v-4.508h1.449V79.65h7.337v1.426h1.426v3.082h-1.656v-2.852h-6.854v4.025h7.084v1.426h1.426v4.508h-1.426v1.449h-7.337v-1.45h-1.449v-3.081Zm12.949 1.657h-1.449v-7.36h1.449v-1.403h1.426V79.65h4.508v1.426h1.403v1.403h1.426v4.53h-8.51v2.6h1.403v1.403h4.025v-1.403h1.426v-1.426h1.656v1.656h-1.426v1.426h-1.403v1.449h-4.508v-1.45h-1.426V89.84Zm7.107-4.508v-2.6h-1.426v-1.425h-4.025v1.426h-1.403v2.599h6.854Zm14.444-11.362h1.702v17.043h8.51v1.702h-10.212V73.969Zm12.949 15.87h-1.449v-7.36h1.449v-1.403h1.426V79.65h4.508v1.426h1.403v1.403h1.426v7.36h-1.426v1.426h-1.403v1.449h-4.508v-1.45h-1.426V89.84Zm1.656-.23v1.403h4.025v-1.403h1.426v-6.877h-1.426v-1.426h-4.025v1.426h-1.403v6.877h1.403Zm8.395 0h1.449v-1.196h-1.449v-1.656h1.449v-1.173h-1.449v-4.508h1.449V79.65h5.934v1.426h1.173V79.65h1.656v1.656h-1.426v4.278h-1.403v1.426h-5.681v1.173h7.084v1.426h1.426v3.105h-1.426v1.426h-7.337v-1.426h-1.449v-3.105Zm7.13-4.278v-4.025h-5.428v4.025h5.428Zm1.426 7.107v-2.6h-6.854v2.6h6.854Zm7.199-17.066h1.679v3.105h-1.679v-3.105Zm0 4.278h1.679v13.064h-1.679V79.65Zm7.245 0h1.702v1.426h1.173V79.65h4.508v1.426h1.403v1.403h1.426v10.235h-1.656v-9.982h-1.426v-1.426h-4.025v1.426h-1.403v9.982h-1.702V79.65Zm12.305 8.533h3.082v3.082h-3.082v-3.082Zm11.5 0h3.082v3.082h-3.082v-3.082Zm11.5 0h3.082v3.082h-3.082v-3.082ZM272.788 262.665a1 1 0 0 1 1.703 0l7.457 12.109a1 1 0 0 1-.851 1.525h-14.914a1 1 0 0 1-.852-1.525l7.457-12.109ZM274.492 349.33a1 1 0 0 1-1.703 0l-7.457-12.109a1 1 0 0 1 .851-1.525h14.914a1 1 0 0 1 .852 1.525l-7.457 12.109Z"
              />
              <g fill="#316094" filter="url(#d)">
                <rect
                  width="34.593"
                  height="99.109"
                  x="96.888"
                  y="255.108"
                  stroke="#000"
                  rx="6.5"
                />
                <rect
                  width="32.37"
                  height="105.778"
                  x="167.074"
                  y="288.478"
                  stroke="#000"
                  rx="6.5"
                  transform="rotate(90 167.074 288.478)"
                />
                <path d="M97.812 285.308h32.745v40.043H97.812z" />
              </g>
              <defs>
                <filter
                  id="a"
                  width="114.778"
                  height="110.778"
                  x="216.251"
                  y="254.608"
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
                    result="effect1_dropShadow_351_1374"
                  />
                  <feBlend
                    in="SourceGraphic"
                    in2="effect1_dropShadow_351_1374"
                    result="shape"
                  />
                </filter>
                <filter
                  id="b"
                  width="184.54"
                  height="20.013"
                  x="99.507"
                  y="409.443"
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
                    result="effect1_dropShadow_351_1374"
                  />
                  <feBlend
                    in="SourceGraphic"
                    in2="effect1_dropShadow_351_1374"
                    result="shape"
                  />
                </filter>
                <filter
                  id="c"
                  width="321.334"
                  height="203.882"
                  x="31.822"
                  y="30.533"
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
                  <feBlend in2="shape" result="effect1_innerShadow_351_1374" />
                </filter>
                <filter
                  id="d"
                  width="114.778"
                  height="108.109"
                  x="56.796"
                  y="254.608"
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
                    result="effect1_dropShadow_351_1374"
                  />
                  <feBlend
                    in="SourceGraphic"
                    in2="effect1_dropShadow_351_1374"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </div>
        </div>
      </body>
    </html>
  );
}

const Kakao = styled.button`
  width: 65px;
  height: 30px;
  background-color: #316094;
  color: #316094;
  position: absolute;
  top: 125px;
  left: 190px;
  cursor: pointer;
`;

const Naver = styled.button`
  width: 65px;
  height: 30px;
  background-color: #316094;
  color: #316094;
  position: absolute;
  top: 170px;
  left: 190px;
  cursor: pointer;
`;
