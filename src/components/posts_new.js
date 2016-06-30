import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from "react-router"
import { createPost } from '../actions/index';

class PostsNew extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(props) {
    this.props.createPost(props)
      .then(() => {
        // blog post has been created, navigate the user to the index
        // We navigate by calling this.context.router.push with the
        // new path to navigate to.
        this.context.router.push('/');
      });
  }

  render() {
    const { fields: { title, categories, content }, handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h1><strong>你要說什麼？</strong></h1>
        <p><strong>再次提醒，不准亂來，不然長谷部會把你解決掉★</strong></p>
        <div className="form-group new_context">
          <label><strong>標題</strong></label>
          <input type="text" className="form-control" {...title}/>
          <div className="text-help">
            {title.touched ? title.error : ''}
          </div>
        </div>
        <div className="form-group new_context">
          <label><strong>名字</strong></label>
          <input type="text" className="form-control" {...categories}/>
            <div className="text-help">
              {categories.touched ? categories.error : ''}
            </div>
        </div>
        <div className="form-group new_context">
          <label><strong>內容</strong></label>
          <textarea className="form-control" {...content}/>
            <div className="text-help">
              {content.touched ? content.error : ''}
            </div>
        </div>
        <button type="submit" className="btn btn-primary">送出</button>
        <Link to="/" className="btn btn-danger">取消</Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = '要打標題阿';
  }
  if (!values.categories) {
    errors.categories = '要說是誰阿';
  }
  if(!values.content) {
    errors.content = '要打內容阿';
  }

  return errors;
}

export default reduxForm({
  form: 'PostsNewForm',
  fields: ['title', 'categories', 'content'],
  validate
}, null, { createPost })(PostsNew);
