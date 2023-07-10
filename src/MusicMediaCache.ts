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
    // Create query parameters
    const queryParams = new URLSearchParams();
    queryParams.append('id', id.toString());

    // Make the API call to fetch the MusicMedia using the given query parameters
    const response = await fetch(`https://localhost:8000/api/getmusicmedia?${queryParams}`);
  
    const data = await response.json();

    console.log(data)
  
 
    // Convert the Base64-encoded MP3 file to ArrayBuffer
    const mp3FileBuffer = base64ToArrayBuffer(data.Mp3File);

    // Convert the Base64-encoded image file to ArrayBuffer
    const imageFileBuffer = base64ToArrayBuffer(data.ImgFile);
    
    // Create a MusicMedia object from the retrieved data
    const musicMedia: MusicMedia = {
      id: data.Id,
      mp3File: mp3FileBuffer,
      imageFile: imageFileBuffer,
      // Assign other properties here...
    };
  
    return musicMedia;
  }
  
  // Function to set MusicMedia by id, implementing lazy loading
  export async function getMusicMediaById(id: number): Promise<MusicMedia> {
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

  // Function to convert Base64 string to ArrayBuffer
function base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binaryString = atob(base64);
    const length = binaryString.length;
    const buffer = new ArrayBuffer(length);
    const view = new Uint8Array(buffer);
  
    for (let i = 0; i < length; i++) {
      view[i] = binaryString.charCodeAt(i);
    }
  
    return buffer;
  }
  
  export type {MusicMedia};

  