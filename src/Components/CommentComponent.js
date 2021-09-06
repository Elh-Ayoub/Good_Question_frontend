import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Comments(props){
  const [comments, setComments] = useState(null)
  const LikeUrl = `http://127.0.0.1:8000/api/posts/${props.PostId}/comments`;


}

export default Comments