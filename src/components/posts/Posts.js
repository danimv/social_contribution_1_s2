import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PostForm from './PostForm';
import CircularMenu from '../dashboard/CircularMenu';
import PostFeed from './PostFeed';

import Spinner from '../common/Spinner';

import { getPosts } from '../../actions/postActions';

import POST_LOADING from '../../actions/types';

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    const { posts, loading } = this.props.post;
    let postContent;

    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <PostFeed posts={posts} />;
    }
    return (
      <div>
        <CircularMenu />
        <div className="feed no-gutters">
          <div className="container no-gutters">
            <div className="row no-gutters">
              <div className="col-md-12 no-gutters">
                <div
                  className="row row-cols-md-2 g-3"
                  style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row' }}>
                  {postContent}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  post: state.post,
});
export default connect(mapStateToProps, { getPosts })(Posts);
