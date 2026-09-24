"use client";

import React, { useState, useEffect } from "react";

interface TypewriterTextProps {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  delaySpeed?: number;
  theme?: "dark" | "light";
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  words,
  typeSpeed = 70,
  deleteSpeed = 50,
  delaySpeed = 1500,
  theme = "dark",
}) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex % words.length];

    let timer: NodeJS.Timeout;

    if (!isDeleting && text === currentWord) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, delaySpeed);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    } else {
      timer = setTimeout(
        () => {
          setText((prev) =>
            isDeleting
              ? currentWord.substring(0, prev.length - 1)
              : currentWord.substring(0, prev.length + 1)
          );
        },
        isDeleting ? deleteSpeed : typeSpeed
      );
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, words, typeSpeed, deleteSpeed, delaySpeed]);

  return (
    <span
      className={`${
        theme === "light" ? "text-amber-700" : "text-yellow-500"
      } font-semibold transition-colors`}
    >
      <span>{text}</span>
      <span className="animate-blink font-mono ml-0.5">_</span>
    </span>
  );
};
