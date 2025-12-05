export const scrollToRoom = (roomId: string) => {
  const element = document.getElementById(`room-${roomId}`)
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'center',
      inline: 'nearest'
    })
  }
}

