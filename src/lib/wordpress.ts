const API_URL = "https://dev-Teamcobuild.pantheonsite.io/graphql";

async function fetchAPI(query: string, { variables }: { variables?: any } = {}) {
    const headers = { "Content-Type": "application/json" };

    const res = await fetch(API_URL, {
        method: "POST",
        headers,
        body: JSON.stringify({
            query,
            variables,
        }),
        // Revalidate every hour (3600 seconds) or use 0 for real-time (slower)
        next: { revalidate: 3600 },
    });

    const json = await res.json();
    if (json.errors) {
        console.error(json.errors);
        throw new Error("Failed to fetch API");
    }
    return json.data;
}

export async function getAllPosts() {
    const data = await fetchAPI(`
    query GetAllPosts {
      posts(first: 10, where: { orderby: { field: DATE, order: DESC } }) {
        nodes {
          title
          slug
          date
          excerpt
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  `);
    return data?.posts?.nodes;
}

export async function getPostBySlug(slug: string) {
    const data = await fetchAPI(`
    query GetPostBySlug($id: ID!) {
      post(id: $id, idType: SLUG) {
        title
        content
        date
        featuredImage {
          node {
            sourceUrl
          }
        }
        author {
          node {
            name
          }
        }
      }
    }
  `, {
        variables: { id: slug },
    });
    return data?.post;
}