export type RoomId = 'attention' | 'reaction' | 'pattern' | 'conflict'

export interface RoomFocusState {
  focusedRoom: RoomId
  setFocusedRoom: (room: RoomId) => void
}

