import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deletePost, addLike, removeLike } from '../../actions/postActions';
import profileReducer from '../../reducers/profileReducer';

class PostItem extends Component {
  onDeleteClick(id) {
    console.log(id);
    this.props.deletePost(id);
  }
  onLikeClick(id) {
    console.log(id);
    this.props.addLike(id);
  }
  onUnlikeClick(id) {
    console.log(id);
    this.props.removeLike(id);
  }
  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter((like) => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { post, auth, showActions } = this.props;
    const serverUrl = 'https://s1-w5x5.onrender.com'; // 'http://192.168.1.23:5000'; //'https://s1-w5x5.onrender.com';//
    const imagePath = `/public/uploads/${post.imgUrl}`;
    const imageUrl = `${serverUrl}${imagePath}`;
    // console.log('postttt', imageUrl);
    return (
      <Link to={`/post/${post._id}`} style={{ opacity: 1, textDecoration: 'none' }}>
        <div className="col">
          <div className="card card-body p-2" style={{ opacity: 1 }}>
            <img className="card-img-top" src={imageUrl} />
            <div className="col-md-12">
              <p
                className="text-center"
                id="userPost"
                style={{
                  fontWeight: 'bold',
                  color: 'white',
                  // backgroundColor: '#2F2FA2',
                }}>
                {post.name}
              </p>
            </div>
            <div className="col-md-12 text-center">
              <p className="lead" style={{ color: 'black' }}>
                {post.text}
              </p>
              {showActions ? (
                <span>
                  {' '}
                  <button onClick={this.onLikeClick.bind(this, post._id)} type="button" className="btn btn-light mr-1">
                    <i
                      className={classnames('fas fa-thumbs-up', {
                        'text-info': this.findUserLike(post.likes),
                      })}
                    />
                    <span
                      style={{ color: post.likes.length == 0 ? 'white' : 'var(--color_1)' }}
                      className="badge badge-light">
                      {post.likes.length}
                    </span>
                  </button>
                  <button
                    onClick={this.onUnlikeClick.bind(this, post._id)}
                    type="button"
                    className="btn btn-light mr-1">
                    <i className="fas fa-thumbs-down" />
                  </button>
                  <div style={{ paddingLeft: 15 }} />
                  <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                    Comentaris
                  </Link>
                  {post.user === auth.user.id ? (
                    <button
                      onClick={this.onDeleteClick.bind(this, post._id)}
                      type="button"
                      className="btn btn-danger mr-1">
                      <i className="fas fa-times" />
                    </button>
                  ) : null}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(PostItem);
