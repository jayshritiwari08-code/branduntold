const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
const slug = 'find-brand-unique-voice';
const url = `${apiUrl}/api/data/articles?slug=${encodeURIComponent(slug)}`;

console.log("Fetching from URL:", url);

async function test() {
  try {
    const res = await fetch(url);
    const json = await res.json();
    console.log("Status:", res.status);
    console.log("JSON success:", json.success);
    if (json.success && json.data && json.data.length > 0) {
      const art = json.data[0];
      console.log("Fetched Article Title:", art.title);
      console.log("Fetched Metatitle:", art.metatitle);
      console.log("Fetched MetaDescription:", art.meta_description);
    } else {
      console.log("No data returned or success was false.", json);
    }
  } catch (e) {
    console.error("Fetch failed:", e);
  }
}

test();
