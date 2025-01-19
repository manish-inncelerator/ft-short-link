export async function onRequestPost(context) {
  try {
    // Grab data from the form or request body
    const formdata = await context.request.json();
    const longUrl = formdata.longUrl;
    const customAlias = formdata.customAlias;
    const shortLink = formdata.shortLink;
    const ipAddress = formdata.ipAddress;
    const location = formdata.location;

    // Log the values to ensure they are being retrieved correctly
    console.log("Long URL:", longUrl);
    console.log("Custom Alias:", customAlias);
    console.log("Short Link:", shortLink);
    console.log("IP Address:", ipAddress);
    console.log("Location:", location);

    // Check if all required data is present
    if (!longUrl || !shortLink) {
      return new Response("Missing long URL or short link.", { status: 400 });
    }

    // Store data in KV store using the short link as the key
    await context.env.LINK.put(
      shortLink,
      JSON.stringify({
        longUrl,
        customAlias,
        ipAddress,
        location,
      })
    );

    // Return success message
    return new Response(
      `Link details for ${shortLink} have been stored successfully!`
    );
  } catch (err) {
    // Handle errors and log them
    console.error("Error storing data:", err);
    return new Response(`Error storing data: ${err.message}`, { status: 500 });
  }
}
