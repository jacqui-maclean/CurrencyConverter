//toggles between outlined icon and empty icon onClick function in parent 
// is being called at the end of the toggle function
import { useState } from 'react'
import { AiFillHeart } from 'react-icons/ai'
import { AiOutlineHeart } from 'react-icons/ai'

//({onClick}) is destructured props
const Like = ({onClick}) => {

   const [status, setStatus] = useState(false)
   const toggle = () => {
    setStatus(!status);
    onClick();
   }
    return (
    
    <div>
        { status ?
            <AiFillHeart onClick={toggle}/>
            :
            < AiOutlineHeart onClick={toggle}/>
        }
    </div>
    )
}

export default Like;