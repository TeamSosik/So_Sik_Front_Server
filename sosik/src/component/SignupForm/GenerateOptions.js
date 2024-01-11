import React from "react";

const GenerateOptions = (start, end) => {
  if (start >= end) {
    return Array.from(
      { length: start - end + 1 },
      (_, index) => end + index
    ).reverse();
  } else {
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }
};

export default GenerateOptions;
