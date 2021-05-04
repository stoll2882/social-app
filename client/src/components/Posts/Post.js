import React, { Fragment } from 'react';
import PostService from '../../services/PostService';

export default function Post({post, currentUser, forceRender}) {

  const handleDelete = async e => {
    await PostService.delete(post._id);
    forceRender();
  }  

  const renderControls = () => {
    if(post.user === currentUser) {
        return (<button onClick={handleDelete}>Delete</button>);
    } else {
        return (<Fragment/>);
    }
  }

  return(
    <Fragment>
        <tr key={post._id}>
            <td>{post.alias}</td>
            <td>{post.edited}</td>
            <td>{post.text}</td>
            <td>{renderControls()}</td>
        </tr>
    </Fragment>
  );
}
