import clsx from "clsx";
import { useState } from "react";

interface AssignmentHistory {
  assigned_at: string;
  assigned_by: string;
  assignee: string;
  assignment_type: string;
  comments: string;
}

interface TicketPopupProps {
  ticketAssignmentHistory: AssignmentHistory[];
}

const TicketPopupCard: React.FC<TicketPopupProps> = ({ ticketAssignmentHistory }) => {
  const [showCard, setShowCard] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setShowCard(true);
  };

  const handleMouseLeave = () => {
    setShowCard(false);
  };

  return (
    <div
      className="p-3 text-sm flex flex-col gap-2 bg-white text-slate-500 min-w-max border shadow-sm"
      style={{ borderRadius: "0.5rem" }}
    >
      <div className="flex items-center gap-2">
        <p
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="cursor-pointer"
        >
          Ticket Info
        </p>
        <span className="text-blue-400 relative">
          {showCard && (
            <div className={clsx("bg-white shadow-sm py-2 pl-3 pr-5 text-sm min-w-max absolute top-[-1rem] left-8 rounded-md border", {
              "hidden": !showCard
            })}>
              <div className="mb-3 text-gray-500">
                <h2 className="text-sm">Details</h2>
              </div>
              {ticketAssignmentHistory.map((assignment, index) => (
                <div key={index} className="mb-3">
                  <p className="text-gray-600 text-xs">Assigned At:</p>
                  <p className="text-gray-400 text-sm">{assignment.assigned_at}</p>

                  <p className="text-gray-600 text-xs">Assigned By:</p>
                  <p className="text-gray-400 text-sm">{assignment.assigned_by}</p>

                  <p className="text-gray-600 text-xs">Assignee:</p>
                  <p className="text-gray-400 text-sm">{assignment.assignee}</p>

                  <p className="text-gray-600 text-xs">Assignment Type:</p>
                  <p className="text-gray-400 text-sm">{assignment.assignment_type}</p>

                  <p className="text-gray-600 text-xs">Comments:</p>
                  <p className="text-gray-400 text-sm">{assignment.comments}</p>
                </div>
              ))}
            </div>
          )}
        </span>
      </div>
      <p>Auto add to RAG</p>
    </div>
  );
};

export default TicketPopupCard;
