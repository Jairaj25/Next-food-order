"use client";
import { useRef, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import "./index.css";

function CustomCursor() {
  const cursorDotOutline = useRef();
  const cursorDot = useRef();
  const requestRef = useRef();
  const previousTimeRef = useRef();
  let [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  let cursorVisible = useState(false);
  let cursorEnlarged = useState(false);
  const pathname = usePathname();



  const onMouseMove = event => {
    const { pageX: x, pageY: y } = event;
    setMousePosition({ x, y });
    positionDot(event);
  };
  const onMouseEnter = () => {
    cursorVisible.current = true;
    toggleCursorVisibility();
  };
  const onMouseLeave = () => {
    cursorVisible.current = false;
    toggleCursorVisibility();
  };
  const onMouseDown = () => {
    cursorEnlarged.current = true;
    toggleCursorSize();
  };
  const onMouseUp = () => {
    cursorEnlarged.current = false;
    toggleCursorSize();
  };
  const onResize = event => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };


  useEffect(() => {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseenter", onMouseEnter);
      document.addEventListener("mouseleave", onMouseLeave);
      document.addEventListener("mousedown", onMouseDown);
      document.addEventListener("mouseup", onMouseUp);
      window.addEventListener("resize", onResize);
      requestRef.current = requestAnimationFrame(animateDotOutline);

      handleLinks();

      return () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseenter", onMouseEnter);
        document.removeEventListener("mouseleave", onMouseLeave);
        document.removeEventListener("mousedown", onMouseDown);
        document.removeEventListener("mouseup", onMouseUp);
        window.removeEventListener("resize", onResize);
        cancelAnimationFrame(requestRef.current);
      };
  }, []);

  useEffect(() => {
    handleLinks();
  }, [pathname]);

  let { x, y } = mousePosition;
  const winDimensions = { width, height };
  let endX = winDimensions.width / 2;
  let endY = winDimensions.height / 2;


  function positionDot(e) {
    cursorVisible.current = true;
    toggleCursorVisibility();
    endX = e.pageX;
    endY = e.pageY;
    cursorDot.current.style.top = endY + "px";
    cursorDot.current.style.left = endX + "px";
  }


  function toggleCursorVisibility() {
    if (cursorVisible.current) {
      cursorDot.current.style.opacity = 1;
      cursorDotOutline.current.style.opacity = 1;
    } else {
      cursorDot.current.style.opacity = 0;
      cursorDotOutline.current.style.opacity = 0;
    }
  }


  function toggleCursorSize() {
    if (cursorEnlarged.current) {
      cursorDot.current.style.transform = "translate(-50%, -50%) scale(2.5)";
      cursorDotOutline.current.style.transform =
        "translate(-50%, -50%) scale(1)";
    } else {
      cursorDot.current.style.transform = "translate(-50%, -50%) scale(1)";
      cursorDotOutline.current.style.transform =
        "translate(-50%, -50%) scale(1)";
    }
  }


  function handleLinks() {

    const handleLinkMouseOver = () => {
      cursorEnlarged.current = true;
      toggleCursorSize();
    };

    const handleLinkMouseOut = () => {
      cursorEnlarged.current = false;
      toggleCursorSize();
    };

    const elements = document.querySelectorAll("a, button, input, .menu-icon, .menu-options, .menu-category-list");

    elements.forEach((el) => {
      el.addEventListener("mouseover", handleLinkMouseOver);
      el.addEventListener("mouseout", handleLinkMouseOut);
    });

    return () => {
      elements.forEach((el) => {
        el.removeEventListener("mouseover", handleLinkMouseOver);
        el.removeEventListener("mouseout", handleLinkMouseOut);
      });
    };

  }

  const animateDotOutline = time => {
    if (previousTimeRef.current !== undefined) {
      x += (endX - x) / 4;
      y += (endY - y) / 4;
      cursorDotOutline.current.style.top = y + "px";
      cursorDotOutline.current.style.left = x + "px";
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animateDotOutline);
  };

  return (
    <div className='custom-cursor'>
      <div ref={cursorDotOutline} id='cursor-dot-outline' />
      <div ref={cursorDot} id='cursor-dot' />
    </div>
  );
}

export default CustomCursor;