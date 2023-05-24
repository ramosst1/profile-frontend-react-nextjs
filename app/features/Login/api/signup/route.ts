import { NextResponse } from 'next/server';
import { ISignInResponse } from '../../interfaces/signin/signin-responses';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL_SERVICES_LOGIN_SIGNUP

export async function GET() {
    // const res = await fetch(BASE_URL, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'API-Key': process.env.NEXT_PUBLIC_DATA_API_KEY,
    //     'CACHE': 'no-store'
    //   },
    // });
  
    // const data = await res.json() as ISignInResponse;
   
    // return NextResponse.json(data);
    return NextResponse.json({data: 'signup'});
  
  }
  