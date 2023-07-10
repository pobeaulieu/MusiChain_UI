export {}

// Map<id, MusicMedia>
// Implement lazy load. If not in the map, call enpoint and store in map. Else, just return what is in the Map. 
// if map[MusicMediaId] == null -> fetch https://localhost:8000/api/getmusicmedia?id=1 et ajouter a la map
// return map[MusicMediaId]