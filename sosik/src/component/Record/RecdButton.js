import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import '../../common/css/record/recdButton.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Recdbutton() {
  const [radioValue, setRadioValue] = useState('1');
  const navigate = useNavigate();

  const radios = [
    { name: '칼로리', value: '1' },
    { name: '분석', value: '2' }
  ];

  const buttonStyle = (value) => {
    const baseStyle = {
      backgroundColor: radioValue === value ? '#E6F8E7' : 'initial',
      color: 'black',
      width: 'auto',
      minWidth: '50px',
      height: '55px',
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
    return baseStyle;
  };

  const handleButtonClick = (value) => {
    setRadioValue(value);
    if (value === '1') {
      navigate('/recdkcal');
    } else if (value === '2') {
      navigate('/recdanly');
    }
  };

  return (
    <Row>
      <Col></Col>
      <Col xs={4}>
        <ButtonGroup className='recdbutton'>
          {radios.map((radio, idx) => (
            <ToggleButton
              className={'selectcategory'}
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              name="radio"
              value={radio.value}
              checked={radioValue === radio.value}
              onChange={(e) => { setRadioValue(e.currentTarget.value) }}
              onClick={() => handleButtonClick(radio.value)}
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

export default Recdbutton;
