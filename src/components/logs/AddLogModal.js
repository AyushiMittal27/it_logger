import React, { useState } from 'react'
import M from 'materialize-css/dist/js/materialize.min.js'
import {connect} from 'react-redux' 
import {addLogs} from '../../actions/logActions'
import AddBtn from '../layout/AddBtn'
import PropTypes from 'prop-types'
import TechSelectOptions from '../tech/TechSelectOptions'

const AddLogModal = ({addLogs}) =>{

const[message , setMessage] = useState('')
const [attention , setAttention] = useState(false)
const[tech , setTech] = useState('')

const onSubmit = ()=>{
   if(message === '' || attention === ''  || tech==='' ){
       M.toast({html :'Please enter all the values'})
   }else{
       const newLog = {
           message ,
           attention,
           tech,
           date : new Date()
       }
       addLogs(newLog);
       M.toast({html: `Log added by ${tech}`})
       //clear fields
       setMessage('')
       setAttention('')
       setTech(false)
   }

}
return(
   <div id='add-log-modal' className="modal" style={modalStyle} >
   <div className="modal-content">
       <h4> Enter System Log</h4>
       <div className="row">
           <div className="input-field">
           <input type="text" name="messgae"  value={message} onChange = { e => setMessage(e.target.value)} />
           <label htmlFor="message" className="active">Log Message</label>
       </div>
       </div>

       <div className="row">
           <div className="input-field">
               <select name="tech" value={tech} className="browser-default" 
               onChange={e=> setTech(e.target.value)}>
                   <option value="" disabled>Select Technician</option>
                   <TechSelectOptions />
               </select>
           </div>   
       </div>
       
       <div className="row">
           <div className="input-field">
               <p>
                   <label>
                       <input type="checkbox" className="filled-in"  checked={attention} value={attention} onChange={e => setAttention(!attention)} />
                   <span>Needs Attention</span>
                   </label>
               </p>
           </div>
       </div>
       <div className="modal-footer">
           < a href="#!" onClick ={onSubmit} className="modal-close waves-effect waves-light btn">Enter </a>
       </div>
   </div>
   

   </div>

)


}
AddLogModal.propTypes= {
    addLogs : PropTypes.func.isRequired
}

const modalStyle= {
    width : '75%',
    height : '75%'
}



export default connect(null , {addLogs})(AddLogModal)