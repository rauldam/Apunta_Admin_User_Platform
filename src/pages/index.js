/* eslint-disable react/jsx-key */

import { useState, useEffect } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box'

import Grid from '@mui/material/Grid'


// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'
import CardUserHome from 'src/@core/components/card-statistics/cards-user-home'
import Alerta from 'src/@core/components/alerta'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Table from 'src/views/dashboard/Table'
import Trophy from 'src/views/dashboard/Trophy'
import TotalEarning from 'src/views/dashboard/TotalEarning'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
import SalesByCountries from 'src/views/dashboard/SalesByCountries'

import { userService, customerService, courtService, alertService } from 'services'



const Dashboard = () => {

  const [courts, setCourts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      courtService.getAllByFk(userService.userValue?.Customer.id).then((x) => {
        setCourts(x);
       // console.log(courts)
        setLoading(false);
      }).catch(alertService.error);

  },[]);

  return (

    <Grid container spacing={6}>
      <Alerta />
        {courts && courts.map((court) => {
          {console.log('AVAILABLE: ' + court.isAvailable + ' STARTED: ' + court.isStarted);}
            return(
              <Grid item xs={12} sm={6} md={4}>
                {court.isAvailable && !court.isStarted &&
                    <CardUserHome
                      id = {court.id}
                      name={court.name}
                      img='Pista2.png'
                      route='/pages/court/'
                      customer={userService.userValue?.Customer}
                      plan={court.Plans}
                    />
                }
                {!court.isAvailable && !court.isStarted &&
                   <CardStatisticsVerticalComponent
                    id = {court.id}
                    stats='$25.6k'
                    icon={<Poll />}
                    color='success'
                    trendNumber='+42%'
                    title={court.name}
                    subtitle='CALENTANDO'
                  />
                }
                {!court.isAvailable && court.isStarted &&
                   <CardStatisticsVerticalComponent
                    id = {court.id}
                    stats='$25.6k'
                    icon={<Poll />}
                    color='success'
                    trendNumber='+42%'
                    title={court.name}
                    subtitle='JUGANDO'
                  />
                }
              </Grid>
            );
          })}
        {courts && !courts.length &&
          <Grid item xs={12} sm={6} md={4}>
            "No courts to display on"
          </Grid>
        }
        {!courts && loading &&
          <Grid item xs={12} sm={6} md={4}>
            Loading data.. please wait
          </Grid>
        }
    </Grid>
  )
}

export default Dashboard
