import { JOIN_ROOM } from "./../Types/roomTypes";

export function joinRoom(room) { 
  return { type: JOIN_ROOM, room }; 
}