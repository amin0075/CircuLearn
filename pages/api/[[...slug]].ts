import type { NextApiRequest, NextApiResponse } from "next";

/*
* this is the handler function that will act as a proxy to the actual API endpoints process.env.NEXT_PUBLIC_API_URL
* all the requests will be proxied to the actual API endpoint
 for more information: https://developers.google.com/privacy-sandbox/cookies/prepare/overview
*/
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug } = req.query;
  const url = `${process.env.API_ENDPOINT}/${slug}`;

  const allHeaders = req.headers as any;
  const allData = req.body || {};
  const method = req.method;

  const body = method === "GET" ? undefined : (JSON.stringify(allData) as any);

  try {
    const response = await fetch(url, {
      method,
      headers: allHeaders,
      body,
    });
    const data = await response.json();
    const headersObject: { [key: string]: string } = {};
    response.headers.forEach((value, key) => {
      headersObject[key] = value;
    });
    res.writeHead(response.status, headersObject).end(JSON.stringify(data));
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ error: (error as any)?.message });
  }
}
