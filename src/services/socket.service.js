import io from 'socket.io-client'
import { utilService } from './util.service.js'

const SOCKET_EMIT_LOGIN = 'set-user-socket'
const SOCKET_EMIT_LOGOUT = 'unset-user-socket'


const baseUrl = (process.env.NODE_ENV === 'production') ? '' : '//localhost:3030'
export const socketService = createSocketService()
// export const socketService = createDummySocketService()

// for debugging from console
window.socketService = socketService

socketService.setup()


function createSocketService() {
  var socket = null
  const socketService = {
    setup() {
      const {_id} = utilService.loadFromStorage('loggeduser') || {}
      socket = io(baseUrl)
      console.log('Socket is ready', _id)
      if(_id) this.login(_id)
    },
    on(eventName, cb) {
      socket.on(eventName, cb)
    },
    off(eventName, cb = null) {
      if (!socket) return
      if (!cb) socket.removeAllListeners(eventName)
      else socket.off(eventName, cb)
    },
    emit(eventName, data) {
      console.log('Emitting', eventName, data)
      socket.emit(eventName, data)
    },
    login(userId) {
      socket.emit(SOCKET_EMIT_LOGIN, userId)
    },
    logout() {
      socket.emit(SOCKET_EMIT_LOGOUT)
    },
    terminate() {
      socket = null
    },

  }
  return socketService
}

// function createDummySocketService() {
//   var listenersMap = {}
//   const socketService = {
//     listenersMap,
//     setup() {
//       listenersMap = {}
//     },
//     terminate() {
//       this.setup()
//     },
//     login() {
//       console.log('Dummy socket service here, login - got it')
//     },
//     logout() {
//       console.log('Dummy socket service here, logout - got it')
//     },
//     on(eventName, cb) {
//       listenersMap[eventName] = [...(listenersMap[eventName]) || [], cb]
//     },
//     off(eventName, cb) {
//       if (!listenersMap[eventName]) return
//       if (!cb) delete listenersMap[eventName]
//       else listenersMap[eventName] = listenersMap[eventName].filter(l => l !== cb)
//     },
//     emit(eventName, data) {
//       var listeners = listenersMap[eventName]
//       if (eventName === SOCKET_EMIT_SEND_MSG) {
//         listeners = listenersMap[SOCKET_EVENT_ADD_MSG]
//       }

//       if (!listeners) return

//       listeners.forEach(listener => {
//         listener(data)
//       })
//     },
//     // Functions for easy testing of pushed data
//     testChatMsg() {
//       this.emit(SOCKET_EVENT_ADD_MSG, { from: 'Someone', txt: 'Aha it worked!' })
//     },
//     testUserUpdate() {
//       this.emit(SOCKET_EVENT_USER_UPDATED, { ...userService.getLoggedinUser(), score: 555 })
//     }
//   }
//   window.listenersMap = listenersMap
//   return socketService
// }


// Basic Tests
// function cb(x) {console.log('Socket Test - Expected Puk, Actual:', x)}
// socketService.on('baba', cb)
// socketService.on('baba', cb)
// socketService.on('baba', cb)
// socketService.on('mama', cb)
// socketService.emit('baba', 'Puk')
// socketService.off('baba', cb)