// GraphQLSchema.js
const { buildSchema } = require("graphql");

exports.schema = buildSchema(`
  type User {
    id: ID!,
    name: String!,
    posts: [Post!]!,
  },
  type Post {
    id: ID!,
    title: String!,
    body: String!,
    author: User!
  },
  type Query {
    users: [User!]!
    posts: [Post!]!
    user(id: ID!): User
  }
`);

const usersById = {
  1: {
    id: 1,
    name: "Choco"
  }
};

const postsById = {
  18: {
    id: 18,
    authorId: 1,
    title: "Live in Dee Why, NSW, AU",
    body: "One of the biggest attractions in north sydney"
  },
  19: {
    id: 19,
    authorId: 2,
    title: "Monitor for sale",
    body: "22 inches monitor for sale"
  }
};

class GraphQLUser {
  constructor({ id, name }) {
    this.id = id;
    this.name = name;
  }
  posts() {
    return Object.keys(postsById)
      .map(id => new GraphQLPost(postsById[id]))
      .filter(post => post.authorId === this.id);
  }
}

class GraphQLPost {
  constructor({ id, authorId, title, body }) {
    this.id = id;
    this.authorId = authorId;
    this.title = title;
    this.body = body;
  }
  author() {
    return new GraphQLUser(usersById[this.authorId]);
  }
}

exports.rootValue = {
  users: () => Object.keys(usersById).map(id => new GraphQLUser(usersById[id])),
  posts: () => Object.keys(postsById).map(id => new GraphQLPost(postsById[id])),
  user: ({ id }) => (usersById[id] ? new GraphQLUser(usersById[id]) : null)
};
