
import '../styles.css';

export default function Search({value,click,change,keyPress}) {

    
    return (
        <div className='search-container'>
            <input type='text' value={value} onChange={change} onKeyPress={keyPress} placeholder='Search photos'/>
            <i className="fas fa-search" onClick={click}></i>
        </div>
    )
}