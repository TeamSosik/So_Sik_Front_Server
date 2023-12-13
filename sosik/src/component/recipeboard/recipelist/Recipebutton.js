import { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import '../../../common/css/recipecss/recipelist/recipebutton.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Recipebutton() {
  const [radioValue, setRadioValue] = useState('1');

  const radios = [
    { name: '요리해요', value: '1' },
    { name: '고민있어요', value: '2' },
    { name: '성공했어요', value: '3' },
  ];

  const buttonStyle = (value) => {
    const baseStyle = {
      backgroundColor: radioValue === value ? '#F8F6E6' : 'initial',
      color: 'black',
      width: '300px',
      height: '50px',
      textAlign: 'center',
      display: 'flex', 
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid #ccc',
    };
    
    if (value === '2' && radioValue === value) {
      return {
        ...baseStyle,
        backgroundColor: '#F8E6E9', 

      };
    }

    if (value === '3' && radioValue === value) {
      return {
        ...baseStyle,
        backgroundColor: '#E6F3F8', 
      };
    }

    return baseStyle;
  };

  return (
    <Row>
        <Col></Col>
        <Col xs={7}>
          <ButtonGroup className='buttongroup3'>
            {radios.map((radio, idx) => (
              <ToggleButton
                className={'selectcategory'}
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                name="radio"
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={(e) => setRadioValue(e.currentTarget.value)}
                onClick={(e) => setRadioValue(e.currentTarget.value)}
                onMouseLeave={() => setRadioValue(radioValue)}
                style={buttonStyle(radio.value)}
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </Col>
      <Col></Col>
    </Row>
  );
}

export default Recipebutton;