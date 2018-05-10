import React from 'react';
import { Switch, Route, withRouter } from 'react-router';

import MessageList from './list/MessageList';
import MessageNew from './new/MessageNew';

class Posts extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/app/messages/new" exact component={MessageNew} />
        <Route path="/app/messages" exact component={MessageList} />
      </Switch>
    );
  }
}

export default withRouter(Posts);

