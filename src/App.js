import {useState,useRef,useEffect} from 'react';
import './styles.css';
import Search from './components/Search';
import Card from './components/Card';
function App() {

  //current page
  let pageRef = useRef(1);
  //search query
  const [query,setQuery] = useState('Sunset');
  //received images
  const [images,setImages] = useState([]);
  //error variable for invalid query or empty response
  const [isValid,setValidity] = useState(false);
  //is the current page last page
  const [isLastPage,setIsLastPage] = useState(false);

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

  //backward navigation
  function prevPage() {
    if(pageRef.current > 1) {
      pageRef.current--;
      getImage(query,pageRef.current);
    }
  }

  //forward navigation
  function nextPage() {
    pageRef.current++;
    getImage(query,pageRef.current);
  }

  function getPortfolio(social) {
    if(social.instagram_username) {
      return `https://www.instagram.com/${social.instagram_username}/?hl=en`;
    } else if(social.twitter_username) {
      return `https://www.twitter.com/${social.twitter_username}`
    } else {
      return '#'
    }
  }

  function getImage(query,page) {
    let baseUrl = "https://api.unsplash.com/search/photos/";
    let apiKey = 'w1vEwcdSeuPlrUWE6cXygihcELxXQfEmH8ISI8SAcS4';
    fetch(`${baseUrl}?query=${query}&client_id=${apiKey}&page=${page}&per_page=12`)
      .then(response => response.json())
      .then(data => {
        //condition for empty image list
        if(data.total === 0) {
          setQuery('');
          setValidity(false);
        } else if(page >= data.total_pages + 1) {
          //condition for last page
          setIsLastPage(true);
        } else {
          setValidity(true);
          setIsLastPage(false);
          const items = data.results.map((result) => {
            return ({
              preview: result.urls.small,
              large: result.urls.full,
              medium: result.urls.regular,
              small: result.urls.small,
              id: result.urls.full.slice(28,60),
              avatar: result.user.profile_image.medium,
              userName: result.user.name,
              portfolio: getPortfolio(result.user.social) 
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
    <div className={isValid ?"App gradient" : 'App'} >
      {
        (isValid && pageRef.current > 1) && <button onClick={prevPage} className='prev-btn'><i className="fas fa-chevron-left"></i></button>
      }
      <div className='card-container'>
       {
         isValid?images.map((image) => {
          return (
            <Card image={image.preview} large={image.large} medium={image.medium} small={image.small} key={image.id} avatar={image.avatar} userName={image.userName} portfolio={image.portfolio}/>
          )
        }): <img src="images/404.svg" alt="" className='err-image' />
       }
      </div>
      {
        (isValid && !isLastPage) && <button onClick={nextPage} className='next-btn'><i className="fas fa-chevron-right"></i></button>
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
