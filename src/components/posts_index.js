import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/index';
import { Link } from 'react-router';

class PostsIndex extends Component {
  componentWillMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    return this.props.posts.map((post) => {
      return (
        <li className="list-group-item list-group-item-success" key={post.id}>
          <div>
            <Link to={"posts/" + post.id}>
              <span className="pull-xs-right">{post.categories}</span>
              <strong>{post.title}</strong>
            </Link>
          </div>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link to="/posts/new" className="btn btn-primary">
            新增
          </Link>
        </div>
        <h1><strong>本丸公告版</strong></h1>
        <p>長谷部說不能亂來不然你就完蛋了</p>
        <ul className="list-group context">
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts.all };
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
