import React from 'react'
import Card from 'react-bootstrap/Card';
import './freeboardcard.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faComment } from "@fortawesome/free-regular-svg-icons";

const FreeBoardCard = (props) => {
    return (
        <div className='card-container'>
            <Card>
                <div className="freeboard-card">
                    <div className="col-sm-6 col-md-3">
                        <div className="freeboard-title">
                            <h4>{props.content.title}</h4>
                        </div>
                        <span>
                            {props.content.nickname} | {props.content.created_date}
                        </span>

                        <span className="freeboard-view">
                            <FontAwesomeIcon icon={faEye} />
                            {props.content.views}
                        </span>
                        <span className="freeboard-comment">
                            <FontAwesomeIcon icon={faComment} />
                            {props.content.comments}
                        </span>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default FreeBoardCard