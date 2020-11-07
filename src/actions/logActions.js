import { SET_LOADING, GET_LOGS, LOGS_ERROR , ADD_LOG, DELETE_LOG, SET_CURRENT, CLEAR_CURRENT, UPDATE_LOG, SEARCH_LOGS} from './types'


/*export const getLogs = ()=>{
 return async (dispatch)=> {
     setLoading();
     const res= await fetch('/logs')
     const data = await res.json();
     dispatch({
         type: GET_LOGS,
         payload: data
     })
 }
} */

//get logs from the server
export const getLogs = ()=> async (dispatch)=>{
    try{
        setLoading();
        const res= await fetch('/logs')
        const data = await res.json();
        console.log(data , 'json data')
        dispatch({
            type: GET_LOGS,
            payload: data
        })
    }catch(err){
         dispatch({
             type: LOGS_ERROR,
             payload: err.response.statusText
         })
    }
        
} 


//set loading to true
export const setLoading = ()=>{
    return{
        type: SET_LOADING
    }
}


// add new log 
export const addLogs = (log)=> async dispatch=>{
        try{
            setLoading()

            const res = await fetch('/logs' ,{
                method: 'POST',
                body : JSON.stringify(log),
                headers: {
                    'Content-Type' : 'Application/json'
                }
            }) 
            const data = await res.json()

            dispatch({
                type: ADD_LOG,
                payload : data
            })
        }catch(err){
            dispatch({
                type: LOGS_ERROR,
                payload: err.response.statusText
            })
        }
}

// delete a log
export const deleteLog = (id) => async dispatch=>{
     try{
        await fetch(`/logs/${id}` , {
              method: 'DELETE',
        })
        dispatch({
            type: DELETE_LOG,
            payload :id
        })
     }catch(err){
        dispatch({
            type: LOGS_ERROR,
            payload: err.response.statusText
        })
     }   
}

//update a log on server
export const updateLog = log => async dispatch =>{
   try{
    const res= await fetch(`/logs/${log.id}` , {
        method: 'PUT',
        body : JSON.stringify(log),
        headers: {
            'Content-Type' : 'application/json'
        }
    })
    const data = await res.json() 
    dispatch({
        type: UPDATE_LOG,
        payload : data
    })
   }catch(err){
       dispatch({
           type: LOGS_ERROR,
           payload: err.response.statusText
       })
   }

}

// select a current log
export const setCurrent = log=>{
 return{
     type: SET_CURRENT,
     payload : log
 }
}



// clear a current log
export const clearCurrent = ()=>{
    return{
        type: CLEAR_CURRENT
    }
}

//search server log
export const searchLogs = (text)=> async dispatch =>{
      try{
       setLoading();   
       const res=  await fetch(`/logs?q=${text}`)
       const data = await res.json()
       if(data.length!==0){
        dispatch({
            type:SEARCH_LOGS,
            payload: data
        })
       }
     
      }catch(err){
          dispatch({
              type: LOGS_ERROR,
              payload: err.response.statusText
          })
      }
}