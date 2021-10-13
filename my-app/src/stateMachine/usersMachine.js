import { createMachine, assign } from 'xstate'
import { getUsers } from '../actions';

export const usersMachine = createMachine({
  id: 'usersMachine',
  initial: 'idle',
  context: {
    users: [],
    request: {}
  },
  states: {
    idle: {
      on: 
        { 
          SET_SEARCH_PARAMS: {
            actions: assign({
            request: (_, event) => event.value
          })
        },
        CLEAR_SEARCH_PARAMS: {
          actions: assign({
          request: (_, event) => null
        })
      },
      SEARCH: {
        target: "searching"
      }
    }
  },
  searching: {
    invoke: {
      id: 'searching',
      src: getUsers,
      onDone: {
        actions: assign({
          users: (context, event) =>
            event.data.result
          }),
          target: 'idle',
        },
      },
  },
  inactive: {
      on: { TOGGLE: 'active' }
    },
  active: {
      on: { TOGGLE: 'inactive' }
    }
  }
});