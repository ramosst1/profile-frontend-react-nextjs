'use client'

import React, {useState, useEffect} from 'react';
import {
  Button, Grid, 
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Box
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CancelIcon from '@mui/icons-material/Cancel';
import ProfilesService from '../services/profiles-service';
import StatesServices from '../../services/states/states-services';
import { IProfileCreateModel, IProfileModel, IProfileAddressCreateModel } from '../interfaces/profiles/profile-models';
import { IStateModel } from '../../interfaces/states/states-model';
import IErrorMessageModel from '../../interfaces/api-error-message'
import { IProfileResponse } from '../interfaces/profiles/profile-responses';
import useServiceApiResponse from '../../hooks/use-service-api-response';
import ProcessingDialog from '../../components/ui/dialogs/processing-dialog';
import ErrorMessagesDisplay from '../../components/ui/error_displays/error-messages-display';

export default function UserProfileDetail(this: any, props: { xs?:any; profile?: IProfileModel; onCreate?: any; onUpdate?: any; onCancel?: any; }) {

  const APropProfile = props.profile;

  const [profileCreateResponse, setProfilesCreateResponse] = useState<Promise<IProfileResponse> | undefined>();
  const { apiResponse:apiProfileCreateResponse, messages:apiProfileCreateMessages, loading: apiProfileCreateLoading} = useServiceApiResponse<IProfileResponse>(profileCreateResponse);

  const [profileUpdateResponse, setProfilesUpdateResponse] = useState<Promise<IProfileResponse> | undefined>();
  const { apiResponse:apiProfileUpdateResponse, messages:apiProfileUpdateMessages, loading:apiProfileUpdateLoading} = useServiceApiResponse<IProfileResponse>(profileUpdateResponse);

  const APropAddressPrimary = APropProfile?.addresses?.find(
    aItem => aItem.isPrimary === true
  );

  const [countryStatesList, setCountryStatesList] = useState<IStateModel[]>([]);
  const [errorMessages, setErrorMessages] = useState<IErrorMessageModel[]>([]);

  const [retrievingData, setRetrievingData] = useState<boolean>(false);

  const [uxInputs, setUxInputs] = useState({
      firstName: APropProfile?.firstName ?? "",
      lastName : APropProfile?.lastName ?? "",
      active: APropProfile?.active ?? false,
      address1: APropAddressPrimary?.address1 ?? "",
      address2: APropAddressPrimary?.address2 ?? "",
      city: APropAddressPrimary?.city ?? "",
      stateAbrev: APropAddressPrimary?.stateAbrev ?? "",
      zipCode: APropAddressPrimary?.zipCode ?? ""
    });

    useEffect(() => {

      if(countryStatesList.length === 0) populateCountryStatesAsync();

    }, [])

    useEffect(() => {
      populateProfileDetail();      
  },[APropProfile?.profileId]); 

  useEffect(() => {

      if (!apiProfileCreateResponse?.success) {
      } else {
        props.onCreate(apiProfileCreateResponse);
      }
    
      apiProfileCreateMessages && setErrorMessages(apiProfileCreateMessages)

  }, [apiProfileCreateResponse])
  
  useEffect(() => {

        if (!apiProfileUpdateResponse?.success) {
        } else {
          props.onUpdate(apiProfileUpdateResponse);          
        }
    
        apiProfileUpdateMessages && setErrorMessages(apiProfileUpdateMessages)

  }, [apiProfileUpdateResponse])

  function handleSubmit(event: { preventDefault: () => void; }){

    event.preventDefault() ;

    if(props.profile){
      handleUpdateProfileAsync();
    } else {
      handleAddProfile();
    }

    return false;
  };

  function handleProfileChangeBool(event: React.ChangeEvent<HTMLInputElement> ){

    const { name, value } = event.target;

    let ValueBool = (value === "true")

    setUxInputs({ ...uxInputs, [name]: ValueBool });
  };

  function handleProfileChange(event: React.ChangeEvent<HTMLInputElement> ){
    const { name, value } = event.target;

    setUxInputs({ ...uxInputs, [name]: value });

  };

  function handleProfileSelectChange (event: any){
    const { name, value } = event.target;

    setUxInputs({ ...uxInputs, [name]: value });
  };

  function handleAddProfile(){
    try {

      let newAddress: IProfileAddressCreateModel = {
        isPrimary: true,
        address1: uxInputs.address1,
        address2: uxInputs.address2,
        city: uxInputs.city,
        stateAbrev: uxInputs.stateAbrev,
        zipCode: uxInputs.zipCode,
        isSecondary: false


      }

      let ProfileNew:IProfileCreateModel = {
        firstName: uxInputs.firstName,
        lastName: uxInputs.lastName,
        active: uxInputs.active,
        addresses: [newAddress]
      }

      setProfilesCreateResponse(ProfilesService.createProfileAsync(ProfileNew));

      

    } catch(e){
      setErrorMessages([{ message: 'An unexpect error occured while attempting to add a profile.', statusCode: '999'  } as IErrorMessageModel]);
    }
  }

  async function handleUpdateProfileAsync(){

    try {


      const { profile } = props;

      const profileResponse = await ProfilesService.getProfileAsync(profile?.profileId?? 0)
      
      const aUpdateProfile = { ...profileResponse.profile };

      let aPropAddressPrimary = aUpdateProfile.addresses.find(
          aItem  => aItem.isPrimary === true
      )

      aUpdateProfile.firstName = uxInputs.firstName;
      aUpdateProfile.lastName = uxInputs.lastName;
      aUpdateProfile.active = uxInputs.active;

      if(aPropAddressPrimary !== undefined) {
        aPropAddressPrimary.address1 = uxInputs.address1;
        aPropAddressPrimary.address2 = uxInputs.address2;
        aPropAddressPrimary.city = uxInputs.city;
        aPropAddressPrimary.stateAbrev = uxInputs.stateAbrev;
        aPropAddressPrimary.zipCode = uxInputs.zipCode;
      }

      setProfilesUpdateResponse(ProfilesService.updateProfileAsync(aUpdateProfile));

    } catch(e){
      setErrorMessages([{ message: 'An unexpect error occured while attempting to update the profile.', statusCode: '999'  } as IErrorMessageModel]);
    }
  };

  function populateProfileDetail(){
    const AProfile = props.profile;

    let AddressPrimary = AProfile?.addresses?.find(
      aItem => aItem.isPrimary === true
    );

    setUxInputs({
      firstName: AProfile?.firstName ?? "",
      lastName: AProfile?.lastName ?? "",
      active: AProfile?.active ?? false,
      address1: AddressPrimary?.address1 ?? "",
      address2: AddressPrimary?.address2 ?? "",
      city: AddressPrimary?.city ?? "",
      stateAbrev: AddressPrimary?.stateAbrev ?? "",
      zipCode: AddressPrimary?.zipCode ?? ""
    });
 
  };

  async function populateCountryStatesAsync(){

    if(countryStatesList.length = 0) return;

    try {


      const response = await StatesServices.getStatesAsync();

      setCountryStatesList(response.states);
  
    } catch (e) {
      setErrorMessages([{ message: 'An unexpect error occured.', statusCode: '999'  } as IErrorMessageModel]);
    } 
 
  };

    return (
      <Box
      component="form"
      sx={{
          '& .MuiTextField-root': { m: .5, width: '100%' },
      }}
      autoComplete="off" 
      onSubmit={handleSubmit}
      >
          <Grid container spacing={2} >
            <Grid >
              <ErrorMessagesDisplay errorMessages={errorMessages} />
            </Grid>
            <Grid item xs={12} >
              <ProcessingDialog open={apiProfileUpdateLoading} message='Profile is updating ...' />
              <ProcessingDialog open={apiProfileCreateLoading} message='Profile is being created...' />
              <ProcessingDialog open={retrievingData} message='Retrieving Information...' />
            </Grid>
            <Grid item xs={12} md={6} >
              <TextField
                id="firstName"
                name="firstName"
                value={uxInputs.firstName}
                label="First Name"
                required
                fullWidth
                onChange={handleProfileChange.bind(this)}
                variant='standard'
                sx={{maxWidth:'100%'}}
              />
            </Grid>
            <Grid item xs={12} md={6} >

              <TextField
                id="lastName"
                name="lastName"
                value={uxInputs.lastName}
                label="Last Name"
                required
                fullWidth
                onChange={handleProfileChange.bind(this)}
                variant='standard'
                sx={{maxWidth:'100%'}}
              />
            </Grid>
            <Grid  item xs={12} md={12}>
              <RadioGroup
                aria-label="position"
                id="active"
                name="active"
                value={uxInputs.active}
                row
                onChange={handleProfileChangeBool.bind(this)}
                sx={{maxWidth:'100%'}}
              >
                <FormControlLabel
                  value={true}
                  control={<Radio color="primary" />}
                  label="Active"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value={false}
                  control={<Radio color="primary" />}
                  label="InActive"
                  labelPlacement="end"
                  sx={{maxWidth:'100%'}}
                  />
              </RadioGroup>
            </Grid>
            <Grid  item xs={12} md={12}>
              <TextField
                id="address1"
                name="address1"
                value={uxInputs.address1}
                label="Address1"
                required
                fullWidth
                variant='standard'
                onChange={handleProfileChange.bind(this)}
                sx={{maxWidth:'100%'}}
              />
            </Grid>
            <Grid  item xs={12} md={12}>
              <TextField
                id="address2"
                name="address2"
                value={uxInputs.address2}
                label="Address2"
                fullWidth
                variant='standard'
                onChange={handleProfileChange.bind(this)}
                sx={{maxWidth:'100%'}}
              />
            </Grid>
            <Grid  item xs={12} md={6}>
              <TextField
                id="city"
                name="city"
                value={uxInputs.city}
                label="City"
                required
                fullWidth
                variant='standard'
                onChange={handleProfileChange.bind(this)}
                sx={{maxWidth:'100%'}}
              />
            </Grid>
            <Grid  item  xs={12} md={6} >
              <FormControl
                required 
              >
                <InputLabel htmlFor="age-native-required">State</InputLabel>
                <Select
                  defaultValue=''
                  label= "States"
                  name="stateAbrev"
                  id="stateAbrev"
                  variant='standard'
                  value={uxInputs.stateAbrev} 
                  onChange={handleProfileSelectChange}
                  inputProps={{
                    id: 'age-native-required',
                  }}
                  sx={{maxWidth:'100%'}}
                  >
                  <MenuItem value="">
                    <em>Select a State</em>
                  </MenuItem>
                  {countryStatesList.map(aItem => (
                    <MenuItem key={aItem.stateAbrev} value={aItem.stateAbrev} >
                      {aItem.stateName}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Required</FormHelperText>
              </FormControl>
            </Grid>
            <Grid  item xs={12} md={12}>
              <TextField
                id="zipCode"
                name="zipCode"
                value={uxInputs.zipCode}
                label="ZipCode"
                required 
                type="number"
                variant='standard'
                onChange={handleProfileChange.bind(this)}
                sx={{maxWidth:'100%'}}
              />
            </Grid>
            <Grid item xs={12} textAlign='center'>
              <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ padding: 4, margin: 10, borderRadius: 25 }}
                onClick={props.onCancel}
                startIcon={<CancelIcon />}
                type="button"
                >
                Cancel
              </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  style={{ padding: 4, margin: 10, borderRadius: 25 }}
                  type="submit"
                  startIcon={<PersonAddIcon />}
                  sx={{display: props.profile ? 'none' : ''}}
                >
                  Add
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  style={{ padding: 4, margin: 10, borderRadius: 25 }}
                  type="submit"
                  startIcon={<PeopleIcon />}
                  sx={{display: props.profile ? '' : 'none'}}
                >
                  Update
                </Button>
            </Grid>
          </Grid>
      </Box>
    );
  };