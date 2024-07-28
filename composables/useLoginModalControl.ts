export const useLoginModalControl = () => {
  const message = useState('login')
  message.value = false

  const open_modal_login = () => {
    console.log('open_modal_login');
    message.value = true
  }

  const close_modal_login = () => {
    message.value = false
  }

  function run() {
    console.log('message', message.value);

    return message;
  }

  return {
    run,
    open_modal_login,
    close_modal_login
  }
}