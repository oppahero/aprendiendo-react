import 'bootstrap/dist/css/bootstrap.min.css'

import { Container, Row, Col, Button, Stack } from 'react-bootstrap'

import './App.css'
import { useStore } from './hooks/useStore.ts'
import { AUTO_LANGUAGE } from './constants.ts'
import { ArrowIcon } from './components/Icons.tsx'
import { LanguageSelector } from './components/LenguageSelector.tsx'
import { SectionType } from './types.d'
import { TextArea } from './components/TextArea.tsx'
// import { useEffect } from 'react'
// import { translate } from './services/translate.ts'

function App() {

  const {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    interchangeLanguages,
    setFromLanguage,
    setToLenguage,
    setFromText,
    setResult
  } = useStore()

  // useEffect(() => {
  //   translate({ fromLanguage, toLanguage, text: fromText })
  //     .then(result => {
  //       if (result == null) return
  //       setResult(result)
  //     })
  //     .catch(() => { setResult('Error') })
  // }, [fromLanguage, toLanguage])


  return (
    <Container fluid>
      <h1>Google Translate</h1>

      <Row>
        <Col>
          <Stack gap={2}>
            <LanguageSelector 
              type={SectionType.From}
              value={fromLanguage}
              onChange={setFromLanguage}
            />
            <TextArea
              type={SectionType.From}
              value={fromText}
              onChange={setFromText}
              loading={loading}
            />
          </Stack>
        </Col>
        <Col xs='auto'>
          <Button
            variant='link'
            disabled={fromLanguage === AUTO_LANGUAGE}
            onClick={interchangeLanguages}
          >
            <ArrowIcon/>
          </Button>
        </Col>
        <Col>
          <Stack gap={2}>
            <LanguageSelector 
              type={SectionType.To}
              value={toLanguage}
              onChange={setToLenguage}
            />
            <TextArea
              type={SectionType.To}
              value={result}
              onChange={setResult}
              loading={loading}
            />
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default App
