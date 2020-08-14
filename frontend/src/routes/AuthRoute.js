import React, {useContext, useEffect, useState} from 'react';
import { Route, withRouter } from 'react-router-dom';
import qs from 'qs'

import { UserContext } from '../contexts/user';
import { EventContext } from '../contexts/event';
import {getEventsMembers} from "../services";

const AuthRoute = React.memo((props) => {

    const user =  useContext(UserContext);
    const events = useContext(EventContext);
    const [flag, setFlag] = useState(0);
    useEffect(() => {
        events.setEvent({
            users: []
        });

        let pathName = props.location.pathname.split('/');
        const event_ID = pathName[2]
        const email = pathName[3]

        user.setUser({
            event_id: event_ID,
            email: email,
            loggedIn: false,
        })

        setFlag(1)
    }, [])
    useEffect(()=>{
        if(!user.event_id) return ;
        getEventsMembers(user.event_id)
            .then(res => {
                events.setEvent({
                    users: res.lists,
                    roomId: user.event_id
                })
            })
            .catch(err => console.log(err))

    },[flag])
    return (
        <Route path={props.path} exact={props.exact} component={props.component}  />
    )
})

export default withRouter(AuthRoute);