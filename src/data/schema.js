import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
} from 'graphql';

import me from './queries/me';
import news from './queries/news';
import posts from './queries/posts';
import addPost from './mutations/posts';
import messages from './queries/messages';
import addMessage from './mutations/messages';

const schemaConfig = {
  query: new ObjectType({
    name: 'Query',
    fields: {
      me,
      news,
      posts,
      messages,
    },
  }),
};

// for demo purposes forbid mutations in production environment
if (__DEV__) {
  schemaConfig.mutation = new ObjectType({
    name: 'Mutation',
    fields: {
      addPost,
      addMessage
    },
  });
}

const schema = new Schema(schemaConfig);

export default schema;
