import {ADD_PROCESS, MOVE_TO_READY, DISPATCH_TO_CPU, TICK_CPU, MOVE_TO_WAITING, MOVE_TO_TERMINATED, RESET} from './actions'
import type {PCB} from '../simulator/models/PCB' 
import type { ProcessAction } from './processAction';

export function processReducer(state: PCB[], action: ProcessAction): PCB[] {
    switch(action.type){
        case ADD_PROCESS:
            return [...state, action.payload]
        case MOVE_TO_READY:
            return state.map(p =>
                p.id === action.payload
                ? { ...p, state: "Ready" } 
                : p
            );
        case DISPATCH_TO_CPU:
            return state.map(p =>
                p.id === action.payload
                ? { ...p, state: "Executing"}
                : p
            );
        case TICK_CPU:
            return state.map(p =>
                p.id === action.payload
                ? { ...p, remainingTime: p.remainingTime - 1 }
                : p
            );

        case MOVE_TO_WAITING:

            return state.map(p =>
                p.id === action.payload
                ? { ...p, state: "Waiting"}
                : p
            );
        case MOVE_TO_TERMINATED:
            return state.map(p =>
                p.id === action.payload
                ? { ...p, state: "Terminated"}
                : p
            );

        case RESET: 
            return [];
            
        default:
            return state;

    }
}