import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, ListGroup, Image, Col, Row, Card } from "react-bootstrap";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./freeboardinfocomment.css";

const FreeBoardInfoComment = ({ commentlist, postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const authorization = JSON.parse(window.sessionStorage.getItem("accesstoken"));
  const refreshToken = JSON.parse(window.sessionStorage.getItem("refreshtoken"));
  const member = JSON.parse(window.sessionStorage.getItem("member"));

  useEffect(() => {
    setComments(
      commentlist.map((comment) => ({
        memberId: comment.memberId,
        createdAt: formatDate(comment.createdAt),
        content: comment.content,
        id: comment.id,
      }))
    );
  }, [commentlist]);

  const formatDate = (isoDateString) => {
    const createdAtDate = new Date(isoDateString);
    const year = createdAtDate.getFullYear();
    const month = String(createdAtDate.getMonth() + 1).padStart(2, "0");
    const day = String(createdAtDate.getDate()).padStart(2, "0");
    const hour = String(createdAtDate.getHours()).padStart(2, "0");
    const minute = String(createdAtDate.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hour}:${minute}`;
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      axios
        .post(
          "http://localhost:5056/comment/v1/create",
          {
            communityId: postId,
            content: newComment,
          },
          {
            headers: {
              Authorization: authorization,
              RefreshToken: refreshToken,
            },
          }
        )
        .then((response) => {
          setComments((prevComments) => [
            ...prevComments,
            {
              memberId: response.data.result.memberId,
              createdAt: formatDate(response.data.result.createdAt),
              content: response.data.result.content,
              id: response.data.result.id,
            },
          ]);

          setNewComment("");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleEditComment = (commentId, content) => {
    setEditingCommentId(commentId);
    setEditedComment(content);
  };

  const handleUpdateComment = async (commentId) => {
    try {
      const response = await axios.patch(
        `http://localhost:5056/comment/v1/${commentId}`,
        {
          content: editedComment,
        },
        {
          headers: {
            Authorization: authorization,
            RefreshToken: refreshToken,
          },
        }
      );
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                content: response.data.result,
              }
            : comment
        )
      );

      setEditingCommentId(null);
      setEditedComment("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    const confirmDelete = window.confirm("댓글을 삭제하시겠습니까?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5056/comment/v1/${commentId}`, {
          headers: {
            Authorization: authorization,
            RefreshToken: refreshToken,
          },
        });

        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== commentId)
        );
      } catch (error) {
        console.error(error);
      }
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
                    placeholder={!member || !member.result ? "로그인 후 댓글을 작성할 수 있습니다." : ""}
                    style={{
                      border: "1px solid transparent",
                      borderRadius: "5px",
                      flex: 1,
                    }}
                    // 로그인하지 않은 경우 댓글 입력 비활성화
                    disabled={!member || !member.result}
                  />
                  <Button
                    variant="secondary"
                    onClick={handleAddComment}
                    style={{
                      margin: "10px",
                      backgroundColor: "#59BD82",
                      border: "none",
                    }}
                    // 로그인하지 않은 경우 댓글 입력 버튼 비활성화
                    disabled={!member || !member.result}
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
                  <span className="commentinfo">
                    {comment.memberId} | {comment.createdAt}
                  </span>
                  <span className="commentmanager">
                    {member && member.result && member.result.memberId === comment.memberId && (
                      <>
                        <span className="commentupdate">
                          <FontAwesomeIcon
                            icon={faPen}
                            style={{
                              color: "#a5a5a5",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              handleEditComment(comment.id, comment.content)
                            }
                          />
                        </span>

                        <span
                          className="commentdelete"
                          onClick={() => handleDeleteComment(comment.id)}
                        >
                          <FontAwesomeIcon
                            icon={faTrash}
                            style={{
                              color: "#a5a5a5",
                              cursor: "pointer",
                            }}
                          />
                        </span>
                      </>
                    )}
                  </span>

                  {editingCommentId === comment.id ? (
                    <Form.Group style={{ display: "flex", alignItems: "center" }}>
                      <Form.Control
                        as="textarea"
                        rows={1}
                        value={editedComment}
                        onChange={(e) => setEditedComment(e.target.value)}
                        style={{
                          border: "1px solid transparent",
                          borderRadius: "5px",
                          flex: 1,
                        }}
                      />
                      <Button
                        variant="secondary"
                        onClick={() => handleUpdateComment(comment.id)}
                        style={{
                          margin: "10px",
                          backgroundColor: "#59BD82",
                          border: "none",
                          display: "flex",
                        }}
                      >
                        <strong>수정하기</strong>
                      </Button>
                    </Form.Group>
                  ) : (
                    <div className="commenttext">{comment.content}</div>
                  )}

                  <br />
                </div>
                <hr />
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