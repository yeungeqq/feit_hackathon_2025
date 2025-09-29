import React, { useState } from "react";
import { Link } from "react-router-dom";

const ConsentInterventionEmail: React.FC = () => {
  const [emailContent, setEmailContent] = useState(`Dear [Parent’s Name],

I hope this message finds you well. At [School Name], our goal is to ensure that every child receives the support they need to thrive in their learning journey.

Following classroom observations and initial assessments, we believe that [Child’s Name] may benefit from targeted intervention activities. These interventions are designed to provide additional support in areas such as reading, writing, and attention, and will take place during regular school hours.

Before moving forward, we would like to ask for your consent. Participation is entirely voluntary, and you are welcome to discuss any concerns or questions with me before making a decision. All information gathered will remain confidential and only be used to guide [Child’s Name]’s learning plan.

Please reply to this email by [date] to indicate whether you consent to [Child’s Name] taking part in the intervention.

Thank you for your partnership in supporting [Child’s Name]’s education. I am happy to schedule a call or meeting if you would like more details.

Warm regards,  
[Your Name]  
[Your Position]  
[School Contact Information]`);

  const handleSend = () => {
    alert("Email sent:\n\n" + emailContent);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">AdaptEd</h1>
          <p className="text-xs text-gray-500">All For Students</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/homepage" className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100">
            🏠 Homepage
          </Link>
          <Link to="/resources" className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100">
            📂 Resource Management
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <Link
            to="/login"
            className="w-full block bg-red-500 text-white py-2 text-center rounded-md hover:bg-red-600 transition"
          >
            Log Out
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Consent for Intervention Email</h1>

        <div className="bg-white shadow rounded-lg p-6">
          {/* Editable email box */}
          <textarea
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            rows={20}
            className="w-full border border-gray-300 rounded-md p-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Send button */}
          <button
            onClick={handleSend}
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
          >
            Send Email
          </button>
        </div>
      </main>
    </div>
  );
};

export default ConsentInterventionEmail;