

import Moralis from "moralis";

export interface IPFSPaths {
  mp3Url: string,
  imgUrl: string
}

export async function uploadToIpfs(mp3File: File, imgFile: File): Promise<IPFSPaths> {


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
