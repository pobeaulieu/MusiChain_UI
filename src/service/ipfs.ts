

import Moralis from "moralis";

export interface IPFSPaths {
  mp3Url: string,
  imgUrl: string
}

export async function uploadToIpfs(mp3File: File, imgFile: File): Promise<IPFSPaths> {
  await Moralis.start({
    apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjI2YTI4MTBjLWU2OWYtNGY3YS1hNWY2LTU4MTBiYzAwMGQ3NiIsIm9yZ0lkIjoiMzQ5NjMwIiwidXNlcklkIjoiMzU5MzY3IiwidHlwZUlkIjoiNDllNWIzYzgtNGEzMC00ZmU2LWJiMzItMmQ1OWY2NTZiOWIyIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2OTAwNjMyMDUsImV4cCI6NDg0NTgyMzIwNX0.IFXVwzzl6DGWW3-jmSppww6rCF_UHOqo4PrL80REI9c",
  });

  const mp3Content = await readFileAsBase64(mp3File);
  const imgContent = await readFileAsBase64(imgFile);

  const uploadArray = [
    {
      path: "music.mp3",
      content: mp3Content,
    },
    {
      path: "image.png",
      content: imgContent,
    },
  ];

  const response = await Moralis.EvmApi.ipfs.uploadFolder({
    abi: uploadArray,
  });


  return {
    mp3Url: response.result[0].path,
    imgUrl: response.result[1].path
  };
}

function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to read file."));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
