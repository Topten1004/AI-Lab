'use client'

import { useState, useEffect, useRef } from 'react'
import type { RoomId } from '@/types/roomFocus'
import { scrollToRoom } from '@/lib/roomFocus/scrollToRoom'

export const useRoomFocus = (defaultRoom: RoomId = 'attention') => {
  const [focusedRoom, setFocusedRoom] = useState<RoomId>(defaultRoom)
  const isInitialMount = useRef(true)

  const handleFocusRoom = (room: RoomId) => {
    setFocusedRoom(room)
    // Only scroll when user explicitly clicks, not on initial mount
    if (!isInitialMount.current) {
      scrollToRoom(room)
    }
  }

  // Scroll to default room on initial mount only
  useEffect(() => {
    if (isInitialMount.current) {
      setTimeout(() => {
        scrollToRoom(defaultRoom)
        isInitialMount.current = false
      }, 100) // Small delay to ensure DOM is ready
    }
  }, [defaultRoom])

  return {
    focusedRoom,
    setFocusedRoom: handleFocusRoom,
  }
}

