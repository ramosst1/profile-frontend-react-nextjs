import { NextResponse } from 'next/server';
import { IProfilesResponse } from '../../interfaces/profiles/profile-responses';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL_SERVICES_PROFILE

export async function GET() {
  const res = await fetch(BASE_URL, {
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.NEXT_PUBLIC_DATA_API_KEY,
      'CACHE': 'no-store'
    },
  });

  const data = await res.json() as IProfilesResponse;
 
  return NextResponse.json(data);

}