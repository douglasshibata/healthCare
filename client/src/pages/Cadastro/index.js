import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import api from "../../services/api";
import { login } from '../../services/auth';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://aquann.herokuapp.com/">
                Aquann
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn() {
    const classes = useStyles();
    const [cpfUser, setCpfUser] = useState('');
    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    async function handleSubmit(e) {
        e.preventDefault();
        const data = { cpfUser, email, password ,nome}
        if (!data) {
            alert('Preencha os dados para continuar')
        } else {
            try {
                const response = await api.post('/user', data);
                login(response.data.token);
                history.push('/')
            } catch (error) {
                let mensagemErro = error.response.data.error.message;
                if (mensagemErro === 'insert into "users" ("cpfUser", "created_at", "email", "password", "updated_at") values ($1, $2, $3, $4, $5) returning "id" - null value in column "cpfUser" violates not-null constraint') { alert('CPF não pode estar em branco') }
                else if (mensagemErro === 'insert into "users" ("cpfUser", "created_at", "email", "nome", "password", "updated_at") values ($1, $2, $3, $4, $5, $6) returning "id" - duplicate key value violates unique constraint "users_cpfuser_unique"') { alert('CPF já cadastrado') }
                else if (mensagemErro === 'insert into "users" ("cpfUser", "created_at", "email", "password", "updated_at") values ($1, $2, $3, $4, $5) returning "id" - null value in column "email" violates not-null constraint') { alert('Email não pode estar em branco') }
                else if (mensagemErro === 'insert into "users" ("cpfUser", "created_at", "email", "password", "updated_at") values ($1, $2, $3, $4, $5) returning "id" - null value in column "nome" violates not-null constraint') { alert('Nome não pode estar em Branco') }
                else if (mensagemErro === 'insert into "users" ("cpfUser", "created_at", "email", "password", "updated_at") values ($1, $2, $3, $4, $5) returning "id" - null value in column "password" violates not-null constraint') { alert('Senha não pode estar em branco') }
                else if(mensagemErro ==='insert into "users" ("cpfUser", "created_at", "email", "nome", "password", "updated_at") values ($1, $2, $3, $4, $5, $6) returning "id" - duplicate key value violates unique constraint "users_email_unique"'){alert('Email já Cadastrado')}

            }
        }
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Cadastro
        </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder='CPF*' minLength='11' maxLength='11' required
                        value={cpfUser}
                        onChange={e => setCpfUser(e.target.value)} autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        type='email'
                        required
                        fullWidth
                        id="email"
                        label="E-mail"
                        name="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        autoComplete="email"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        type='text'
                        required
                        fullWidth
                        id="nome"
                        label="Nome"
                        name="nome"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Senha"
                        type="password"
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        autoComplete="current-password"
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Cadastrar
          </Button>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}