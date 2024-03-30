import { Form } from 'react-bootstrap'
import { SectionType } from '../types.d'

interface Props {
    type: SectionType
    loading?: boolean
    value: string
    onChange: (value: string) => void
}

const commonStyles = { height: '200px', border: 0, resize: 'none'}

const getPlaceholder = ({type, loading}: {type: SectionType, loading?: boolean}) => {
    if (type === SectionType.From) return 'Ingresar texto'
    if (loading === true) return 'Cargando...'
    return 'Traducción'
}

export function TextArea ({ type, loading, value, onChange} : Props) {
    const styles = type === SectionType.From 
        ?  commonStyles
        :  {...commonStyles, backgroundColor: '#f5f5f5'}

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(event.target.value)
    }

    return (
        <Form.Control
            as='textarea'
            disabled={type === SectionType.To}
            autoFocus={type === SectionType.From}
            placeholder={getPlaceholder({type, loading})}
            value={value}
            onChange={handleChange}
            style={styles}
        />
    )
}