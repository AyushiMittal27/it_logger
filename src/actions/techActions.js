import { ADD_TECH, GET_TECHS, SET_LOADING, TECHS_ERROR, DELETE_TECH } from './types'



// get techs from the server
export const getTechs = ()=> async dispatch=>{
    console.log("Into Tech");
    try{
        setLoading()
        const res= await fetch ('/techs')
        const data = await res.json()
        console.log(data , 'data')
        dispatch({type: GET_TECHS , payload: data})
    }catch(err){
        console.log('an error has occured' , err)
        dispatch({type: TECHS_ERROR , payload: err.response})
    }
}

//set Loading to true
const setLoading = ()=>dispatch=>{
    dispatch({type: SET_LOADING })
}

// add a tech to server
export const addTech = (tech)=> async dispatch=>{

     try{
        const res= await fetch('/techs' , {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(tech)
        })
   
        const data = await res.json()
   
        dispatch({type: ADD_TECH , payload: data})
     }catch(err){
        dispatch({type:TECHS_ERROR , payload: err.response})
     }

}


//delete tech from a server

export const deleteTech = (id) => async dispatch=>{
      try{
        setLoading()  
        await fetch(`/techs/${id}` , {
            method: 'DELETE'
        })
        dispatch({type:DELETE_TECH , payload: id})
      }catch(err){
        dispatch({type: TECHS_ERROR , payload: err.response.statusText})
      }


} 