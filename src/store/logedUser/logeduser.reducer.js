import { LogedUser} from "../../cmps/LogedUser"

export const SET_USER = 'SET_USER'

const initialState = {
  logedUser: {_id: '', name: 'Romi'}
}

export function logedUserReducer (state = initialState, action = {}) {
  switch (action.type) {
    case SET_USER:
      return { ...state,  logedUser: action.logedUser}
    default: return state
  }
}
