import React from 'react';

const ResourceList = ({ resources }) => {
  return (
    <ul className="resource-list">
      {resources.map((resource) => (
        <li key={resource._id} className="list-item">
          <div>
            <strong>{resource.type}</strong> - Qty: {resource.quantity}
            <p>{resource.description}</p>
            <p>
              Location: {resource.location.coordinates[1].toFixed(4)}, {resource.location.coordinates[0].toFixed(4)}
            </p>
          </div>
          <div>
            <span className={`status-badge status-${resource.status}`}>
              {resource.status}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ResourceList;