import {
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

import MessageType from '../types/MessageType';
import Message from '../models/Message';

const addMessage = {
  type: MessageType,
  description: 'Add a Message',
  args: {
    title: {
      name: 'Message title',
      type: new NonNull(StringType),
    },
    content: {
      name: 'Message content',
      type: new NonNull(StringType),
    },
  },
  resolve: (root, { title, content }) => Message.create({ title, content }),
};

export default addMessage;
