export async function onRequestPost(context) {
  // grab from data
  const formdata = context.request.formData();
  const username = formdata.get("user-name-1");
  const email = formdata.get("email-2");
  return new Response(`${username} - ${email}`);
}
