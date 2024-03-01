const CAT_ENDPOINT_RANDOM_FACT = "https://catfact.ninja/fact";

export const getRandomFact = () => {
  return fetch(CAT_ENDPOINT_RANDOM_FACT)
    .then((res) => res.json())
    .then((data) => {
      const { fact } = data;
      return fact;
    });
};

// export const getRandomFact = () => {
//     const res = await fetch(CAT_ENDPOINT_RANDOM_FACT)
//     const json = res.json()
//     return json.fact 
// }
