import { NextResponse } from 'next/server';
import { IProfileResponse, IProfilesResponse } from '../../../interfaces/profiles/profile-responses';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL_SERVICES_PROFILES

// NOTE: This is a temporary workaround to work well with Mock Server Worker 
export async function GET(request, params) {
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
