import React, { useState } from 'react';
import { Button, Form, ListGroup, Image, Col, Row,Card } from 'react-bootstrap';
import '../../../common/css/recipecss/recipeinfo/recipeinfocoment.css'

const Recipeinfocomment = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');


  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      setComments([...comments, { text: newComment }]);
      setNewComment('');
    }
  };

  return (
    <Row>
    <Col></Col>
    <Col xs={6}>
    <div className='commenttotal'>
    <Card>
      <Form>
        <Form.Group >
            
          <div style={{ display: 'flex', alignItems: 'center'}}>
              <Image
                src='https://placehold.it/500x500'
                alt="프로필 이미지"
                roundedCircle
                style={{ margin: '10px' }}
                width="35"
                height="35"
              />
            
            <Form.Control
              as="textarea"
              rows={1}
              value={newComment}
              onChange={handleCommentChange}
              style={{
                border: '1px solid transparent',
                borderRadius: '5px',
                flex: 1,
              }}
            />
            <Button
              variant="secondary"
              onClick={handleAddComment}
              style={{ margin: '10px' }}

            >
              <strong>보내기</strong>
            </Button>
          </div>
        </Form.Group>
      </Form>
      </Card>
      <p>댓글 0</p>

      <ListGroup>
        {comments.map((comment, index) => (
          <ListGroup.Item key={index} className='commentlist'>
                <div>         
              <Image
                src='https://placehold.it/500x500'
                alt="프로필 이미지"
                roundedCircle
                style={{ marginRight: '10px' }}
                width="35"
                height="35"
              />
              
              <span>떠뽀끼 | 2023-12-11 12:12</span><br/>
            </div>
            <div className='commenttext'>{comment.text}</div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
    </Col>
    <Col></Col>
    </Row>
  );
};

export default Recipeinfocomment;