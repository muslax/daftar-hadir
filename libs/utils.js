export function generatePOSTData(data) {
  return {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(data)
  }
}

export function getDate(yyyymmdd) {
  const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  const arr = yyyymmdd.split("-");
  const year = arr[0];
  const month = months[parseInt(arr[1]) -1];
  const date = parseInt(arr[2]);
  return `${date} ${month} ${year}`;
}