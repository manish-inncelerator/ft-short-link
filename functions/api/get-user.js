export async function onRequestGet(context) {
  try {
    // Fetch all keys from the KV store
    const list = await context.env.USER_DATA_STORE.list();

    // Retrieve all key-value pairs
    const users = [];
    for (const key of list.keys) {
      const email = await context.env.USER_DATA_STORE.get(key.name);
      users.push({ username: key.name, email });
    }

    // Return the data as JSON
    return new Response(JSON.stringify(users), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error fetching data:", err);
    return new Response(`Error fetching data: ${err.message}`, { status: 500 });
  }
}
