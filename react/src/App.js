import {useState, useEffect} from 'react';
import './App.css';
import Movie from './components/Movie'
import { Container, Row, Nav, NavItem, NavLink, Button, UncontrolledPopover, PopoverHeader, PopoverBody, ListGroupItem, ListGroup } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';


function App() {
  const [likedMovies, setLikedMovies] = useState(0);
  const [likedTitles, setLikedTitles] = useState([]);
  const [showList, setShowList] = useState([]);

  useEffect(() => {
    const loadShows = async () => {

      const data = await fetch('/new-series');
      const response = await data.json();
      setShowList(response.result);
      
      const wishRaw = await fetch('/wishlist-show');
      const wishesJSON = await wishRaw.json();
      console.log(wishesJSON);
      
      let wishListDB = wishesJSON.wishlist.map((show, i) => {
        return {name: show.showName, img: show.showImg}
      });
      setLikedTitles(wishListDB);
      setLikedMovies(wishListDB.length);
    }
    loadShows();
  }, []);


  // Popover 
  const handleLikedMovies = async (name, img) => {
    setLikedMovies(likedMovies + 1);
    setLikedTitles([...likedTitles, {name: name, img: img}]);

    await fetch(`/wishlist-show`, {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `title=${name}&img=${img}`,
    })
  };

  const deleteLikedMovies = async (name) => {
    setLikedMovies(likedMovies - 1);
    setLikedTitles(likedTitles.filter(element => element.name !== name));

    await fetch(`/wishlist-show/${name}`, {
    method: 'DELETE',
    headers: {'Content-Type':'application/x-www-form-urlencoded'},
    body: `name=${name}`,
    })
  };

  const popover = likedTitles.map((movie, i) => {
    return <ListGroupItem key={i} onClick={() => deleteLikedMovies(movie.name)}>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <img style={{width: '40%'}} src={movie.img} alt='poster'/>
        <p style={{marginLeft: '10px'}}>{movie.name}</p>
      </div>
    </ListGroupItem>
  });


  // Movie cards
  const showRender = showList.map((movie, i) => {
    const result = likedTitles.find(element => element.name === movie.name);
    let isSeen = false;
    if (result !== undefined) {
      isSeen = true;
    };
    let urlImg = '/generique.jpg';
    if (movie.backdrop_path !== null) {
      urlImg = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
    };
    return <Movie key={i} movieName={movie.name} movieDesc={movie.overview} movieImg={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} globalRating={movie.vote_average} globalCountRating={movie.vote_count} handleLiked={handleLikedMovies} deleteLiked={deleteLikedMovies} movieSeen={isSeen} />
  });

  return (
    <div style={{backgroundColor: '#2e3436'}}>
      <Container>
        <Row style={marginNav}>
          <Nav style={nav}>
            <NavItem>
              <img src='./logo.png' alt="logo" />
            </NavItem>

            <NavItem>
              <NavLink href="#" className="text-white">Last Releases</NavLink>
            </NavItem>

            <NavItem>
              <NavLink href="#"><Button id="PopoverFocus" color="warning">{likedMovies} {likedMovies > 1 ? 'Shows Liked' : 'Show Liked'}</Button></NavLink>
              <div>
                <UncontrolledPopover trigger="focus" placement="bottom" target="PopoverFocus">
                  <PopoverHeader>Shows Liked <FontAwesomeIcon style={{color: '#e74c3c'}} icon={faHeart}></FontAwesomeIcon></PopoverHeader>
                  <PopoverBody>
                    <ListGroup>
                      {popover}
                    </ListGroup>
                  </PopoverBody>
                </UncontrolledPopover>
              </div>
            </NavItem>
          </Nav>
        </Row>
        <Row >
          {showRender}
        </Row>
      </Container>
    </div>
  );
}

// Style

const marginNav = {
  marginTop: '25px',
  marginBottom: '50px',
};

const nav = {
  display: 'flex',
  alignItems: 'center',
  marginLeft: '15px'
};

export default App;
