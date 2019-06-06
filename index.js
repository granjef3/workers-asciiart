const jpeg = require("jpeg-js");
const asciiPixels = require("ascii-pixels");

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  try {
    const userAgent = request.headers.get("user-agent") || "";
    const imgRequest = new Request("https://i.imgur.com/wKRoWhj.jpg");
    if (
      userAgent.match(/(curl|libcurl|HTTPie)\//i) // only curl or similar
    ) {

      let response = await fetch(imgRequest);
 
      let buffer = await response.arrayBuffer();

      let imageData = jpeg.decode(buffer);

      let ascii = asciiPixels(imageData);

      return new Response(ascii, { status: 200 });
    } else {
      return fetch(imgRequest);
    }
  } catch (err) {
    return new Response("something broke :(" + JSON.stringify(err), { status: 500 });
  }
}
