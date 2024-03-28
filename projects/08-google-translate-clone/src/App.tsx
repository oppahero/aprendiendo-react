import 'bootstrap/dist/css/bootstrap.min.css'

import { Container, Row, Col, Button } from 'react-bootstrap'

import './App.css'
import { useStore } from './hooks/useStore.ts'
import { AUTO_LANGUAGE } from './constants.ts'
import { ArrowIcon } from './components/Icons.tsx'
import { LanguageSelector } from './components/LenguageSelector.tsx'
import { SectionType } from './types.d'

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

  return (
    <Container fluid>
      <h1>Google Translate</h1>

      <Row>
        <Col>
          <LanguageSelector 
            type={SectionType.From}
            value={fromLanguage}
            onChange={setFromLanguage}
          />
          {fromLanguage}
        </Col>
        <Col>
          <Button
            variant='link'
            disabled={fromLanguage === AUTO_LANGUAGE}
            onClick={interchangeLanguages}
          >
            <ArrowIcon/>
          </Button>
        </Col>
        <Col>
          <LanguageSelector 
            type={SectionType.To}
            value={toLanguage}
            onChange={setToLenguage}
          />
          {toLanguage}
        </Col>
      </Row>
    </Container>
  )
}

export default App
