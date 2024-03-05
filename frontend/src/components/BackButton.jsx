import {Link} from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import PropTypes from 'prop-types'

const BackButton = ({destination}) => {
  return (
    <div className='flex'>
        <Link to={destination} className='bg-gray-500 text-white px-2 py-1 absolute top-2 left-2  rounded-lg w-fit'>
            <BsArrowLeft className='text-lg' />
        </Link> 
    </div>
  )
}

BackButton.propTypes={
    destination:PropTypes.any
}


export default BackButton