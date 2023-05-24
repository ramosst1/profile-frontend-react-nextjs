import { rest } from 'msw'
import { IProfileResponse, IProfilesResponse } from '../../interfaces/profiles/profile-responses';
import profilesList from './profile-list';
import { IMessageModel } from '../../interfaces/profiles/error-message-model';

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL_SERVICES_PROFILE;
const BASE_URL = '/userprofiles/api/profiles/';

export const profilesDeleteHandlers = [  


  //#region  delete  a profile 
  rest.delete(BASE_URL + ':profileId', async (req, res, ctx) => {
 
    const {profileId }  = req.params;

    const aProfile = profilesList.getProfileById(profileId.toString())

    const response: IProfileResponse = {
      success: false,
      messages: [],
      profile: undefined
    }

    if(aProfile){

      response.success = true;

      return res(ctx.json(response))

    }

    const messages: IMessageModel[] = [{
      internalMessage: 'The use is not found.',
      externalMessage: 'The user is not found.',
      statusCode: '999'
    }];

    response.messages = messages;


  }),
  //#endregion

]
