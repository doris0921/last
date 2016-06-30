import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions/index';
import { Link } from 'react-router';

class PostsShow extends Component {
  componentWillMount() {
    this.props.fetchPost(this.props.params.id);
  }

  static contextTypes = {
    router: PropTypes.object
  };

  onDeleteClick() {
    this.props.deletePost(this.props.params.id)
      .then(() => { this.context.router.push('/'); });
  }

  render() {
    const { post } = this.props;
    // const post = this.props.post;

    if (!post) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Link to="/" className="btn btn-primary pull-xs-right">回公告版</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}>
          刪掉公告
        </button>
        <p><strong>亂來的話趕快按下右邊的刪掉公告，長谷部會原諒你的☆</strong></p>
        <div className="list-group-item list-group-item-success context">
        <h3><strong>{post.title}</strong></h3>
        <h4>刀名: {post.categories}</h4>
        <p>{post.content}</p>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { post: state.posts.post };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
