import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { alertService } from 'services';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';





const Alerta = () => {
    const router = useRouter();
    const [alerta, setAlerta] = useState(null);

    useEffect(() => {
        // subscribe to new alert notifications
        const subscription = alertService.alert.subscribe(alerta => setAlerta(alerta));

        // unsubscribe when the component unmounts
        return () => subscription.unsubscribe();
    }, [alerta, setAlerta]);

    useEffect(() => {
        // clear alert on location change
        alertService.clear();
    }, [router]);

    if (!alerta) return null;

    return (
        <div className="container">
            <Alert severity={alerta.type}>
                <AlertTitle>{alerta.type == 'success' ? 'Success' : 'Error'}</AlertTitle>
                {alerta.message}
            </Alert>
        </div>
    );
}

export default Alerta;
