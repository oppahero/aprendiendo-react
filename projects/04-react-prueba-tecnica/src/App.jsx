import { useEffect, useState } from "react";
import "./App.css";

const CAT_ENDPOINT_RANDOM_FACT = "https://catfact.ninja/fact";
const CAT_PREFIX_IMAGE_URL = "https://cataas.com";

export function App() {
  const [fact, setFact] = useState();
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then((res) => res.json())
      .then((data) => {
        const { fact } = data;
        setFact(data.fact);
      });

    // async function getRandomFact() {
    //     const res = await fetch(CAT_ENDPOINT_RANDOM_FACT)
    //     const json = res.json()
    //     setFact(json.fact)
    // }
    // getRandomFact()
  }, []);

  useEffect(() => {
    if(!fact) return
    
    const threeFirstWords = fact.split(" ", 3).join(" ");

    fetch(
      `https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&json=true`
    )
      .then((res) => res.json())
      .then((response) => {
        const { _id } = response;
        const url = `/cat/${_id}/says/${threeFirstWords}`;
        setImageUrl(url);
      });
  }, [fact]);

  return (
    <main>
      <h1>App de gatitos</h1>
      {/* <section> */}
      {fact && <p>{fact}</p>}
      {imageUrl && (
        <img
          src={`${CAT_PREFIX_IMAGE_URL}${imageUrl}`}
          alt={`Image extracted using the first three words for ${fact}`}
        />
      )}
      {/* </section> */}
    </main>
  );
}
