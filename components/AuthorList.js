import React from "react";
import Author from "./Author";

export default function AuthorList({ authors }) {
  // if authors is undefined, return null
  if (!authors) {
    return null;
  }

  //map through all the authors
  const authorElements = authors.map((a, index) => {
    return <Author key={index} authorName={a.name} />;
  });

  return <div className='author__display'>{authorElements}</div>;
}
