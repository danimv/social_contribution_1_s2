import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import PostFeed from '../posts/PostFeed';
import { getPosts } from '../../actions/postActions';
import Spinner from '../common/Spinner';

class Landing extends Component {
  componentDidMount() {
    this.props.getPosts();
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { posts, loading } = this.props.post;
    let postContent;

    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <PostFeed posts={posts} />;
    }
    return (
      <div className="landing">
        <div className="">
          <div className="container">
            <div className="row mb-5">
              <div className="col-md-12 text-center mt-3">
                <h1 className="display-3 mb-4" style={{ color: '#17A2B8' }}>
                  Global Regeneration ∞
                </h1>
                <hr />
                {!isAuthenticated && (
                  <div>
                    <Link to="/register" className="btn btn-lg btn-info me-2">
                      Registra't
                    </Link>
                    <Link to="/login" className="btn btn-lg btn-light ms-2">
                      Entra
                    </Link>
                  </div>
                )}
              </div>
            </div>
            <div className="row row-cols-md-4 g-3">{postContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Landing);
