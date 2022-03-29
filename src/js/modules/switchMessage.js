export const switchMessage = (id) => {
  messagesArray.forEach((message) => {
      if (message.id === id) {
          message.classList.remove('js-hidden');
      } else {
          message.classList.add('js-hidden');
      }
  });
}