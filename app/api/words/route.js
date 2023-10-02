import { NextResponse } from 'next/server';
import JishoAPI from 'unofficial-jisho-api';

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  let key = searchParams.get('key')
  key = key ? key.toLowerCase() : key;

  const jisho = new JishoAPI();

  try {
    const result = await jisho.searchForPhrase(key);
    return NextResponse.json({ data: result.data });
  } catch (error) {
    console.error('Error fetching data from Jisho:', error);
    return NextResponse.error({ status: 500, reason: 'Internal Server Error' });
  }
}
