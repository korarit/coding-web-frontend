export const useModalControl = () => {
    const message = useState('modal')
    message.value = false
  
    const open_modal = () => {
      message.value = true
    }
  
    const close_modal = () => {
      message.value = false
    }
  
    function statusModal() {  
      return message;
    }
  
    return {
        statusModal,
        open_modal,
        close_modal
    }
  }