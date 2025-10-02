import React from 'react';

const RequestList = ({ requests }) => {
  return (
    <ul className="request-list">
      {requests.map((request) => (
        <li key={request._id} className="list-item">
          <div>
            <strong>{request.resourceType}</strong> - Qty: {request.quantity}
            <p>Urgency: {request.urgency}</p>
            <p>
              Location: {request.location.coordinates[1].toFixed(4)}, {request.location.coordinates[0].toFixed(4)}
            </p>
          </div>
          <div>
            <span className={`status-badge status-${request.status}`}>
              {request.status}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default RequestList;