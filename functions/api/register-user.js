export async function onRequestPost(context) {
  // grab from data
  const formdata = await context.request.formData();
  const username = formdata.get("user-name-1");
  const email = formdata.get("email-2");

  context.env.USER_DATA_STORE.put(username, email);

  return new Response(`${username} - ${email}`);
}
