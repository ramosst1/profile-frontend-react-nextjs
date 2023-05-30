'use client'

import React, {useState} from 'react';
import UserProfileList from './features/user-profile-list';
import UserProfileDetail from './features/user-profile-detail';
import {
  Grid,
  Box,
} from "@mui/material";
import { IProfileModel } from './interfaces/profiles/profile-models';
import { IProfileResponse} from './interfaces/profiles/profile-responses';
import { DynamicModalWindow } from '../components/ui/window-modals/dynamic_modal_window';

export default function page() {

  const [keyProfileKey,setKeyProfileKey] = useState(0);
  const [selectedProfile, setSelectedProfile] = useState<IProfileModel>();
  const [openProfileDetail, setOpenProfileDetail] = useState(false);

  const [createdProfileCommitted, setCreatedProfileCommitted] = useState<IProfileResponse>();
  const [updatedProfileCommitted, setUpdateProfileCommitted] = useState<IProfileResponse>();


  function handleDeleteDialogOpen(profile: IProfileModel){
    setSelectedProfile(profile);
  };

  function handleAddProfile() {

    setOpenProfileDetail(true)
    setKeyProfileKey(0);
    setSelectedProfile(undefined);
  };


  function handleProfileDetailUpdate(profileResponse: IProfileResponse) {

    setUpdateProfileCommitted(profileResponse);

    setOpenProfileDetail(false);
    setSelectedProfile(undefined);
  };

  function handleEditProfile (profile: IProfileModel){
    setOpenProfileDetail(true);
    setKeyProfileKey(profile.profileId);
    setSelectedProfile(profile);
  };

  function handleProfileDetailCreate(profileResponse: IProfileResponse){

    setCreatedProfileCommitted(profileResponse);
    setOpenProfileDetail(false);
    setSelectedProfile(undefined);
  };

  function handleProfileDetailCancel() {
    setOpenProfileDetail(false);
    setSelectedProfile(undefined);
  };

  const dynamicModalStyle = {
    boxShadow: 10,
    borderTopLeftRadius: 11,
    borderTopRightRadius: 11,
    borderBottomLeftRadius: 11,
    borderBottomRightRadius: 11,
    padding: 2,
    // background: 'linear-gradient(#F8F8F8, white);'
  }

  return (
    <>
      <Grid container spacing={1}>
           <Grid item xs={12} >
             <h3>User Profiles</h3>
            </Grid>
            <Grid item xs={12} md={4} >
            <UserProfileList
              onProfileEdit={handleEditProfile}
              onProfileDelete={handleDeleteDialogOpen}
              onProfileAdd={handleAddProfile}
              onProfileAddCommitted={createdProfileCommitted}
              onProfileUpdateCommitted={updatedProfileCommitted}
            />

          </Grid>
          <Grid item md={8} style={{maxHeight: '100vh', paddingTop:'70px'}} 
          >
            <Box>
              <Box
                style={{
                  padding: 0,
                  width:'100%',
                  maxHeight: '100vh'
                }}
              >
                <Box
                  sx={{
                    borderTopLeftRadius: 11,
                    borderTopRightRadius: 11,
                    borderBottomLeftRadius: 11,
                    borderBottomRightRadius: 11
                  }}
                >
                  <DynamicModalWindow sx={dynamicModalStyle} open={openProfileDetail} title='PROFILE DETAIL' modalWidth="95%" onClose={handleProfileDetailCancel}>
                    <UserProfileDetail 
                      key={keyProfileKey}
                      profile={selectedProfile}
                      onUpdate={handleProfileDetailUpdate}
                      onCancel={handleProfileDetailCancel}
                      onCreate={handleProfileDetailCreate}
                    />
                  </DynamicModalWindow>
                </Box>
              </Box>
            </Box>
          </Grid>
      </Grid>
    </>
  )

}

