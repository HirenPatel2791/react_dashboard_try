import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const MessageType = new ObjectType({
  name: 'Message',
  description: 'A message',
  fields: {
    id: {
      type: new NonNull(ID),
      description: 'The id of the message.',
    },
    title: {
      type: StringType,
      description: 'The title of the message.',
    },
    content: {
      type: StringType,
      description: 'The content of the message.',
    },
    updatedAt: {
      type: StringType,
      description: 'The date message was updated',
    },
  },
});

export default MessageType;
