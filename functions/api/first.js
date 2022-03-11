export async function onRequest(context) {
  try {
    // Contents of context object
    const {
      request, // same as existing Worker API
      env, // same as existing Worker API
    } = context;

    const { country, regionCode, region } = request.cf;

    const holidayData = await env.DATA.get(`${country}:${regionCode}`, {
      type: "json",
    });

    return new Response(JSON.stringify(holidayData[1]));
  } catch (e) {
    return new Response(JSON.stringify(e, Object.getOwnPropertyNames(e)));
  }
}
