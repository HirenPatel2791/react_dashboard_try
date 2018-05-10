import { GraphQLList as List } from 'graphql';
import { resolver } from 'graphql-sequelize';

import MessageType from '../types/MessageType';
import Message from '../models/Message';

const messages = {
  type: new List(MessageType),
  resolve: resolver(Message),
};

export default messages;
