import { useEffect, useRef, useState } from "react";

/**
 * ScrollReveal Component
 * Continuously loops: as you scroll down, sections slide gracefully into view;
 * as you scroll up or away, they slide gracefully out of view.
 */
export const ScrollReveal = ({
  children,
  className = "",
  animation = "fade-up", // 'fade-up', 'fade-in', 'scale-up', 'slide-left', 'slide-right'
  delay = 0,
  threshold = 0.1,
  once = false, // Looping enabled: continuous slide in and slide out
  as: Component = "div",
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(element);
          }
        } else {
          // Slide out when leaving view, creating the continuous loop
          setIsVisible(false);
        }
      },
      {
        threshold: threshold,
        rootMargin: "0px 0px -30px 0px"
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, once]);

  const getAnimationClasses = () => {
    if (isVisible) {
      return "opacity-100 translate-y-0 translate-x-0 scale-100";
    }

    switch (animation) {
      case "fade-up":
        return "opacity-0 translate-y-12 scale-[0.98]";
      case "fade-in":
        return "opacity-0";
      case "scale-up":
        return "opacity-0 scale-[0.92] translate-y-10";
      case "slide-left":
        return "opacity-0 -translate-x-12";
      case "slide-right":
        return "opacity-0 translate-x-12";
      default:
        return "opacity-0 translate-y-12";
    }
  };

  return (
    <Component
      ref={ref}
      className={`transition-all duration-650 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:transform-none will-change-[opacity,transform] ${getAnimationClasses()} ${className}`}
      style={{
        transitionDelay: isVisible ? `${delay}ms` : "0ms"
      }}
      {...props}
    >
      {children}
    </Component>
  );
};
