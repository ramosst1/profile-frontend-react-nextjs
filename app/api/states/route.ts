import { NextResponse } from 'next/server';
import { IStatesResponse } from '../../interfaces/states/states-responses';


const BASE_URL = process.env.NEXT_PUBLIC_API_URL_SERVICES_STATES

export async function GET() {
  const res = await fetch(BASE_URL, {
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.NEXT_PUBLIC_DATA_API_KEY
    },
  });

  const data = await res.json() as IStatesResponse;
 
  return NextResponse.json(data );

}