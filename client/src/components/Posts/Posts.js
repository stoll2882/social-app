import React, { useEffect, useState, Fragment } from 'react';
import PostService from '../../services/PostService';
import UserService from '../../services/UserService';
import Post from './Post';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [postsLoaded, setPostsLoaded] = useState(false);
  const [postText, setPostText] = useState("");
  const [renderTrigger, setRenderTrigger] = useState(false);

  const handleSubmit = async e => {
    await PostService.post(postText);
  }  

  const forceRender = () => {
    setRenderTrigger(!renderTrigger);
  }

  useEffect(() => {
    async function loadPosts() {
      var posts = await PostService.getAllPosts();
      setPosts(posts);
      setPostsLoaded(true);
    }
    loadPosts();
  }, [renderTrigger]);

  if(!postsLoaded) {
    return (<h2>Posts Loading...</h2>);
  }

  const currentUser = UserService.getUserInfo()?.id;

  return(
    <Fragment>
      <h2>Posts!</h2>
      <table>
        <thead>
          <tr>
            <td>Alias</td>
            <td>Edited</td>
            <td>Text</td>
            <td>Controls</td>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index, )=> {
            return <Post key={post._id} post={post} currentUser={currentUser} forceRender={forceRender}/>
          })}
        </tbody>
      </table>
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
