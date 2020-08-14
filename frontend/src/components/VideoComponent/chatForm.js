import React, {useState} from 'react';
import './index.css'
import clip from './img/сlip.png'
import smile from './img/smile.png'
import fly from './img/fly.png'
const ChatForm = () => {

    const[value, setValue] = useState('')
    const  onSubmit = (e)=>{
        e.preventDefault()
        console.log(value)

    }
    const onChange=(e)=>{
        setValue(e.target.value)
    }

    return (
        <form className="chat_form" onSubmit={onSubmit}>
            <div className="chat_form_">
                <label htmlFor="clip"><img src={clip} alt="clip"/></label>
                <input type="file" id="clip"/>
            </div>
            <div className='chat_submit_container'>
                <input placeholder="Write a Message" value={value} onChange={onChange} className="chat_text" type="text"/>
                <button className="chat_submit"><img src={fly} alt=""/></button>
            </div>
            <div>
                <img className="chat_smile" src={smile} alt="smile"/>
            </div>
        </form>
    );
};

export default ChatForm;