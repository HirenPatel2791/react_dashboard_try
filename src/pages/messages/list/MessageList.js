import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import s from './MessageList.scss';
import withMeta from '../../../core/withMeta';
import Widget from '../../../components/Widget';
import {fetchMessages} from '../../../actions/messages';

class PostList extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    messages: PropTypes.array, // eslint-disable-line
    isFetching: PropTypes.bool,
  };

  static defaultProps = {
    isFetching: false,
    messages: [],
  };

  static meta = {
    title: 'Messages list',
    description: 'About description',
  };

  componentWillMount() {
    this.props.dispatch(fetchMessages());
  }

  render() {
    return (
      <div className={s.root}>
        <ol className="breadcrumb">
          <li>
            <span className="text-muted">YOU ARE HERE</span>
          </li>
          <li className="active">Messages</li>
        </ol>
        <h1>Messages</h1>
        <Widget
          title={
            <div>
              <div className="pull-right mt-n-xs">
                <Link to="/app/messages/new" className="btn btn-sm btn-inverse">
                  Create new
                </Link>
              </div>
              <h5 className="mt-0 mb-0">
                Messages <span className="fw-semi-bold">List</span>
              </h5>
            </div>
          }
        >
          <table className="table table-striped">
            <thead>
            <tr>
              <th>Title</th>
              <th>Content</th>
              <th>Last Updated</th>
            </tr>
            </thead>
            <tbody>
            {this.props.messages &&
            this.props.messages.map(message => (
              <tr key={message.id}>
                <td>{message.title}</td>
                <td>{message.content.slice(0, 80)}...</td>
                <td>{new Date(message.updatedAt).toLocaleString()}</td>
              </tr>
            ))}
            {this.props.messages &&
            !this.props.messages.length && (
              <tr>
                <td colSpan="100">No messages yet</td>
              </tr>
            )}
            {this.props.isFetching && (
              <tr>
                <td colSpan="100">Loading...</td>
              </tr>
            )}
            </tbody>
          </table>
        </Widget>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.messages.isFetching,
    messages: state.messages.messages,
  };
}

export default connect(mapStateToProps)(withStyles(s)(withMeta(PostList)));
