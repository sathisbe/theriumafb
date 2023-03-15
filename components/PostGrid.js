import { gql, useQuery } from '@apollo/client';

const POSTS_QUERY = gql`
  query {
    posts {
      nodes {
        id
        title
        excerpt
        slug
        date
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
`;

function PostGrid() {
  const { loading, error, data } = useQuery(POSTS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const posts = data.posts.nodes;

  return (
    <div className="post-grid">
      {posts.map((post) => (
        <div key={post.id} className="post-card">
          <a href={`/posts/${post.slug}`}>
            <img src={post.featuredImage.node.sourceUrl} alt={post.title} />
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
          </a>
        </div>
      ))}
    </div>
  );
}

export default PostGrid;
