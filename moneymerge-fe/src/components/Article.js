import styled from "styled-components";
import { useState, useEffect } from "react";

const OverlayDiv = styled.div`
  position: absolute;
  top: 54.491px;
  left: 15.264px;
  width: 615.401px;
  height: 433.46px;
  box-sizing: border-box;
`;

const Article = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 0);
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="652"
        height="514"
        fill="none"
      >
        <path fill="#000" d="M6.071 7.981H652V514H6.071z" />
        <path fill="#FFAFBC" stroke="#000" d="M.5.5h644.929v505.019H.5z" />
        <path
          fill="#F1FF9D"
          stroke="#000"
          d="M1.714 42.003h643.715v461.919H1.714z"
        />
        <path
          fill="#FFE9E9"
          stroke="#000"
          d="M15.264 54.491h615.401v433.46H15.264z"
        />
        <path fill="#fff" d="M589.869 8.51h39.148v25.701h-39.148z" />
        <path fill="#fff" d="M589.869 8.51h39.148v25.701h-39.148z" />
        <path fill="#fff" d="M589.869 8.51h39.148v25.701h-39.148z" />
        <path stroke="#000" d="M589.869 8.51h39.148v25.701h-39.148z" />
        <path fill="#fff" d="M541.692 8.51h39.148v25.701h-39.148z" />
        <path fill="#fff" d="M541.692 8.51h39.148v25.701h-39.148z" />
        <path fill="#fff" d="M541.692 8.51h39.148v25.701h-39.148z" />
        <path stroke="#000" d="M541.692 8.51h39.148v25.701h-39.148z" />
        <path
          fill="#050505"
          d="m560.463 11.348 11.821 11.422h-23.642l11.821-11.422Z"
        />
        <path fill="#050505" d="M554.613 18.963h12.48v11.076h-12.48z" />
        <path
          stroke="#000"
          strokeWidth="3"
          d="M0-1.5h25.438"
          transform="matrix(.73109 .68228 -.83573 .54914 599.005 13.35)"
        />
        <path
          stroke="#000"
          strokeWidth="3"
          d="M0-1.5h25.438"
          transform="matrix(.73109 -.68228 .83573 .54914 601.284 30.706)"
        />
      </svg>
      <OverlayDiv
        style={{
          visibility: loading ? "hidden" : "visible",
        }}
      >
        {children}
      </OverlayDiv>
    </div>
  );
};

export default Article;
