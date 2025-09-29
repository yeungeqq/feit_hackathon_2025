import React, { useState } from "react";
import { Link } from "react-router-dom";

const ConsentTestEmail: React.FC = () => {
  const [emailContent, setEmailContent] = useState(`Dear [Parent’s Name],

I hope this message finds you well. At [School Name], we are committed to supporting every child’s learning journey and ensuring they receive the right kind of help when needed.

As part of our early screening process, we would like to invite [Child’s Name] to participate in three short assessments:

1. Handwriting Analysis Test — to understand fine motor skills and writing development.
2. Behavioural Questionnaire — a short survey completed by teachers and/or parents about attention, focus, and classroom behaviors.
3. Rapid Automatized Naming (RAN) Test — a quick activity where your child names familiar items (such as colors, numbers, or letters) to help us assess early reading fluency.

These tools are not formal diagnoses but are widely used to identify areas where children might benefit from additional support. The results will help us tailor classroom strategies and, if needed, recommend further resources.

All information will remain confidential and used only to better support [Child’s Name]’s learning. Participation is entirely voluntary, and you may withdraw consent at any time.

Please let us know if you consent for [Child’s Name] to take part in these assessments by replying to this email by [date]. If you have any questions, I’d be happy to discuss them with you.

Warm regards,  
[Your Name]  
[Teacher / Learning Support Coordinator]  
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
          <Link
            to="/homepage"
            className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100"
          >
            🏠 Homepage
          </Link>
          <Link
            to="/resources"
            className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100"
          >
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
        <h1 className="text-2xl font-bold mb-6">Consent for Test Email</h1>

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

export default ConsentTestEmail;