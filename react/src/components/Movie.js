import React, {useState} from 'react';
import { Col, Card, CardImg, CardTitle, CardBody, Badge, ButtonGroup, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faStar, faVideo } from '@fortawesome/free-solid-svg-icons';

function Movie(props) {

  let [watch, setWatch] = useState(false);
  let [watchCount, setWatchCount] = useState(0);
  let [myRating, setMyRating] = useState(0);

  // Like/Unlike
  let likeColor;
  if (props.movieSeen) {
    likeColor = {color: '#e74c3c'};
  }
  
  const handleLiked = () => {
    if (props.movieSeen) {
      props.deleteLiked(props.movieName);
    } else {
      props.handleLiked(props.movieName, props.movieImg);
  }};

  // Watch
  const onClickWatch = () => {
    setWatch(true);
    setWatchCount(watchCount + 1);
  };
  let watchColor;
  if (watch) {
    watchColor = {color: '#5ad136'};
  };

  // My rating
  const onClickMore = () => {
    if (myRating < 10) {
      setMyRating(myRating + 1)
    }
  };
  const onClickLess = () => {
    if (myRating > 0) {
      setMyRating(myRating - 1)
    }
  };
  
  let review= [];
  for (let i = 0; i < 10; i++) {
    let color;
    if (i < myRating) {
      color = {color: '#FFC108'}
    }
    review.push(<FontAwesomeIcon key={i} onClick={() => setMyRating(i + 1)} style={color} icon={faStar} />)
  };

  // Average
  const hasVoted = myRating > 0 ? 1 : 0;
  const finalNote = Math.round(((props.globalRating * props.globalCountRating) + myRating) / (props.globalCountRating + hasVoted));  
  let note = [];
  for (let i = 0; i < 10; i++) {
    let color = {};
    if (i < finalNote) {
      color = {color: '#FFC108'}
    };
      note.push(<FontAwesomeIcon key={i} style={color} icon={faStar} />)
    };

  return (
    <Col style={marginCards} xs='12' lg='6' xl='4'>
      <Card>
        <CardImg top width="100%" src={props.movieImg} alt="Card image cap" />
        <CardBody>
            <p>Like 
              <FontAwesomeIcon onClick={handleLiked} style={{...likeColor,...pointer,...marginViews}} icon={faHeart} />
            </p>

            <CardTitle tag="h5">{props.movieName}</CardTitle>
            <p>{props.movieDesc}</p>

            <p style={align}>Views 
              <FontAwesomeIcon onClick={onClickWatch} style={{...watchColor,...pointer,...marginViews}} icon={faVideo} />
                <Badge color="warning" style={marginViews}>{watchCount}</Badge>
            </p>

            <p>My rating {review} 
              <ButtonGroup style={marginViews}>
                <Button onClick={onClickMore} color="warning">+</Button>
                <Button onClick={onClickLess}>-</Button>
              </ButtonGroup>
            </p>

            <p>Average {note} ({myRating > 0 ? props.globalCountRating + 1 : props.globalCountRating})</p>
        </CardBody>
      </Card>
    </Col>
  );
}

// Style

const marginCards = {
  marginBottom: '20px'
};

const marginViews = {
  marginLeft: '7px'
}

const pointer = {
  cursor: 'pointer'
}

const align = {
  display: 'flex',
  alignItems: 'center',
}

export default Movie;