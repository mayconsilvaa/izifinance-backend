import app from './app';

app.listen(process.env.SV_PORT, () => {
  console.log('Server Online na porta:', process.env.SV_PORT);
});
