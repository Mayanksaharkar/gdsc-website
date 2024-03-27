import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

export const ScrollManager = (props: {
  section: number;
  onSectionChange: Function;
}) => {
  const { section, onSectionChange } = props;

  const data = useScroll();
  const lastScroll = useRef(0);
  const isAnimating = useRef(false);
  const threshold = 0.005;

  data.fill.classList.add("top-0");
  data.fill.classList.add("absolute");

  useEffect(() => {
    console.log(data);
    gsap.to(data.el, {
      duration: 1,
      scrollTop: section * data.el.clientHeight,
      onStart: () => {
        isAnimating.current = true;
      },
      onComplete: () => {
        isAnimating.current = false;
      },
    });
  }, [section, data]);

  useFrame(() => {
    if (isAnimating.current) {
      lastScroll.current = data.scroll.current;
      return;
    }

    const curSection = Math.floor(data.scroll.current * data.pages);
    const scrollDelta = Math.abs(data.scroll.current - lastScroll.current);

    if (scrollDelta > threshold) {
      const scrollDirection =
        data.scroll.current > lastScroll.current ? "down" : "up";

      if (scrollDirection === "down") {
        if (curSection < data.pages - 1) {
          onSectionChange(curSection + 1);
          lastScroll.current = data.scroll.current;
        }
      } else if (scrollDirection === "up") {
        if (curSection > 0) {
          onSectionChange(curSection - 1);
          lastScroll.current = data.scroll.current;
        }
      }
    }
  });

  return null;
};
