export async function onRequestPost(context) {
  try {
    // Grab data from the form
    const formdata = await context.request.formData();
    const username = formdata.get("user-name-1");
    const email = formdata.get("email-2");

    // Log the values to ensure they are being retrieved correctly
    console.log("Username:", username);
    console.log("Email:", email);

    // Check if username and email are valid
    if (!username || !email) {
      return new Response("Missing username or email.", { status: 400 });
    }

    // Store data in KV
    await context.env.USER_DATA_STORE.put(username, email);

    // Return success message
    return new Response(`${username} - ${email} has been stored successfully!`);
  } catch (err) {
    // Handle errors and log them
    console.error("Error storing data:", err);
    return new Response(`Error storing data: ${err.message}`, { status: 500 });
  }
}
