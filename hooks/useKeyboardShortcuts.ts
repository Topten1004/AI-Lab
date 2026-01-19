'use client'

import { useEffect } from 'react'
import type { RoomId } from '@/types/roomFocus'

interface KeyboardShortcutsConfig {
  onRoomNavigate: (room: RoomId) => void
  enabled?: boolean
}

const ROOM_KEY_MAP: Record<string, RoomId> = {
  '1': 'conflict',
  '2': 'pattern',
  '3': 'reaction',
  '4': 'attention',
}

export const useKeyboardShortcuts = ({
  onRoomNavigate,
  enabled = true,
}: KeyboardShortcutsConfig) => {
  useEffect(() => {
    if (!enabled) return

    const handleKeyPress = (event: KeyboardEvent) => {
      // Ignore if user is typing in an input field
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        (event.target instanceof HTMLElement && event.target.isContentEditable)
      ) {
        return
      }

      const room = ROOM_KEY_MAP[event.key]
      if (room) {
        event.preventDefault()
        onRoomNavigate(room)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [onRoomNavigate, enabled])
}

