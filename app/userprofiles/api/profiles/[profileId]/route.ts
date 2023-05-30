import { NextResponse } from 'next/server';
import { IProfileResponse } from '@/app/userprofiles/interfaces/profiles/profile-responses';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL_SERVICES_PROFILES

export async function GET(request, {params}) {

  const {profileId} = params;

  const res = await fetch(BASE_URL+profileId, {
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.DATA_API_KEY,
      'CACHE': 'no-store'
    },
  });

  const data = await res.json() as IProfileResponse;
 
  return NextResponse.json(data);
}

export async function DELETE(request, {params}) {

  const {profileId} = params;

  const res = await fetch(BASE_URL+profileId, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.DATA_API_KEY
    },
  });

  const data = await res.json() as IProfileResponse;
 
  return NextResponse.json(data);
}