import React, { useState } from "react";
import Head from "next/head";
import tiesses from "../data/tiesses";
import InfiniteScroll from "react-infinite-scroller";
import shuffle from "lodash/shuffle";

const shuffledTiesses = shuffle(tiesses);
const numberOfTiessesLoadedByScroll = 1;

const Home = () => {
  const [loadedTiesses, changeLoadedTiesses] = useState([]);
  const startIndex = loadedTiesses.length;
  const hasMore = loadedTiesses.length < shuffledTiesses.length;
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
        <style>
          {`body {
            padding: 0;
            margin: 0;
            width: 100vw;
            overflow-x: hidden;
          }`}
        </style>
      </Head>
      {process.browser && (
        <InfiniteScroll
          loadMore={() => {
            changeLoadedTiesses([
              ...loadedTiesses,
              ...shuffledTiesses.slice(
                startIndex,
                startIndex + numberOfTiessesLoadedByScroll
              )
            ]);
          }}
          hasMore={hasMore}
          loader={<div key={0}>Chargement de biesses tiesses...</div>}
        >
          <div className="tiesses">
            {loadedTiesses.map(filename => (
              <img key={filename} src={`/tiesses/${filename}`} />
            ))}
          </div>
        </InfiniteScroll>
      )}
      {!hasMore && (
        <p>
          <a href="mailto:miauchi@biessetiesse.com?subject=Eum'tiesse">
            T'veux vire eut'biesse tiesse ichi auchi ? Envoie-la à
            miauchi@biessetiesse.com
          </a>
        </p>
      )}

      <style jsx>{`
        @keyframes rotation {
          100% {
            transform: rotate(360deg);
          }
        }
        .tiesses {
          font-family: sans-serif;
          display: flex;
          justify-content: space-around;
          width: 100vw;
          overflow: hidden;
          align-items: center;
          flex-wrap: wrap;
        }
        .tiesses img {
          width: 600px;
          height: 600px;
        }
        .tiesses img:nth-child(3n) {
          animation: 4s linear rotation infinite;
        }
        .tiesses img:nth-child(3n + 1) {
          animation: 4s linear rotation reverse infinite;
        }
        .tiesses img:nth-child(3n + 2) {
          animation: 4s linear 1s rotation infinite;
        }
        p {
          margin: 0 auto;
          text-align: center;
          padding: 0 0 5em 0;
        }
      `}</style>
    </div>
  );
};

export default Home;
