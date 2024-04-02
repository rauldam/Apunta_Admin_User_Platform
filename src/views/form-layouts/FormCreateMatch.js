// ** React Imports
import { forwardRef, useState } from 'react'
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Select from '@mui/material/Select'
import Alerta from 'src/@core/components/alerta'

// ** Third Party Imports
import { userService, customerService, courtService, alertService } from 'services'


const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Birth Date' autoComplete='off' />
})

const FormCreateMatch = props => {
  // ** States
  const court = props.court;

  const router = useRouter();

  const [record, setRecord] = useState('no');

  const validationSchema = Yup.object().shape({
    p1a: Yup.string().required('Team A - Player 1 is required'),
    p2a: Yup.string().required('Team A - Player 2 is required'),
    p1b: Yup.string().required('Team B - Player 1 is required'),
    p2b: Yup.string().required('Team B - Player 2 is required'),
    game: Yup.string().required('Game mode is required')
  });


  const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

 async function onSubmit ({ p1a,p2a,p1b,p2b,game,email }){

      alertService.clear();

      console.log('onSubmit', p1a, p2a, p1b, p2b, game, email);
      const players = {'player1':p1a, 'player2':p2a, 'player3':p1b, 'player4':p2b};

      const score = {"uno": {"a": "0","b": "0","c": "0","d": "0","saque":"0","setActual":"0","setEquipoA":"0","setEquipoB":"0","ja1":"0","campo":"1","isTieBreak":"0"},"dos": {"a": "0","b": "0","c": "0","d": "0","saque":"0","setActual":"0","setEquipoA":"0","setEquipoB":"0","jb1":"0","campo":"1"}};

      const isAvailable = false;

      const isStarted = false;

      const config = {'game':game, 'record': record, 'email': record == 'record' ? email : ''};

      const params = {'players' : JSON.stringify(players), 'score':JSON.stringify(score), 'isAvailable': isAvailable, 'isStarted': isStarted, 'config': JSON.stringify(config)};

      return courtService.update(court.id, params)
          .then(() => {
              alertService.clear();
              console.log('redirecting to home')
              router.push('/');
          })
          .catch(alertService.error);
  }

  const handleSelectChange = ( event ) => {
      console.log("handleMuiSelectOnChange", event.type);
      setRecord(event.target.value)
  };


  return (
    <Card>

      <CardHeader title={'Create new match for court '+court.name} titleTypographyProps={{ variant: '' }} />
      <Divider sx={{ margin: 0 }} />
      <Box component={'form'} autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                1. Players Name
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Team 1' name="p1a" {...register('p1a')} placeholder='First Player Name' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Team 1' name='p2a' {...register('p2a')} placeholder='Second Player Name' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Team 2' name='p1b' {...register('p1b')} placeholder='First Player Name' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Team 2' name='p2b' {...register('p2b')} placeholder='Second Player Name' />
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ marginBottom: 0 }} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                2. Game mode
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-select-label'>Game Mode</InputLabel>
                <Select
                  label='Country'
                  defaultValue='rapido'
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                  name='game'
                  {...register('game')}
                >
                  <MenuItem value='rapido'>Friendly Rules - Change side when set finished</MenuItem>
                  <MenuItem value='campeonato'>International Rules - Change side in every odd game</MenuItem>
                  <MenuItem value='training'>Training mode - For trainings</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ marginBottom: 0 }} />
            </Grid>
            <Grid item xs={12}>
            <Typography variant='body2' sx={{ fontWeight: 600 }}>
                3. Camera Mode
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
              <InputLabel id="camera-mode-label">Camera Mode</InputLabel>
              <Select
                labelId="camera-mode-label"
                id="camera-mode-select"
                value={record}
                label="Camera Mode"
                onChange={handleSelectChange}

              >
                <MenuItem value={'no'}>Without Camera - Camera deactivated</MenuItem>
                <MenuItem value={'record'}>Private Camera - Record match on private server</MenuItem>
                <MenuItem value={'youtube'}>Youtube - Live Streaming in live over YouTube Platform</MenuItem>
              </Select>
              </FormControl>
            </Grid>
            {record == "record" &&
            <Grid item xs={12}>
              <FormControl>
                <TextField fullWidth label='Email to send video' name="email" {...register('email')} placeholder='Type here the email to send the video email' type='email' />
              </FormControl>
            </Grid>
            }
          </Grid>

        </CardContent>
        <Divider sx={{ margin: 0 }} />
        <CardActions>
          <Button size='large'
                  type='submit'
                  sx={{ mr: 2 }}
                  variant='contained'
                  disabled={formState.isSubmitting}>
            Submit
          </Button>

        </CardActions>
      </Box>
    </Card>
  )
}

export default FormCreateMatch
