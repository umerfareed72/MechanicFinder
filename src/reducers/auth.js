
import {Set_CurrentUser,google_Login, Set_Rate} from "../actions/Types"
import isEmpty from "lodash/isEmpty"
const initialState={
    isAuthenticated:false,
    user:{},
data:{},
flag:false,
users:{}
}
export default (state=initialState,action={})=>{
    switch(action.type){
        case Set_CurrentUser:return{
            isAuthenticated:!isEmpty(action.user), 
         
            user:action.user
        }  
        case google_Login:return{
            data:action.data,
            flag:true
        }  
        case Set_Rate:return{
            users:action.users,
            }  
        default: return state
    }
}