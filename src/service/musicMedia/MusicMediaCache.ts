


import { MusicMedia } from "../interface";

// Create a map to store MusicMedia objects
const mediaMap: Map<number, MusicMedia> = new Map();
  
function fetchMusicMedia(id: number): MusicMedia {
    const musicUrl = require(`./mp3/${id}.mp3`);
    const imageUrl = require(`./img/${id}.png`);
    

    const musicMedia: MusicMedia = {
      id: id,
      song: musicUrl,
      image: imageUrl
    };
  
    return musicMedia;
  }
  
  // Function to set MusicMedia by id, implementing lazy loading
  export function getMusicMediaById(id: number): MusicMedia {
    // Check if the MusicMedia is already present in the map
    if (mediaMap.has(id)) {
      // If it exists, return it directly from the map
      const media = mediaMap.get(id);
      if (media) {
        return media;
      }
    }
  
    // If it doesn't exist, fetch it 
    const musicMedia = fetchMusicMedia(id);
    mediaMap.set(id, musicMedia);
    return musicMedia;
  }

  export type {MusicMedia};

  