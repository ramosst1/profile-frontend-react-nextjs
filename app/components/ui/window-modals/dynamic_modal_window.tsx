'use client'
import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'

export function DynamicModalWindow(props: {sx?: any, open: boolean,title?:string, modalWidth?:string, onClose?:any, children:any}) {
 
    useEffect(() => {
        setDisplayModal(props.open ===true?'block': 'none')

    },[props.open])

    const modalStyle = {
        // boxShadow: 10,
        display: 'none', 
        position: {md: 'relative', xs:'fixed'}, 
        paddingTop: {md:0, xs:20},
        zIndex: {md: 'fab', xs:'modal'},
        left: 0,
        top: 0,
        width: {md: 'auto', xs:'100%'},
        height: {md: 'auto', xs: '100%'}, 
        overflow: {md: 'hidden', xs:'auto'},
        backgroundColor: {md:'rgba(0,0,0,0.0)', xs:'rgba(0,0,0,0.4)'}
      };


    const mobalContent = {
        backgroundColor: {md: 'inherit', xs:'#fefefe'},
        margin: 'auto',
        padding: '0px',
        border: {md: '0px',xs:'1px solid #888'},
        width: {md: 'auto', xs: props.modalWidth? props.modalWidth : ''},
        borderTopLeftRadius: {md: 0, xs: 11},
        borderTopRightRadius: {md: 0, xs: 11},
        borderBottomLeftRadius: {md: 0, xs: 11},
        borderBottomRightRadius: {md: 0, xs: 11},
    }

    const titleStyle = {
        color: 'secondary.main',
        textAlign: 'left',
        fontSize: 15,
        fontWeight: 600,
        padding: 1,
    };

     const closeStyle = {
        color: 'white',
        float: 'right',
        fontSize: '28px',
        fontWeight: 'bold',
        paddingRight: '5px',
        '&:hover': {
            color: '#aaaaaa',
            textDecoration: 'none',
            cursor: 'pointer'
        }
      }
      
    const [displayModal, setDisplayModal] = useState(props.open ===true?'block': 'none')
   
    function closeModal(){
        props.onClose && props.onClose();
    }
 
    return (
        <div style={{textAlign:"center"}}>
        <Box id="myModal" 
            // sx={modalStyle} 
            sx={[modalStyle,{...props.sx}]} 
            style={{display: displayModal}}
        >
            <Box sx={mobalContent}>
                <Typography  variant='button' sx={closeStyle} onClick={closeModal}>&times;</Typography>
                <Box sx={titleStyle} display={props.title? '': 'none'} >
                    {props.title}
                </Box>
                {props.children}
            </Box>
        </Box>
    </div>
    )
}