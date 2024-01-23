import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, ListGroup, Image, Col, Row, Card } from "react-bootstrap";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./freeboardinfocomment.css";

const FreeBoardInfoComment = ({ commentlist , postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  
  useEffect(() => {
    setComments(commentlist.map(comment => ({
      memberId: comment.memberId,
      createdAt: formatDate(comment.createdAt),
      content: comment.content,
      id: comment.id
    })));
  }, [commentlist]);
  
  const formatDate = (isoDateString) => {
    const createdAtDate = new Date(isoDateString);
    const year = createdAtDate.getFullYear();
    const month = String(createdAtDate.getMonth() + 1).padStart(2, '0');
    const day = String(createdAtDate.getDate()).padStart(2, '0');
    const hour = String(createdAtDate.getHours()).padStart(2, '0');
    const minute = String(createdAtDate.getMinutes()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hour}:${minute}`;
  };
  
  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const authorization = JSON.parse(window.sessionStorage.getItem("accesstoken"));
  const refreshToken = JSON.parse(window.sessionStorage.getItem("refreshtoken"));
  const member = JSON.parse(window.sessionStorage.getItem("member"));

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      axios.post(
        'http://127.0.0.1:5056/comment/v1/create',
        {
          communityId: postId,
          content: newComment
        },
        {
          headers: {
            Authorization: authorization,
            RefreshToken: refreshToken,
            memberId: member.result.member.memberId,
          },
        }
      )
      .then((response) => {
        setComments(prevComments => [
          ...prevComments,
          {
            memberId: response.data.result.memberId,
            createdAt: formatDate(response.data.result.createdAt),
            content: response.data.result.content,
            id: response.data.result.id
          }
        ]);
  
        setNewComment("");
      })
      .catch(error => {
        console.error(error);
      });
    }
  };
  

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`http://127.0.0.1:5056/comment/v1/${commentId}`, {
        headers: {
          Authorization: authorization,
          RefreshToken: refreshToken,
          memberId: member.result.member.memberId,
        },
      });
  
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Row>
      <Col></Col>
      <Col xs={6}>
        <div className="commenttotal">
          <Card>
            <Form>
              <Form.Group>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Image
                    src="https://placehold.it/500x500"
                    alt="프로필 이미지"
                    roundedCircle
                    style={{ margin: "10px" }}
                    width="35"
                    height="35"
                  />

                  <Form.Control
                    as="textarea"
                    rows={1}
                    value={newComment}
                    onChange={handleCommentChange}
                    style={{
                      border: "1px solid transparent",
                      borderRadius: "5px",
                      flex: 1,
                    }}
                  />
                  <Button
                    variant="secondary"
                    onClick={handleAddComment}
                    style={{ margin: "10px", backgroundColor: "#59BD82", border: "none"}}
                  >
                    <strong>보내기</strong>
                  </Button>
                </div>
              </Form.Group>
            </Form>
          </Card>
          <p className="commentcount">댓글 {comments.length}</p>

          <ListGroup>
            {comments.map((comment, index) => (
              <ListGroup.Item key={index} className="commentlist">
                <div>
                  <Image
                    src="https://placehold.it/500x500"
                    alt="프로필 이미지"
                    roundedCircle
                    style={{ marginRight: "10px" }}
                    width="35"
                    height="35"
                  />
                
                  <span className="commentinfo">{comment.memberId} | {comment.createdAt}</span>
                  <span className="commentmanager">
                    {member.result.member.memberId === comment.memberId && (
                      <>
                        <span ><FontAwesomeIcon icon={faPen} style={{color: "#a5a5a5",}}/></span>  
            
                        <span className="commentdelete" onClick={() => handleDeleteComment(comment.id)}>
                      <FontAwesomeIcon icon={faTrash} style={{ color: "#a5a5a5" }} />
                    </span>
                      </>
                    )}
                  </span>
                  <br />
                  
                </div>
                <div className="commenttext">{comment.content}</div>
                <hr/>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </Col>
      <Col></Col>
    </Row>
  );
};

export default FreeBoardInfoComment;