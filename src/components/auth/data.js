import Api from "./configure";


const savedCode = localStorage.getItem("code");

const requestOptions = {
  headers: { "Content-Type": "application/json" },
  body: {
    code: savedCode
  },
};

// const getData = async () => {
//   const response = await Api.post("/", requestOptions.body)
//     // .then((res) => res.data)
// return response.data
//     // .catch((err) => {
//     //   console.error(err);
//     // });
// };
const getData2 = async () => {
  const response = await Api.post("/", requestOptions.body)
    // .then((res) => res.data)

  const userDetails  = response.data[0]
const recomendedAlbums = response.data[1].data
// const lastPlayed = response.data[2]
const lastPlayed = response.data[2].data
const artists = response.data[3].data
console.log(artists,'artistsc')
return [userDetails, recomendedAlbums, lastPlayed, artists]

    //  .catch((err) => {
    //    console.error(err);
    //  });
};


export {getData2};
