export async function fetchEvent(link, token) {
  const response = await fetch(link, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}
