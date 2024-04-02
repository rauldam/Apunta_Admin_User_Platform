import { useState, useEffect } from 'react'
// ** MUI Imports
import Image from 'next/image'
import Link from 'next/link'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { CardActionArea } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { planService, alertService } from 'services'

// ** Icons Imports
import DotsVertical from 'mdi-material-ui/DotsVertical'
import { useRouter } from 'next/router'


const ITEM_HEIGHT = 48;

const CardUserHome = props => {
  // ** Props
  const { id, name, img, route, customer, plan } = props

  const options = [plan[0].name, 'Camera Installation', 'QR Installation', plan[0]['name'] == 'Free' ? 'NO ADS' : 'Configure Ads', 'Court Configuration'];

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (option) => {
    //console.log(option);
    switch (option){
      case 0:
        break;
      case 1:
        console.log('INITIALIZE CAMERA INSTALL')
        break;
      case 2:
        console.log('GO TO QR PAGE FOR COURT '+id);
        break;
      case 3:
        const tipoPlan = plan[0].name == 'Free' ? 'Free' : 'Pro';
        switch(tipoPlan) {
          case 'Free':
            console.log('GO TO FREE PLAN PAGE FOR COURT '+id);
            break;
          case 'Pro':
            console.log('GO TO CONFIGURATION ADS PAGE FOR COURT '+id);
            break;
          default:
            console.log('GO TO SIGNAGE DIGITAL ADS PAGE FOR COURT '+id);
            break;
        }
        break;
      case 4:
        console.log('GO TO COURT CONFIGURATION PAGE FOR COURT '+id);
        break;
    }
    setAnchorEl(null);
  };

  return (
      <Card key={id}>
        <CardContent>
            <Box sx={{ display: 'flex', marginBottom: 5.5, alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <Typography sx={{fontWeight: 600, fontSize: '0.875rem' }}>{name}</Typography>
              <IconButton
                sx={{ color: 'text.secondary'}}
                size='small'
                aria-label='settings'
                className='card-more-options'
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}>
                <DotsVertical />
              </IconButton>
            </Box>
            <CardActionArea sx={{ margin: "0 0 0 0" }}>
              <Link href={route+id+'/'} passHref>
              <CardMedia
                  component="img"
                  height="140"
                  image={'/images/cards/' + img}
                  alt="Court"
                  sx={{ margin: "0 0 0 0", padding: "1em 1em 0 1em", objectFit: "contain" }}
                />
                </Link>
            </CardActionArea>
          </CardContent>
          { options.length > 0 &&
            <Menu
              id="long-menu"
              MenuListProps={{'aria-labelledby': 'long-button',}}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: '20ch',
                },
              }}>
              {options.map((option, key) => (
                <MenuItem key={key} selected={false} onClick={() => handleClose(key)}>
                  {option}
                </MenuItem>
              ))}

            </Menu>
          }



      </Card>
  )
}

export default CardUserHome


