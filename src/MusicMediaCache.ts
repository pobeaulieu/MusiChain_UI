// Define the MusicMedia interface
interface MusicMedia {
    id: number;
    mp3File: ArrayBuffer;
    imageFile: ArrayBuffer;
  }
  
  // Create a map to store MusicMedia objects
  const mediaMap: Map<number, MusicMedia> = new Map();
  
  // Function to fetch MusicMedia from the endpoint
  async function fetchMusicMedia(id: number): Promise<MusicMedia> {
    // Make the API call to fetch the MusicMedia using the given id
    const response = await fetch(`https://localhost:8000/api/getmusicmedia?id=${id}`);
    const data = await response.json();
  
    // Convert the MP3 file and image file data to ArrayBuffer
    const mp3FileData = await fetch(data.Mp3File);
    const mp3FileBuffer = await mp3FileData.arrayBuffer();
  
    const imageFileData = await fetch(data.ImgFile);
    const imageFileBuffer = await imageFileData.arrayBuffer();
  
    // Create a MusicMedia object from the retrieved data
    const musicMedia: MusicMedia = {
      id: data.id,
      mp3File: mp3FileBuffer,
      imageFile: imageFileBuffer,
      // Assign other properties here...
    };
  
    return musicMedia;
  }
  
  // Function to set MusicMedia by id, implementing lazy loading
  export async function setMusicMediaById(id: number): Promise<MusicMedia> {
    // Check if the MusicMedia is already present in the map
    if (mediaMap.has(id)) {
      // If it exists, return it directly from the map
      const media = mediaMap.get(id);
      if (media) {
        return media;
      }
    }
  
    // If it doesn't exist, fetch it from the endpoint and store it in the map
    const musicMedia = await fetchMusicMedia(id);
    mediaMap.set(id, musicMedia);
    return musicMedia;
  }
  
  export type {MusicMedia};

  