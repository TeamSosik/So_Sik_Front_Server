import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import React, { useState } from "react";
import "./writebody.css";

function Writebody() {
  const [stepCount, setStepCount] = useState(1);

  const addStep = () => {
    setStepCount((prevCount) => prevCount + 1);
  };

  const removeStep = () => {
    if (stepCount > 1) {
      setStepCount((prevCount) => prevCount - 1);
    }
  };

  const [ingredients, setIngredients] = useState([{ id: 1 }]);

  const addIngredient = () => {
    const newIngredient = { id: ingredients.length + 1 };
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
  };

  const removeIngredient = (id) => {
    if (ingredients.length >= 2) {
      const updatedIngredients = ingredients.filter(
        (ingredient) => ingredient.id !== id
      );
      setIngredients(updatedIngredients);
    }
  };

  const [seasonings, setSeasonings] = useState([{ id: 1 }]);

  const addSeasoning = () => {
    const newSeasoning = { id: seasonings.length + 1 };
    setSeasonings((prevSeasonings) => [...prevSeasonings, newSeasoning]);
  };

  const removeSeasoning = (id) => {
    if (seasonings.length >= 2) {
      const updatedSeasonings = seasonings.filter(
        (seasoning) => seasoning.id !== id
      );
      setSeasonings(updatedSeasonings);
    }
  };

  const renderSteps = () => {
    const steps = [];
    for (let i = 1; i <= stepCount; i++) {
      steps.push(
        <Card key={i} body className="recipecard">
          <span>
            <strong>
              Step {i}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-stars"
                viewBox="0 0 16 16"
              >
                <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828l.645-1.937zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.734 1.734 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31l.387-1.162zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L10.863.1z" />
              </svg>
            </strong>
          </span>
          <hr />
          <Form.Group className="mb-3">
            <Form.Label className="formlabel">이미지</Form.Label>
            <Form.Control type="file" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="formlabel">제목</Form.Label>
            <Form.Control type="email" placeholder="제목을 입력해주세요" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="formlabel">설명</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="설명을 입력해주세요"
            />
          </Form.Group>
        </Card>
      );
    }
    return steps;
  };

  return (
    <Row>
      <Col></Col>
      <Col xs={5}>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label className="formlabel">제목</Form.Label>
            <Form.Control type="email" placeholder="제목을 입력해주세요" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="formlabel">내용</Form.Label>
            <Form.Control
              as="textarea"
              rows={8}
              placeholder="내용을 입력해주세요"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="formlabel">완성 이미지(필수)</Form.Label>
            <Form.Control type="file" />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label className="formlabel">인분수</Form.Label>
              <div style={{ position: "relative" }}>
                <Form.Control placeholder="인분수" />
                <div
                  style={{
                    position: "absolute",
                    right: "8px",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                >
                  인분
                </div>
              </div>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label className="formlabel">준비시간</Form.Label>
              <div style={{ position: "relative" }}>
                <Form.Control placeholder="준비시간" />
                <div
                  style={{
                    position: "absolute",
                    right: "8px",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                >
                  분
                </div>
              </div>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label className="formlabel">조리시간</Form.Label>
              <div style={{ position: "relative" }}>
                <Form.Control placeholder="조리시간" />
                <div
                  style={{
                    position: "absolute",
                    right: "8px",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                >
                  분
                </div>
              </div>
            </Form.Group>
          </Row>

          <Form.Group>
            <Form.Label className="formlabel">재료</Form.Label>
            <Card body className="recipecard">
              {ingredients.map((ingredient, index) => (
                <div key={ingredient.id}>
                  <Form.Control
                    type="text"
                    className="wofy"
                    placeholder="예) 돼지고기(200g)"
                  />
                  {ingredients.length > 1 && index !== 0 && (
                    <Button
                      type="button"
                      className="btn btn-secondary plusminus"
                      onClick={() => removeIngredient(ingredient.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-dash-lg"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"
                        ></path>
                      </svg>
                    </Button>
                  )}
                  {index === ingredients.length - 1 && (
                    <>
                      <Button
                        type="button"
                        className="btn btn-secondary plusminus"
                        onClick={addIngredient}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-plus-lg"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                          ></path>
                        </svg>
                      </Button>
                    </>
                  )}
                </div>
              ))}
            </Card>
          </Form.Group>

          <Form.Group>
            <Form.Label className="formlabel">양념재료</Form.Label>
            <Card body className="recipecard">
              {seasonings.map((seasoning, index) => (
                <div key={seasoning.id}>
                  <Form.Control
                    type="text"
                    className="wofy"
                    placeholder="예) 진간장 2스푼(20g)"
                  />
                  {seasonings.length > 1 && index !== 0 && (
                    <Button
                      type="button"
                      className="btn btn-secondary plusminus"
                      onClick={() => removeSeasoning(seasoning.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-dash-lg"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"
                        ></path>
                      </svg>
                    </Button>
                  )}
                  {index === seasonings.length - 1 && (
                    <>
                      <Button
                        type="button"
                        className="btn btn-secondary plusminus"
                        onClick={addSeasoning}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-plus-lg"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                          ></path>
                        </svg>
                      </Button>
                    </>
                  )}
                </div>
              ))}
            </Card>
          </Form.Group>

          <Form.Group>
            <Form.Label className="formlabel2">단계별 요리법</Form.Label>
            <div>
              {renderSteps()}
              <div className="recipebtn">
                <Button
                  type="button"
                  className="btn btn-secondary plusstep"
                  onClick={addStep}
                >
                  단계추가
                </Button>
                {stepCount > 1 && (
                  <Button
                    type="button"
                    className="btn btn-secondary minusstep"
                    onClick={removeStep}
                  >
                    단계삭제
                  </Button>
                )}
              </div>
            </div>
          </Form.Group>
          <div className="recipebtn">
            <Button
              variant="outline-light"
              className="rounded-pill writebutton"
              type="button"
            >
              <strong>작성</strong>
            </Button>
          </div>
        </Form>
      </Col>
      <Col></Col>
    </Row>
  );
}

export default Writebody;
