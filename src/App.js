import {useState,useRef,useEffect} from 'react';
import './styles.css';
import Search from './components/Search';
import Card from './components/Card';
function App() {

  let pageRef = useRef(1);
  const [query,setQuery] = useState('Sunset');
  const [images,setImages] = useState([]);
  const [isValid,setValidity] = useState(false);

  useEffect(() => {
    getImage(query,pageRef.current)
  },[])
  

  function changeHandler(e) {
    setQuery(e.target.value);
  }
  function clickHandler() {
    getImage(query,pageRef);
  }
  function enterKeyHandler(e) {
    if(e.key === 'Enter') {
      getImage(query,pageRef);
    }
  }

  function prevPage() {
    if(pageRef.current > 1) {
      pageRef.current--;
      getImage(query,pageRef.current);
      console.log(pageRef.current);
    }
  }

  function nextPage() {
    pageRef.current++;
    getImage(query,pageRef.current);
  }

  function getImage(query,page) {
    let baseUrl = "https://api.unsplash.com/search/photos/";
    let apiKey = 'w1vEwcdSeuPlrUWE6cXygihcELxXQfEmH8ISI8SAcS4';
    fetch(`${baseUrl}?query=${query}&client_id=${apiKey}&page=${page}&per_page=12`)
      .then(response => response.json())
      .then(data => {
        if(data.total === 0) {
          setQuery('');
          setValidity(false);
        } else {
          setValidity(true);
          const items = data.results.map((result) => {
            return ({
              preview: result.urls.small,
              large: result.urls.full,
              medium: result.urls.regular,
              small: result.urls.small,
              id: result.urls.full.slice(28,60)
            })
          })
          setImages(items);
        }
      })
      .catch(() => {
        setQuery('');
      });
  }

  return (
    <div className='container'>
    <header> 
        <Search value={query} click={clickHandler} change={changeHandler} keyPress={enterKeyHandler}/>
        <img src='images/logo.svg' alt=''/>
      </header>
    <div className={isValid ?"App gradient" : 'App'}>
      {
        (isValid && pageRef.current > 1) && <button onClick={prevPage} className='prev-btn'><i className="fas fa-chevron-left"></i></button>
      }
      <div className='card-container'>
       {
         isValid?images.map((image) => {
          return (
            <Card image={image.preview} large={image.large} medium={image.medium} small={image.small} key={image.id} />
          )
        }): <img src="images/404.svg" alt="" className='err-image' />
       }
      </div>
      {
        isValid && <button onClick={nextPage} className='next-btn'><i className="fas fa-chevron-right"></i></button>
      }
      </div>
      <footer className={isValid?'':'fixed-bottom'}>
      <p className='copyright'>Image © <a href="https://unsplash.com" target='_blank' rel='noreferrer'>Unsplash.com</a></p>
        <div className='social-media'>
          <a href='https://www.linkedin.com/in/arjunvc' target='_blank' rel='noreferrer'><i className="fab fa-linkedin"></i></a>
          <a href='https://github.com/ArjunGTX' target='_blank' rel='noreferrer'><i className="fab fa-github"></i></a>
          <a href='https://www.twitter.com/im_arjunvc' target='_blank' rel='noreferrer'><i className="fab fa-twitter"></i></a>
        </div>
      </footer>
    </div>
  );
}

export default App;
