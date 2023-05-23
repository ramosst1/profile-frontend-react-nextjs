import { loginApiMockHandler } from "../../features/Login/mocks/api/loginApiMockHandler"
import { profilesApiMockHandler } from "@/app/userprofiles/mocks/api/profiles-api-mock-handler";
import { statesGetApiMockHandlers } from "./states/states-get-api-mocks";

export const handler =  [
  ...statesGetApiMockHandlers,
  ...loginApiMockHandler,
  ...profilesApiMockHandler
];