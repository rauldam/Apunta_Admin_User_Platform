/* eslint-disable react/jsx-key */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';


// ** MUI Imports
import Box from '@mui/material/Box'
import FormCreateMatch from 'src/views/form-layouts/FormCreateMatch'
import Grid from '@mui/material/Grid'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'
import CardUserHome from 'src/@core/components/card-statistics/cards-user-home'
import Alerta from 'src/@core/components/alerta'

import { userService, customerService, courtService, alertService } from 'services'

const Court = () => {
  const router = useRouter()
  const {id} = router.query
  console.log(id)

  const [court, setCourt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    alertService.clear();
    courtService.getById(id).then((x) => {
      setCourt(x);
     // console.log(courts)
      setLoading(false);
    }).catch(alertService.error);

},[]);



  return (
    <Grid container spacing={6}>
      {court && !loading &&
        <FormCreateMatch court = { court } />
      }
      {loading &&
        <p>Loading...</p>
      }

    </Grid>
  )
}

export default Court
