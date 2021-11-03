import {useState,useRef,useEffect} from 'react';
import './styles.css';
import Search from './components/Search';
import Card from './components/Card';
function App() {

  let pageRef = useRef(1);
  const [query,setQuery] = useState('Sunset');
  const [images,setImages] = useState([]);

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
        } else {
          const items = data.results.map((result) => {
            return ({
              preview: result.urls.small,
              large: result.urls.full,
              medium: result.urls.regular,
              small: result.urls.small
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
    <div className="App">
      <button onClick={prevPage} className='prev-btn'><i className="fas fa-chevron-left"></i></button>
      <div className='card-container'>
       {
         query?images.map((image,index) => {
          return (
            <Card image={image.preview} large={image.large} medium={image.medium} small={image.small} key={index} />
          )
        }): <img src="images/404.jpg" alt="" className='err-image' />
       }
      </div>
      <button onClick={nextPage} className='next-btn'><i className="fas fa-chevron-right"></i></button>
      </div>
      <footer>
        <h3>Made with 💖 by <a href='https://arjundev.netlify.app'><strong>Arjun</strong></a></h3>
        <div className='social-media'>
          <a href='https://www.linkedin.com/in/arjunvc'><i className="fab fa-linkedin"></i></a>
          <a href='https://github.com/ArjunGTX'><i className="fab fa-github"></i></a>
          <a href='https://www.twitter.com/im_arjunvc'><i className="fab fa-twitter"></i></a>
        </div>
      </footer>
    </div>
  );
}

export default App;
