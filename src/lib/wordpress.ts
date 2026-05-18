const API_URL = "https://dev-teamcobuild.pantheonsite.io/graphql";

// Helper: Sanitize GraphQL string to prevent injection
function sanitizeGraphQLString(input: string): string {
  return input.replace(/[\\"\n\r]/g, (char) => {
    const escapeMap: Record<string, string> = {
      '\\': '\\\\',
      '"': '\\"',
      '\n': '\\n',
      '\r': '\\r',
    };
    return escapeMap[char] || char;
  });
}

// Helper: Validate slug format (alphanumeric, hyphens, underscores only)
function isValidSlug(slug: string): boolean {
  return /^[a-zA-Z0-9_-]+$/.test(slug) && slug.length > 0 && slug.length <= 255;
}

async function fetchAPI(query: string, { variables }: { variables?: any } = {}) {
    const headers = { "Content-Type": "application/json" };

    const res = await fetch(API_URL, {
        method: "POST",
        headers,
        body: JSON.stringify({
            query,
            variables,
        }),
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
    if (!isValidSlug(slug)) {
      throw new Error("Invalid slug format");
    }

    const sanitizedSlug = sanitizeGraphQLString(slug);
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
        variables: { id: sanitizedSlug },
    });
    return data?.post;
}