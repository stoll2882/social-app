import React, { useEffect, useState, Fragment } from 'react';
import PostService from '../../services/PostService';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [postsLoaded, setPostsLoaded] = useState(false);
  const [postText, setPostText] = useState("");

  const handleSubmit = async e => {
    await PostService.post(postText);
  }  

  useEffect(() => {
    async function loadPosts() {
      var posts = await PostService.getAllPosts();
      setPosts(posts);
      setPostsLoaded(true);
    }
    loadPosts();
  }, []);

  if(!postsLoaded) {
    return (<h2>Posts Loading...</h2>);
  }

  return(
    <Fragment>
      <h2>Posts!</h2>
      <ul>
        {posts.map((post, index)=> {
          return <li key={post._id}>{post.text}</li>;
        })}
      </ul>
      <h2>New Post</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Post</p>
          <input type="text" onChange={e => setPostText(e.target.value)}/>
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </Fragment>
  );
}
