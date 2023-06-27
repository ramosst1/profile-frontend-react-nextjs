'use server'
import { NextResponse } from 'next/server';
import { IProfileResponse, IProfilesResponse } from '../../interfaces/profiles/profile-responses';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL_SERVICES_PROFILES

// NOTE: This is a temporary workaround to work well with Mock Server Worker 
export async function GET(request, params) {

  console.log(request)
  console.log(params)

  const res = await fetch(BASE_URL, {
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.DATA_API_KEY,
      'CACHE': 'no-store'
    },
  });

  const data = await res.json() as IProfilesResponse;
 
  return NextResponse.json(data);
}

export async function POST(request, params) {

  const bodyData = await request.json();

  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.DATA_API_KEY,
      'CACHE': 'no-store'
    },
    body: JSON.stringify(bodyData)

  });

  const data = await res.json() as IProfileResponse;

  console.log(request)
  console.log(params)


  return NextResponse.json(data);

}

export async function PUT(request, params) {

  const bodyData = await request.json();

  const res = await fetch(BASE_URL, {
   method: "PUT",
      headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.DATA_API_KEY,
      'CACHE': 'no-store'
    },
    body: JSON.stringify(bodyData)
  });

  const data = await res.json() as IProfileResponse;

  console.log(request)
  console.log(params)
 
  return NextResponse.json(data);

}
