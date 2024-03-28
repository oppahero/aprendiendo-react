import Form from 'react-bootstrap/Form'
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '../constants.ts'

import { type FC } from 'react'
import { type FromLanguage, type Language, SectionType } from '../types.d'

// interface Props {
//     onChange: (language: Language) => void
// }

type Props =
    | { type: SectionType.From , value: FromLanguage, onChange: (language: FromLanguage) => void }
    | { type: SectionType.To, value: Language, onChange: (language: Language) => void }

export const LanguageSelector : FC<Props> = ({ type, value, onChange }) => {

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value as Language)
    }

    return (
        <Form.Select aria-label="Selecciona el lenguage" onChange={handleChange} value={value}>
            { type === SectionType.From && 
                <option value={AUTO_LANGUAGE}>Detectar idioma</option>
            }
            {
                Object.entries(SUPPORTED_LANGUAGES).map( ([key, literal]) => (
                    <option key={key} value={key}>
                        {literal}
                    </option>
                ))
            }
        </Form.Select>
    )
}