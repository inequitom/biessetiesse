import React, { useState } from "react";
import Head from "next/head";
import tiesses from "../data/tiesses";
import InfiniteScroll from "react-infinite-scroller";

const numberOfTiessesLoadedByScroll = 10;

const Home = () => {
  const [loadedTiesses, changeLoadedTiesses] = useState(
    tiesses.splice(0, numberOfTiessesLoadedByScroll)
  );
  const startIndex = loadedTiesses.length;
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="tiesses">
        <InfiniteScroll
          loadMore={() => {
            changeLoadedTiesses([
              ...loadedTiesses,
              tiesses.slice(
                startIndex,
                startIndex + numberOfTiessesLoadedByScroll
              )
            ]);
          }}
          hasMore={loadedTiesses.length < tiesses.length}
          loader={<div key={0}>Chargement de biesses tiesses...</div>}
        >
          {loadedTiesses.map(filename => (
            <img key={filename} src={`/tiesses/${filename}`} />
          ))}
        </InfiniteScroll>
      </div>

      <style jsx>{`
        @keyframes rotation {
          100% {
            transform: rotate(360deg);
          }
        }
        .tiesses {
          font-family: sans-serif;
          display: flex;
          justify-content: space-between;
          width: 100%;
          align-items: center;
          flex-wrap: wrap;
        }
        .tiesses img {
          width: 600px;
        }
        .tiesses img:nth-child(2n) {
          animation: 4s linear rotation infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;
