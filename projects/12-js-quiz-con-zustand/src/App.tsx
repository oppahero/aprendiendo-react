import { Container, Stack, Typography } from '@mui/material'
import './App.css'
import { JavascriptLogo } from './JavascriptLogo.tsx'
import { Start } from './Start.tsx'
import { useQuestionStore } from './store/questions.ts'

function App () {
  const questions = useQuestionStore(state => state.questions)

  return (
    <main>
      <Container maxWidth='sm'>
        <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
          <JavascriptLogo />
          <Typography variant='h2' component='h1'>
            Javascript Quiz
          </Typography>
        </Stack>

        {questions.length === 0 && <Start />}
        {questions.length > 0 && <h3>Juego</h3>}

      </Container>

    </main>
  )
}

export default App
